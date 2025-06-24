import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-blue-600 text-white py-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-xl font-bold">AuroraChat</Link>
                <div>
                    <Link to="/login" className="px-4">Login</Link>
                    <Link to="/register" className="px-4">Register</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
