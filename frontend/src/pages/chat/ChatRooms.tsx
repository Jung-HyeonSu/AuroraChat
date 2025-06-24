import ChatRoomList from "../../components/chat/ChatRoomList";

function ChatRooms() {
    const rooms = ["General", "Sports", "Technology"];

    return (
        <div className="container mx-auto">
            <ChatRoomList rooms={rooms} />
        </div>
    );
}

export default ChatRooms;
