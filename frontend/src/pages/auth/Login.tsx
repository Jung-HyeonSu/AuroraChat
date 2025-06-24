import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Logged in as ${username}`);
    };

    return (
        <form onSubmit={handleLogin} className="max-w-md mx-auto mt-8 p-4 border rounded">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </form>
    );
}

export default Login;
