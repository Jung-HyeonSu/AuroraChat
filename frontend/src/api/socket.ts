import { Client } from "@stomp/stompjs";
import type { IMessage } from "@stomp/stompjs";
import SockJS from 'sockjs-client';

export function connectChatSocket({
                                      jwt,
                                      roomId,
                                      onMessage,
                                  }: {
    jwt: string;
    roomId: string;
    onMessage: (msg: any) => void;
}) {
    const client = new Client({
        webSocketFactory: () => new SockJS('/ws-stomp'),
        connectHeaders: {
            Authorization: `Bearer ${jwt}`,
        },
        debug: str => console.log(str),
        reconnectDelay: 5000,
        onConnect: () => {
            client.subscribe(`/sub/chat/room.${roomId}`, (message: IMessage) => {
                onMessage(JSON.parse(message.body));
            });
        },
    });

    client.activate();
    return client;
}