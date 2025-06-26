import ChatSidebar from "../components/chat/ChatSidebar";
import ChatRoomSection from "../components/chat/ChatRoomSection";
import type { ChatRoom, ChatMessage } from "../types/chat";
import { useState } from "react";

// 연한 회색 배경색: #f5f6fa
const BG_GRAY = "bg-[#f5f6fa]";

// 예시 더미 데이터 (id가 모두 달라야 함)
const dummyRooms: ChatRoom[] = [
    {
        id: "1",
        name: "정현수",
        avatarUrl: "/avatars/legend.png",
        lastMessage: "그래. 이따 8시에 봐!",
        lastMessageTime: "오후 2:05",
    },
    {
        id: "2",
        name: "테스트방2",
        avatarUrl: "/avatars/legend.png",
        lastMessage: "좋아, 그때 봐!",
        lastMessageTime: "오후 3:10",
    },
    {
        id: "3",
        name: "123",
        avatarUrl: "/avatars/legend.png",
        lastMessage: "오케이!",
        lastMessageTime: "오후 4:00",
    },
    {
        id: "4",
        name: "테스트방",
        avatarUrl: "/avatars/legend.png",
        lastMessage: "안녕~",
        lastMessageTime: "오후 5:20",
    },
];

const dummyMessages: ChatMessage[] = [
    {
        id: "m1",
        roomId: "1",
        content: "의견은 어때?",
        time: "오후 8:01",
        isMine: false,
        avatarUrl: "/avatars/legend.png",
    },
    // 추가 메시지는 필요에 따라 작성
];

function Home() {
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom>(dummyRooms[0]);
    const [messages] = useState<ChatMessage[]>(dummyMessages);

    return (
        <div className={`${BG_GRAY} min-h-screen w-full py-12 flex flex-col items-center`}>
            {/* 채팅 전체 박스 */}
            <div className="flex w-[1200px] h-[700px] rounded-3xl shadow-xl overflow-hidden bg-white/0">
                {/* 사이드바 */}
                <ChatSidebar
                    rooms={dummyRooms}
                    selectedRoom={selectedRoom}
                    onSelectRoom={setSelectedRoom}
                    className="rounded-l-3xl"
                />
                {/* 채팅방 상세 */}
                <ChatRoomSection
                    room={selectedRoom}
                    messages={messages.filter((msg) => msg.roomId === selectedRoom.id)}
                    className="rounded-r-3xl"
                />
            </div>
        </div>
    );
}

export default Home;