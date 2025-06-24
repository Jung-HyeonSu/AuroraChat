import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("jwt_token"));
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 상태가 바뀔 때마다 이벤트로 알림받음
        const onLoginStatusChanged = () => setIsLoggedIn(!!localStorage.getItem("jwt_token"));
        window.addEventListener("loginStatusChanged", onLoginStatusChanged);

        // storage 이벤트로 여러 탭 동기화도 지원
        const onStorage = () => setIsLoggedIn(!!localStorage.getItem("jwt_token"));
        window.addEventListener("storage", onStorage);

        return () => {
            window.removeEventListener("loginStatusChanged", onLoginStatusChanged);
            window.removeEventListener("storage", onStorage);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwt_token");
        setIsLoggedIn(false);
        window.dispatchEvent(new Event("loginStatusChanged"));
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 text-white py-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-xl font-bold">AuroraChat</Link>
                <div>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="px-4">
                            Logout
                        </button>
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