import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import MonacoEditor from '@monaco-editor/react';
import { Box, Paper, Snackbar, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import EditorToolbar from '../components/EditorToolbar';
import websocketService from '../services/websocket';
import { projectApi, executionApi } from '../services/api';

function Editor() {
    const { projectId } = useParams();
    const { user } = useAuth();
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [isConnected, setIsConnected] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
    const editorRef = useRef(null);
    const lastChangeRef = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        const token = localStorage.getItem('token');
        websocketService.setConnectionCallback(setIsConnected);
        websocketService.connect(token);

        // Subscribe to project updates
        const topic = `/topic/project/${projectId}`;
        websocketService.subscribe(topic, handleRemoteChange);

        // Load initial project content
        loadProjectContent();

        return () => {
            websocketService.unsubscribe(topic);
            websocketService.disconnect();
        };
    }, [projectId]);

    const loadProjectContent = async () => {
        try {
            const response = await projectApi.getProjectContent(projectId);
            setCode(response.data.content);
            setLanguage(response.data.language || 'javascript');
        } catch (error) {
            showNotification('Error loading project content', 'error');
        }
    };

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    };

    const handleEditorChange = (value, event) => {
        if (!websocketService.isConnected()) return;

        // Debounce changes
        if (lastChangeRef.current) {
            clearTimeout(lastChangeRef.current);
        }

        lastChangeRef.current = setTimeout(() => {
            const change = {
                projectId,
                userId: user.id,
                content: value,
                timestamp: new Date().toISOString(),
            };

            websocketService.send(`/app/project/${projectId}/change`, change);
        }, 500);
    };

    const handleRemoteChange = (change) => {
        if (change.userId !== user.id) {
            setCode(change.content);
        }
    };

    const handleSave = async () => {
        try {
            await projectApi.updateProjectContent(projectId, code);
            showNotification('Project saved successfully', 'success');
        } catch (error) {
            showNotification('Error saving project', 'error');
        }
    };

    const handleRun = async () => {
        try {
            const response = await executionApi.executeCode(projectId, language);
            const executionId = response.data.executionId;

            // Poll for execution result
            const pollResult = async () => {
                const result = await executionApi.getExecutionResult(executionId);
                if (result.data.status === 'COMPLETED') {
                    showNotification('Code executed successfully', 'success');
                    // Handle output display
                } else if (result.data.status === 'FAILED') {
                    showNotification(result.data.error, 'error');
                } else {
                    setTimeout(pollResult, 1000);
                }
            };

            pollResult();
        } catch (error) {
            showNotification('Error executing code', 'error');
        }
    };

    const showNotification = (message, severity = 'info') => {
        setNotification({
            open: true,
            message,
            severity,
        });
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <EditorToolbar
                isConnected={isConnected}
                onSave={handleSave}
                onRun={handleRun}
                language={language}
                onLanguageChange={setLanguage}
            />

            <Paper elevation={3} sx={{ flex: 1, borderRadius: 1, overflow: 'hidden' }}>
                <MonacoEditor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: true },
                        fontSize: 14,
                        wordWrap: 'on',
                        automaticLayout: true,
                        tabSize: 2,
                        formatOnPaste: true,
                        formatOnType: true,
                    }}
                />
            </Paper>

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseNotification} severity={notification.severity}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Editor;