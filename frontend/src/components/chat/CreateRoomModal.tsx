import { useState } from "react";
import type { ChatRoom } from "../../types/chat";
import axiosInstance from "../../api/axiosInstance";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (room: ChatRoom) => void;
}

const CreateRoomModal: React.FC<Props> = ({ open, onClose, onCreate }) => {
    const [roomName, setRoomName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!roomName.trim()) return;
        const ownerName = localStorage.getItem("nickname");
        try {
            const response = await axiosInstance.post("/api/chat/room", {
                roomName,
                ownerName,
            });
            onCreate(response.data);
            setRoomName("");
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
                            onChange={(e) => setRoomName(e.target.value)}
                            placeholder="채팅방 이름 입력"
                            autoFocus
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-yellow-300 font-bold hover:bg-yellow-400"
                        >
                            생성
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRoomModal;
