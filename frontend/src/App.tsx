import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
    return (
        <div className="min-h-screen bg-[#f5f6fa]">
            <Router>
                <Navbar />
                <div className="container mx-auto mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
