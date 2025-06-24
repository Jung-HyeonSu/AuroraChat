import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChatRoom from "./pages/chat/ChatRoom";
import ChatRooms from "./pages/chat/ChatRooms";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mx-auto mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/chat" element={<ChatRooms />} />
                    <Route path="/chat/:id" element={<ChatRoom />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
