import { useParams } from "react-router-dom";

function ChatRoom() {
    const { id } = useParams(); // URL에서 채팅방 ID 가져오기

    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-2xl font-bold">Chat Room: {id}</h1>
            <p className="mt-4">This is the chat room for {id}.</p>
        </div>
    );
}

export default ChatRoom;
