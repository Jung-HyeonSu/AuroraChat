import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwt_token"));
    const [nickname, setNickname] = useState(localStorage.getItem("nickname") || "");
    const navigate = useNavigate();

    useEffect(() => {
        const onLoginStatusChanged = () => {
            setIsLoggedIn(!!localStorage.getItem("jwt_token"));
            setNickname(localStorage.getItem("nickname") || "");
        };
        window.addEventListener("loginStatusChanged", onLoginStatusChanged);

        const onStorage = () => {
            setIsLoggedIn(!!localStorage.getItem("jwt_token"));
            setNickname(localStorage.getItem("nickname") || "");
        };
        window.addEventListener("storage", onStorage);

        return () => {
            window.removeEventListener("loginStatusChanged", onLoginStatusChanged);
            window.removeEventListener("storage", onStorage);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("nickname");
        setIsLoggedIn(false);
        setNickname("");
        window.dispatchEvent(new Event("loginStatusChanged"));
        navigate("/login");
    };

    return (
        <nav className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 text-white py-3 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4">
                <Link to="/" className="flex items-center space-x-3">
                    <span className="text-2xl font-extrabold tracking-wide select-none">AuroraChat</span>
                    <img src="/images/logo.png" alt="AuroraChat Logo" className="w-10 h-10 object-contain" />
                </Link>

                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            <span className="text-lg font-medium">{nickname && `${nickname}님`}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
