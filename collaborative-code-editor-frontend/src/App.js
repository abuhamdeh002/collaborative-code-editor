import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function App() {
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);

            stompClient.subscribe('/topic/code', (message) => {
                console.log('Received message: ', JSON.parse(message.body));
            });
        });

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, []);

    return <div>Collaborative Code Editor</div>;
}

export default App;
