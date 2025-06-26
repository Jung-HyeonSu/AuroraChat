import React from "react";
import type { ChatRoom } from "../../types/chat";

// 사이드바 컴포넌트 (props로 관리)
const ChatSidebar: React.FC<{
    rooms: ChatRoom[];
    selectedRoom: ChatRoom;
    onSelectRoom: (room: ChatRoom) => void;
    className?: string;
}> = ({ rooms, selectedRoom, onSelectRoom, className = "" }) => {
    return (
        <aside
            className={`w-[340px] bg-white flex flex-col py-8 px-6 border-r border-gray-100 ${className}`}
        >
            <div className="flex items-center mb-8">
                <h2 className="text-2xl font-bold flex-1">채팅</h2>
                {/* 채팅방 추가 버튼(기능은 샘플이므로 미구현) */}
                <button
                    className="ml-2 w-9 h-9 rounded-full bg-yellow-300 hover:bg-yellow-400 transition flex items-center justify-center text-2xl font-bold"
                    aria-label="채팅방 추가"
                >+</button>
            </div>
            <ul className="flex-1 space-y-4 overflow-y-auto pr-2">
                {rooms.map((room) => (
                    <li
                        key={room.id}
                        className={`flex items-center p-4 rounded-2xl cursor-pointer transition ${
                            String(room.id) === String(selectedRoom.id) ? "bg-[#f1f2f6]" : "hover:bg-gray-50"
                        }`}
                        onClick={() => onSelectRoom(room)}
                    >
                        <img
                            src={room.avatarUrl}
                            alt="avatar"
                            className="w-10 h-10 rounded-full mr-4"
                        />
                        <div className="flex-1">
                            <div className="font-semibold">{room.name}</div>
                            <div className="text-gray-500 text-sm truncate">{room.lastMessage}</div>
                        </div>
                        <span className="ml-2 text-gray-400 text-xs">{room.lastMessageTime}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default ChatSidebar;