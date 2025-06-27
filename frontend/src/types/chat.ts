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
    content: string;
    time: string;
    isMine: boolean;
    avatarUrl?: string;
}