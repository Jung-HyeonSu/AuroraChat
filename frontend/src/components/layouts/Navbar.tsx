import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwt_token"));
    const [nickname, setNickname] = useState(localStorage.getItem("nickname") || "");
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 상태가 바뀔 때마다 이벤트로 알림받음
        const onLoginStatusChanged = () => {
            setIsLoggedIn(!!localStorage.getItem("jwt_token"));
            setNickname(localStorage.getItem("nickname") || "");
        };
        window.addEventListener("loginStatusChanged", onLoginStatusChanged);

        // storage 이벤트로 여러 탭 동기화도 지원
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
        <nav className="bg-blue-600 text-white py-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-xl font-bold">AuroraChat</Link>
                <div className="flex items-center">
                    {isLoggedIn ? (
                        <>
                            <span className="mr-4">{nickname && `${nickname}님`}</span>
                            <button onClick={handleLogout} className="px-4">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-4">Login</Link>
                            <Link to="/register" className="px-4">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;