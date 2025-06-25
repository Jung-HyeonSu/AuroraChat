import React, { useState, useEffect } from "react";
import type { ChatRoom } from "../../types/chat";
import axiosInstance from "../../api/axiosInstance";

// 채팅방 생성 모달 컴포넌트
function CreateRoomModal({
                             open,
                             onClose,
                             onCreate,
                         }: {
    open: boolean;
    onClose: () => void;
    onCreate: (room: ChatRoom) => void;
}) {
    const [roomName, setRoomName] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!roomName.trim()) return;
        try {
            const res = await axiosInstance.post("/api/chat/room", null, {
                params: { name: roomName }
            });
            onCreate(res.data); // 새 방을 부모에 전달
            setRoomName("");
            onClose();
        } catch {
            alert("방 생성 실패");
        }
    };
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-80">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">채팅방 이름</label>
                        <input
                            className="w-full border rounded-lg px-3 py-2"
                            value={roomName}
                            onChange={e => setRoomName(e.target.value)}
                            placeholder="채팅방 이름 입력"
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">취소</button>
                        <button type="submit" className="px-4 py-2 rounded bg-yellow-300 font-bold hover:bg-yellow-400">생성</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const ChatSidebar: React.FC<{ className?: string }> = ({ className = "" }) => {
    const [rooms, setRooms] = useState<ChatRoom[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // 채팅방 목록 불러오기
    const fetchRooms = async () => {
        try {
            const res = await axiosInstance.get<ChatRoom[]>("/api/chat/rooms");
            setRooms(res.data);
            if (res.data.length > 0 && !selectedRoom) {
                setSelectedRoom(res.data[0]);
            }
        } catch {
            alert("채팅방 목록을 불러오지 못했습니다.");
        }
    };

    useEffect(() => {
        fetchRooms();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 방 생성시 목록에 바로 추가
    const handleRoomCreated = (room: ChatRoom) => {
        setRooms(prev => [room, ...prev]);
        setSelectedRoom(room);
    };

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
                >+</button>
            </div>
            <ul className="flex-1 space-y-4 overflow-y-auto pr-2">
                {rooms.map((room) => (
                    <li
                        key={room.id}
                        className={`flex items-center p-4 rounded-2xl cursor-pointer transition ${
                            selectedRoom && room.id === selectedRoom.id ? "bg-[#f1f2f6]" : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedRoom(room)}
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
            <CreateRoomModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreate={handleRoomCreated}
            />
        </aside>
    );
};

export default ChatSidebar;