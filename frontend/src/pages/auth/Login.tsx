import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axiosInstance.post("/api/auth/login", { username, password });
            const token = res.data.token;
            if (token) {
                localStorage.setItem("jwt_token", token);
                window.dispatchEvent(new Event("loginStatusChanged"));
                navigate("/");
            } else {
                setError("이메일 또는 비밀번호가 올바르지 않습니다.");
            }
        } catch (_err) {
            setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6 text-center">로그인</h2>
                <form id="loginForm" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            ID
                        </label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>
                    {error && (
                        <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;