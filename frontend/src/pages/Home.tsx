import ChatSidebar from "../components/chat/ChatSidebar";
import ChatRoomSection from "../components/chat/ChatRoomSection";
import type { ChatRoom, ChatMessage } from "../types/chat";
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const BG_GRAY = "bg-[#f5f6fa]";

function Home() {
    const [rooms, setRooms] = useState<ChatRoom[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const clientRef = useRef<Client | null>(null);

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
                setSelectedRoom((prev) => prev ?? res.data[0]);
            }
        } catch (error) {
            console.error("채팅방 목록 불러오기 실패", error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    // 선택된 방이 바뀔 때마다 메시지 불러오기 및 WebSocket 재구성
    useEffect(() => {
        // 이전에 연결된 클라이언트가 있으면 종료
        if (clientRef.current) {
            if (clientRef.current instanceof Client) {
                clientRef.current.deactivate();
            }
            clientRef.current = null;
        }

        if (!selectedRoom) {
            setMessages([]);
            return;
        }

        // 해당 방 메시지 불러오기
        const fetchMessages = async () => {
            try {
                const res = await axiosInstance.get<ChatMessage[]>(`/api/chat/messages/${selectedRoom.roomId}`);
                setMessages(res.data);
            } catch (error) {
                console.error("메시지 불러오기 실패", error);
            }
        };
        fetchMessages();

        // WebSocket Client 생성 및 구독
        const client = new Client({
            webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL),
            reconnectDelay: 5000,
            debug: (str) => console.log(`[STOMP] ${str}`),
            onConnect: () => {
                console.log("WebSocket 연결 성공 (Home.tsx)");
                client.subscribe(`/sub/chatroom/${selectedRoom.roomId}`, (message) => {
                    const newMessage: ChatMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, newMessage]);
                });
            },
            onStompError: (frame) => {
                console.error("STOMP 에러:", frame);
            },
        });

        client.activate();
        clientRef.current = client;

        // 컴포넌트 언마운트 또는 방 변경 시 WebSocket 연결 종료
        return () => {
            if (clientRef.current) {
                if (clientRef.current instanceof Client) {
                    clientRef.current.deactivate();
                }
                clientRef.current = null;
            }
        };
    }, [selectedRoom]);

    // 새 방 생성 시 처리
    const handleRoomCreated = (room: ChatRoom) => {
        setRooms((prev) => [room, ...prev]);
        setSelectedRoom(room);
    };

    // 채팅방 참여 후 처리 (방 목록 갱신 및 선택)
    const handleJoinRoom = async (roomId: string) => {
        try {
            const nickname = localStorage.getItem("nickname");
            if (!nickname) return;

            const res = await axiosInstance.get<ChatRoom[]>(`/api/chat/rooms/${nickname}`);
            setRooms(res.data);

            const joinedRoom = res.data.find((r) => r.roomId === roomId);
            if (joinedRoom) {
                setSelectedRoom(joinedRoom);
            }
        } catch (error) {
            console.error("채팅방 목록 불러오기 실패", error);
        }
    };

    // 자식 컴포넌트에서 메시지 전송 후 부모 상태도 업데이트할 때 사용
    const handleSendMessage = (message: ChatMessage) => {
        setMessages((prev) => [...prev, message]);
    };

    return (
        <div className={`${BG_GRAY} min-h-screen w-full py-12 flex flex-col items-center`}>
            <div className="flex flex-col md:flex-row w-full max-w-[1200px] h-[700px] max-h-[90vh] rounded-3xl shadow-xl overflow-hidden bg-white/0">
                <ChatSidebar
                    rooms={rooms}
                    selectedRoom={selectedRoom}
                    onSelectRoom={setSelectedRoom}
                    onCreateRoom={handleRoomCreated}
                    onJoinRoom={handleJoinRoom}
                    className="rounded-l-3xl w-full md:w-1/3 h-48 md:h-auto"
                />
                {selectedRoom ? (
                    <ChatRoomSection
                        room={selectedRoom}
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        className="rounded-r-3xl w-full md:w-2/3 flex-1"
                        stompClient={clientRef.current}
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
