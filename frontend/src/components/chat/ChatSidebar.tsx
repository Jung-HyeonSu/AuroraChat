import React from "react";
import type { ChatRoom } from "../../types/chat";

interface Props {
    rooms: ChatRoom[];
    selectedRoom: ChatRoom;
    onSelectRoom: (room: ChatRoom) => void;
    className?: string;
}

const ChatSidebar: React.FC<Props> = ({
                                          rooms,
                                          selectedRoom,
                                          onSelectRoom,
                                          className = "",
                                      }) => (
    <aside
        className={`w-[340px] bg-white flex flex-col py-8 px-6 border-r border-gray-100 ${className}`}
    >
        <h2 className="text-2xl font-bold mb-8">채팅</h2>
        <ul className="flex-1 space-y-4 overflow-y-auto pr-2">
            {rooms.map((room) => (
                <li
                    key={room.id}
                    className={`flex items-center p-4 rounded-2xl cursor-pointer transition ${
                        room.id === selectedRoom.id ? "bg-[#f1f2f6]" : "hover:bg-gray-50"
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

export default ChatSidebar;