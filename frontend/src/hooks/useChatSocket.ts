import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import type { IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function useChatSocket(
    jwt: string,
    roomId: string,
    onMessage: (msg: any) => void
) {
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        if (!jwt || !roomId) return;

        const client = new Client({
            webSocketFactory: () => new SockJS("/ws-stomp"),
            connectHeaders: {
                Authorization: `Bearer ${jwt}`,
            },
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/sub/chat/room.${roomId}`, (message: IMessage) => {
                    onMessage(JSON.parse(message.body));
                });
            },
        });

        clientRef.current = client;
        client.activate();

        return () => {
            client.deactivate();
            clientRef.current = null;
        };
    }, [jwt, roomId, onMessage]);

    return clientRef;
}