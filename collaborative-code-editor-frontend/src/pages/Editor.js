import React, { useState, useEffect } from 'react';
import { EditorToolbar } from '../components/EditorToolbar';
import { Card } from '../ui/Card';
import Textarea from '../ui/Textarea';

export const Editor = ({ projectId }) => {
  const [code, setCode] = useState('');
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Set up WebSocket connection
    const websocket = new WebSocket(`ws://localhost:8080/editor/${projectId}`);

    websocket.onopen = () => {
      console.log('Connected to editor WebSocket');
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'CODE_UPDATE':
          setCode(data.content);
          break;
        case 'COLLABORATOR_UPDATE':
          setCollaborators(data.collaborators);
          break;
        default:
          console.log('Unknown message type:', data.type);
      }
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [projectId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (ws) {
      ws.send(
        JSON.stringify({
          type: 'CODE_UPDATE',
          content: newCode,
        })
      );
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/projects/${projectId}/save`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ code }),
        }
      );

      if (!response.ok) throw new Error('Failed to save');
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput('');
    try {
      const response = await fetch('http://localhost:8080/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error('Execution failed');

      const result = await response.json();
      setOutput(result.output);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar
        onSave={handleSave}
        onRun={handleRun}
        saving={saving}
        running={running}
        collaborators={collaborators}
      />

      <div className="flex-1 flex gap-4 p-4">
        <Card className="flex-1">
          <Textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-full font-mono p-4 resize-none"
            placeholder="Write your code here..."
          />
        </Card>

        {output && (
          <Card className="w-1/3 p-4">
            <h3 className="font-semibold mb-2">Output</h3>
            <pre className="whitespace-pre-wrap">{output}</pre>
          </Card>
        )}
      </div>
    </div>
  );
};
