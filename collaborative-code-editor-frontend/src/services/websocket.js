import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
    constructor() {
        this.client = null;
        this.subscriptions = new Map();
        this.connectionStatus = false;
        this.onConnectionChange = null;
    }

    connect(token) {
        if (this.client) {
            this.disconnect();
        }

        this.client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                this.connectionStatus = true;
                if (this.onConnectionChange) {
                    this.onConnectionChange(true);
                }
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                this.connectionStatus = false;
                if (this.onConnectionChange) {
                    this.onConnectionChange(false);
                }
            },
            onStompError: (frame) => {
                console.error('WebSocket error:', frame);
            }
        });

        this.client.activate();
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
            this.client = null;
        }
    }

    subscribe(topic, callback) {
        if (!this.client || !this.client.connected) {
            console.error('WebSocket not connected');
            return null;
        }

        const subscription = this.client.subscribe(topic, (message) => {
            try {
                const data = JSON.parse(message.body);
                callback(data);
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });

        this.subscriptions.set(topic, subscription);
        return subscription;
    }

    unsubscribe(topic) {
        const subscription = this.subscriptions.get(topic);
        if (subscription) {
            subscription.unsubscribe();
            this.subscriptions.delete(topic);
        }
    }

    send(destination, data) {
        if (!this.client || !this.client.connected) {
            console.error('WebSocket not connected');
            return;
        }

        this.client.publish({
            destination,
            body: JSON.stringify(data)
        });
    }

    isConnected() {
        return this.connectionStatus;
    }

    setConnectionCallback(callback) {
        this.onConnectionChange = callback;
    }
}

export const websocketService = new WebSocketService();
export default websocketService;