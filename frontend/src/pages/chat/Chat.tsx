import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

// 타입 정의
interface ChatRoom {
    id: string;
    name: string;
    avatarUrl: string;
    lastMessage: string;
    lastMessageTime: string;
}
interface ChatMessage {
    id: string;
    roomId: string;
    content: string;
    time: string;
    isMine: boolean;
    avatarUrl?: string;
}

// 임시 방 정보
const room: ChatRoom = {
    id: "1",
    name: "채팅방",
    avatarUrl: "/avatar.png",
    lastMessage: "안녕하세요!",
    lastMessageTime: "오후 2:05"
};

// 채팅방 UI 컴포넌트
function ChatRoomSection({
                             room,
                             messages,
                             onSendMessage
                         }: {
    room: ChatRoom;
    messages: ChatMessage[];
    onSendMessage: (content: string) => void;
}) {
    const [input, setInput] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSendMessage(input.trim());
        setInput("");
    };
    return (
        <section className="flex flex-col flex-1 bg-[#f7f8fa]">
            <header className="h-20 border-b border-gray-100 flex items-center px-10 bg-white">
                <img src={room.avatarUrl} className="w-10 h-10 rounded-full mr-4" alt="avatar" />
                <span className="font-bold text-xl">{room.name}</span>
            </header>
            <div className="flex-1 overflow-y-auto px-12 py-10 space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-end ${msg.isMine ? "justify-end" : "justify-start"}`}
                    >
                        {!msg.isMine && (
                            <img
                                src={msg.avatarUrl}
                                className="w-8 h-8 rounded-full mr-3"
                                alt="avatar"
                            />
                        )}
                        <div
                            className={`
                                px-5 py-3 max-w-xs break-words shadow
                                ${msg.isMine
                                ? "bg-yellow-200 text-right text-gray-800 rounded-3xl rounded-br-md"
                                : "bg-white text-left text-gray-800 rounded-3xl rounded-bl-md"
                            }
                            `}
                        >
                            <span>{msg.content}</span>
                            <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
                        </div>
                    </div>
                ))}
            </div>
            <form
                className="flex items-center p-8 border-t border-gray-100 bg-white"
                onSubmit={handleSubmit}
            >
                <input
                    className="flex-1 rounded-2xl border border-gray-300 px-5 py-3 mr-3 focus:outline-yellow-300"
                    placeholder="메시지를 입력하세요"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-bold rounded-xl px-6 py-3"
                >
                    전송
                </button>
            </form>
        </section>
    );
}

// stomp 기반 채팅방 페이지
export default function ChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        const wsUrl = import.meta.env.VITE_WS_BASE_URL;
        const client = new Client({
            brokerURL: wsUrl, // 실제 서버 주소로 변경하세요!
        });

        client.onConnect = () => {
            client.subscribe(`/topic/chat/${room.id}`, (message) => {
                const body = JSON.parse(message.body);
                // 본인 메시지 구분 (예시: body에 userId가 있으면 비교)
                setMessages(prev => [...prev, body]);
            });
        };

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [room.id]);

    const handleSendMessage = (content: string) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: `/app/chat/${room.id}`,
                body: JSON.stringify({
                    id: "" + Date.now(),
                    roomId: room.id,
                    content,
                    time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
                    isMine: true,
                    avatarUrl: "/avatar.png"
                })
            });
        }
    };

    return (
        <ChatRoomSection
            room={room}
            messages={messages}
            onSendMessage={handleSendMessage}
        />
    );
}