import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

interface JoinRoomModalProps {
    open: boolean;
    onClose: () => void;
    onJoin: (roomId: string) => void; // 문자열 roomId로 통일
}

const JoinRoomModal: React.FC<JoinRoomModalProps> = ({ open, onClose, onJoin }) => {
    const [roomId, setRoomId] = useState("");
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        const storedNickname = localStorage.getItem("nickname");
        if (storedNickname) {
            setNickname(storedNickname);
        } else {
            alert("닉네임이 설정되지 않았습니다. 먼저 닉네임을 설정해주세요.");
            onClose();
        }
    }, [onClose]);

    const handleJoin = async () => {
        if (roomId.trim() === "") {
            alert("채팅방 ID를 입력해주세요.");
            return;
        }

        try {
            const response = await axiosInstance.post("/api/chat-room-members/join", {
                roomId,
                nickname,
                role: "member",
            });

            if (response.data) {
                alert("채팅방에 참여했습니다.");
                setRoomId("");
                onJoin(roomId); // 문자열 roomId 전달
                onClose();
            } else {
                alert("참여 중 문제가 발생했습니다.");
            }
        } catch (error) {
            console.error("Error joining chat room:", error);
            alert("참여 중 오류가 발생했습니다.");
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h3 className="text-xl font-bold mb-4">채팅방 참여</h3>
                <input
                    type="text"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="채팅방 ID를 입력하세요"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleJoin}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        참여
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinRoomModal;
