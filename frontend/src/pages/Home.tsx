import ChatSidebar from "../components/chat/ChatSidebar";
import ChatRoomSection from "../components/chat/ChatRoomSection";
import type { ChatRoom, ChatMessage } from "../types/chat";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const BG_GRAY = "bg-[#f5f6fa]";

function Home() {
    const [rooms, setRooms] = useState<ChatRoom[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    // 채팅방 목록 불러오기
    const fetchRooms = async () => {
        try {
            const nickname = localStorage.getItem("nickname");
            if (!nickname) {
                alert("닉네임이 설정되지 않았습니다.");
                return;
            }
            const res = await axiosInstance.get<ChatRoom[]>(`/api/chat/rooms/${nickname}`);
            setRooms(res.data);
            if (res.data.length > 0) {
                setSelectedRoom(res.data[0]);
            }
        } catch (error) {
            console.error("채팅방 목록 불러오기 실패", error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    // 선택된 방 메시지 불러오기
    useEffect(() => {
        if (!selectedRoom) return;

        const fetchMessages = async () => {
            try {
                const res = await axiosInstance.get<ChatMessage[]>(
                    `/api/chat/messages?roomId=${selectedRoom.roomId}`
                );
                setMessages(res.data);
            } catch (error) {
                console.error("채팅방 메시지 불러오기 실패", error);
            }
        };
        fetchMessages();
    }, [selectedRoom]);

    // 새 방 생성 시 처리
    const handleRoomCreated = (room: ChatRoom) => {
        setRooms(prev => [room, ...prev]);
        setSelectedRoom(room);
    };

    // 채팅방 참여 후 처리 함수 (방 목록 갱신 및 참여 방 선택)
    const handleJoinRoom = async (roomId: string) => {
        await fetchRooms();
        // 갱신된 rooms에서 참여한 방 선택
        const joinedRoom = rooms.find(r => r.roomId === roomId);
        if (joinedRoom) {
            setSelectedRoom(joinedRoom);
        }
    };

    return (
        <div className={`${BG_GRAY} min-h-screen w-full py-12 flex flex-col items-center`}>
            <div className="flex w-[1200px] h-[700px] rounded-3xl shadow-xl overflow-hidden bg-white/0">
                <ChatSidebar
                    rooms={rooms}
                    selectedRoom={selectedRoom}
                    onSelectRoom={setSelectedRoom}
                    onCreateRoom={handleRoomCreated}
                    onJoinRoom={handleJoinRoom}
                    className="rounded-l-3xl"
                />
                {selectedRoom ? (
                    <ChatRoomSection
                        room={selectedRoom}
                        messages={messages}
                        className="rounded-r-3xl"
                    />
                ) : (
                    <div className="flex flex-1 items-center justify-center text-gray-500">
                        채팅방을 선택해주세요
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
