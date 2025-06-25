export interface ChatRoom {
    id: string;
    name: string;
    avatarUrl: string;
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