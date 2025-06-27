import { useState } from "react";
import type { ChatRoom } from "../../types/chat";
import CreateRoomModal from "./CreateRoomModal"; // CreateRoomModal 별도 파일로 분리했다고 가정
import formatRelativeTime from "../../utils/formatRelativeTime"; // 시간 포맷 유틸 함수 별도 분리 권장

interface Props {
    rooms: ChatRoom[];
    selectedRoom: ChatRoom | null;
    onSelectRoom: (room: ChatRoom) => void;
    onCreateRoom: (room: ChatRoom) => void;
    className?: string;
}

const ChatSidebar: React.FC<Props> = ({
                                          rooms,
                                          selectedRoom,
                                          onSelectRoom,
                                          onCreateRoom,
                                          className = "",
                                      }) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <aside
            className={`w-[340px] bg-white flex flex-col py-8 px-6 border-r border-gray-100 ${className}`}
        >
            <div className="flex items-center mb-8">
                <h2 className="text-2xl font-bold flex-1">채팅</h2>
                <button
                    className="ml-2 w-9 h-9 rounded-full bg-yellow-300 hover:bg-yellow-400 transition flex items-center justify-center text-2xl font-bold"
                    aria-label="채팅방 추가"
                    onClick={() => setModalOpen(true)}
                >
                    +
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
            <CreateRoomModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreate={(room) => {
                    onCreateRoom(room);
                    setModalOpen(false);
                }}
            />
        </aside>
    );
};

export default ChatSidebar;
