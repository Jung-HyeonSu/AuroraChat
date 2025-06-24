import { Link } from "react-router-dom";

function ChatRoomList({ rooms }: { rooms: string[] }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Chat Rooms</h2>
            <ul>
                {rooms.map((room, index) => (
                    <li key={index}>
                        <Link to={`/chat/${room}`} className="text-blue-500">{room}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatRoomList;
