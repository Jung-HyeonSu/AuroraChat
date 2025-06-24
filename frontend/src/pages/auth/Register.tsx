import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";

function Register() {
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axiosInstance.post("/api/users/register", {
                username,
                password,
                nickname,
            });

            if (response.status === 200 || response.status === 201) {
                setSuccess("회원가입이 완료되었습니다!");
                setUsername("");
                setPassword("");
                setNickname("");
            } else {
                setError("회원가입에 실패했습니다.");
            }
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("서버 요청에 실패했습니다.");
            }
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6 text-center">회원가입</h2>
                <form id="registerForm" onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="nickname" className="block text-gray-700 text-sm font-bold mb-2">
                            닉네임
                        </label>
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            required
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                            autoComplete="nickname"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            ID
                        </label>
                        <input
                            type="text"
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
                            autoComplete="new-password"
                        />
                    </div>
                    {error && (
                        <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
                    )}
                    {success && (
                        <div className="mb-4 text-green-600 text-sm text-center">{success}</div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                        >
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;