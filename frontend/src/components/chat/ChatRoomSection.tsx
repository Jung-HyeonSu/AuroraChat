import { useState, type FormEvent } from "react";
import type { ChatRoom, ChatMessage } from "../../types/chat";

interface Props {
    room: ChatRoom;
    messages: ChatMessage[];
    className?: string;
    onSendMessage?: (content: string) => void;
}

const ChatRoomSection: React.FC<Props> = ({
                                              room,
                                              messages,
                                              className = "",
                                              onSendMessage,
                                          }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        if (onSendMessage) onSendMessage(input.trim());
        setInput("");
    };

    return (
        <section className={`flex flex-col flex-1 bg-[#f7f8fa] ${className}`}>
            {/* 상단 */}
            <header className="h-20 border-b border-gray-100 flex items-center px-10 bg-white">
                <img src="/images/default_profile.jpg" className="w-10 h-10 rounded-full mr-4" alt="avatar" />
                <span className="font-bold text-xl">{room.roomName}</span>
            </header>
            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto px-12 py-10 space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-end ${
                            msg.isMine ? "justify-end" : "justify-start"
                        }`}
                    >
                        {!msg.isMine && (
                            <img
                                src="/images/default_profile.jpg"
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
            {/* 입력창 */}
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
                            handleSubmit(e as any);
                        }
                    }}
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
};

export default ChatRoomSection;
