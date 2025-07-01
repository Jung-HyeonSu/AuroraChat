export interface ChatRoom {
    roomId: string;
    roomName: string;
    ownerName: string;
    createdAt: string;
    lastMessage: string;
    lastMessageTime: string;
}

export interface ChatMessage {
    id: string;
    roomId: string;
    sender: string;
    content: string;
    timestamp: string;
    isMine?: boolean; // 선택적
}
