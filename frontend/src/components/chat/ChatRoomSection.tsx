import { useEffect, useState, type FormEvent } from "react";
import axiosInstance from "../../api/axiosInstance";
import type { ChatRoom, ChatMessage } from "../../types/chat";

interface Props {
    room: ChatRoom;
    messages: ChatMessage[];
    className?: string;
    onSendMessage?: (message: ChatMessage) => void;
}

const ChatRoomSection: React.FC<Props> = ({
                                              room,
                                              messages,
                                              className = "",
                                              onSendMessage,
                                          }) => {
    const [input, setInput] = useState("");
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>(messages);
    const [currentUserName, setCurrentUserName] = useState<string>("");

    // 로컬스토리지에서 닉네임 읽어오기
    useEffect(() => {
        const nickname = localStorage.getItem("nickname") || "";
        setCurrentUserName(nickname);
    }, []);

    // 방 바뀔 때마다 메시지 불러오기
    useEffect(() => {
        async function fetchMessages() {
            try {
                const res = await axiosInstance.get<ChatMessage[]>(`/api/chat/messages/${room.roomId}`);
                setChatMessages(res.data);
            } catch (error) {
                console.error("메시지 불러오기 실패", error);
            }
        }
        fetchMessages();
    }, [room.roomId]);

    const handleSendMessage = async (content: string) => {
        if (!currentUserName) {
            console.error("사용자 이름이 설정되지 않았습니다.");
            return;
        }

        const message: { sender: string; id: string; time: string; isMine: boolean; roomId: string; content: string } = {
            id: String(Date.now()),
            roomId: room.roomId,
            sender: currentUserName,
            content,
            time: new Date().toISOString(),
            isMine: true,
        };

        try {
            await axiosInstance.post("/api/chat/messages", {
                id: message.id,
                roomId: message.roomId,
                sender: message.sender,
                content: message.content,
                timestamp: new Date().toISOString(),
            });
            setChatMessages((prev) => [...prev, message]);
            if (onSendMessage) onSendMessage(message);
        } catch (error) {
            console.error("메시지 저장 실패:", error);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleSendMessage(input.trim());
        setInput("");
    };

    return (
        <section className={`flex flex-col flex-1 bg-[#f7f8fa] ${className}`}>
            <header className="h-20 border-b border-gray-100 flex items-center px-10 bg-white">
                <img src="/images/default_profile.jpg" className="w-10 h-10 rounded-full mr-4" alt="avatar" />
                <span className="font-bold text-xl">{room.roomName}</span>
            </header>

            <div className="flex-1 overflow-y-auto px-12 py-10 space-y-6">
                {chatMessages.map((msg) => {
                    const mine = msg.sender === currentUserName;
                    return (
                        <div
                            key={msg.id}
                            className={`flex items-end ${mine ? "justify-end" : "justify-start"}`}
                        >
                            {!mine && (
                                <img
                                    src="/images/default_profile.jpg"
                                    className="w-8 h-8 rounded-full mr-3"
                                    alt="avatar"
                                />
                            )}
                            <div
                                className={`
                                  px-5 py-3 max-w-xs break-words shadow
                                  ${mine
                                    ? "bg-yellow-200 text-right text-gray-800 rounded-3xl rounded-br-md"
                                    : "bg-white text-left text-gray-800 rounded-3xl rounded-bl-md"
                                }
                                `}
                            >
                                <span>{msg.content}</span>
                                <div className="text-xs text-gray-400 mt-1">
                                    {new Date(msg.time).toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    );
                })}
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
