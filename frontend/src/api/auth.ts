import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (credentials: { username: string; password: string }) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};
