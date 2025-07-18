import { useEffect, useRef, useState } from "react";
import type { ChatRoom, ChatMessage } from "../../types/chat";
import type { Client } from "@stomp/stompjs";

interface Props {
    room: ChatRoom;
    messages: ChatMessage[];
    className?: string;
    onSendMessage?: (message: ChatMessage) => void;
    stompClient?: Client | null;
}

const ChatRoomSection: React.FC<Props> = ({
                                              room,
                                              messages,
                                              className = "",
                                              stompClient,
                                          }) => {
    const [input, setInput] = useState("");
    const [currentUserName, setCurrentUserName] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const nickname = localStorage.getItem("nickname") || "익명";
        setCurrentUserName(nickname);
    }, []);

    // 내부 메시지 영역 스크롤을 맨 아래로 내림
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (content: string) => {
        if (!currentUserName) {
            console.error("사용자 이름이 설정되지 않았습니다.");
            return;
        }
        if (!stompClient || !stompClient.connected) {
            console.error("STOMP 클라이언트가 연결되어 있지 않습니다.");
            return;
        }

        const toLocalISOString = (): string => {
            const now = new Date();
            const offsetMinutes = now.getTimezoneOffset();
            const localTime = new Date(now.getTime() - offsetMinutes * 60000);
            return localTime.toISOString().slice(0, -1); // 'Z' 제거
        };

        const message = {
            id: String(Date.now()),
            roomId: room.roomId,
            sender: currentUserName,
            content,
            timestamp: toLocalISOString(),
        };

        try {
            stompClient.publish({
                destination: "/pub/chat/message",
                body: JSON.stringify(message),
            });

            setInput("");
        } catch (error) {
            console.error("메시지 발송 실패:", error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleSendMessage(input.trim());
    };

    return (
        <section className={`flex flex-col flex-1 bg-[#f7f8fa] ${className}`}>
            <header className="h-20 border-b border-gray-100 flex items-center px-10 bg-white">
                <img
                    src="/images/default_profile.jpg"
                    className="w-10 h-10 rounded-full mr-4"
                    alt="avatar"
                />
                <span className="font-bold text-xl me-2">{room.roomName}</span>
                <span className="text-sm text-gray-600 ml-auto font-semibold tracking-wide whitespace-nowrap">
                    참여코드 - {room.roomId}
                </span>
            </header>

            <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-12 py-10 space-y-6"
            >
                {messages.map((msg) => {
                    const mine = msg.sender === currentUserName;
                    return (
                        <div
                            key={msg.id}
                            className={`flex items-end ${
                                mine ? "justify-end" : "justify-start"
                            }`}
                        >
                            {!mine && (
                                <div className="relative mr-3">
                                    <span className="font-bold absolute bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 whitespace-nowrap">
                                        {msg.sender}
                                    </span>
                                    <img
                                        src="/images/default_profile.jpg"
                                        className="w-8 h-8 rounded-full"
                                        alt="avatar"
                                    />
                                </div>
                            )}
                            <div
                                className={`px-5 py-3 max-w-xs break-words shadow ${
                                    mine
                                        ? "bg-blue-200 text-right text-gray-800 rounded-3xl rounded-br-md"
                                        : "bg-white text-left text-gray-800 rounded-3xl rounded-bl-md"
                                }`}
                            >
                                <span>{msg.content}</span>
                                <div className="text-xs text-gray-400 mt-1">
                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <form
                className="flex items-center p-8 border-t border-gray-100 bg-white"
                onSubmit={handleSubmit}
            >
                <input
                    className="flex-1 rounded-2xl border border-gray-300 px-5 py-3 mr-3 focus:outline-yellow-300"
                    placeholder="메시지를 입력하세요"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                        }
                    }}
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white font-semibold rounded-full px-6 py-3 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                    전송
                </button>
            </form>
        </section>
    );
};

export default ChatRoomSection;
