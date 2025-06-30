import { useState } from "react";
import type { ChatRoom } from "../../types/chat";
import CreateRoomModal from "./CreateRoomModal";
import JoinRoomModal from "./JoinRoomModal";
import formatRelativeTime from "../../utils/formatRelativeTime";

interface Props {
    rooms: ChatRoom[];
    selectedRoom: ChatRoom | null;
    onSelectRoom: (room: ChatRoom) => void;
    onCreateRoom: (room: ChatRoom) => void;
    onJoinRoom: (roomId: string) => void; // 문자열 roomId로 변경
    className?: string;
}

const ChatSidebar: React.FC<Props> = ({
                                          rooms,
                                          selectedRoom,
                                          onSelectRoom,
                                          onCreateRoom,
                                          onJoinRoom,
                                          className = "",
                                      }) => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [joinModalOpen, setJoinModalOpen] = useState(false);

    return (
        <aside
            className={`w-[340px] bg-white flex flex-col py-8 px-6 border-r border-gray-100 ${className}`}
        >
            <div className="flex items-center mb-8">
                <h2 className="text-2xl font-bold flex-1">채팅</h2>
                <button
                    className="ml-2 w-9 h-9 rounded-full bg-yellow-300 hover:bg-yellow-400 transition flex items-center justify-center text-2xl font-bold"
                    aria-label="채팅방 추가"
                    onClick={() => setCreateModalOpen(true)}
                >
                    +
                </button>
                <button
                    className="ml-2 w-9 h-9 rounded-full bg-blue-300 hover:bg-blue-400 transition flex items-center justify-center text-xl font-bold"
                    aria-label="채팅방 참여"
                    onClick={() => setJoinModalOpen(true)}
                >
                    ▶
                </button>
            </div>
            <ul className="flex-1 space-y-4 overflow-y-auto pr-2">
                {rooms.map((room) => (
                    <li
                        key={room.roomId}
                        className={`flex items-center p-4 rounded-2xl cursor-pointer transition ${
                            selectedRoom?.roomId === room.roomId ? "bg-[#f1f2f6]" : "hover:bg-gray-50"
                        }`}
                        onClick={() => onSelectRoom(room)}
                    >
                        <img
                            src={room.avatarUrl}
                            alt="avatar"
                            className="w-10 h-10 rounded-full mr-4"
                        />
                        <div className="flex-1">
                            <div className="font-semibold">{room.roomName}</div>
                            <div className="text-gray-500 text-sm truncate">{room.lastMessage}</div>
                        </div>
                        <span className="ml-2 text-gray-400 text-xs">
                            {formatRelativeTime(room.lastMessageTime)}
                        </span>
                    </li>
                ))}
            </ul>
            {/* 채팅방 생성 모달 */}
            <CreateRoomModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onCreate={(room) => {
                    onCreateRoom(room);
                    setCreateModalOpen(false);
                }}
            />
            {/* 채팅방 참여 모달 */}
            <JoinRoomModal
                open={joinModalOpen}
                onClose={() => setJoinModalOpen(false)}
                onJoin={(roomId) => {
                    onJoinRoom(roomId);
                    setJoinModalOpen(false);
                }}
            />
        </aside>
    );
};

export default ChatSidebar;
