import axios from "axios";
import { API_URL } from "./config";

export async function getRooms() {
    try {
        const response = await axios.get(`${API_URL}/rooms`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getRoom(room_id) {
    try {
        const response = await axios.get(`${API_URL}/rooms/${room_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getRoomMessages(room_id) {
    try {
        const response = await axios.get(`${API_URL}/rooms/${room_id}/messages`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function sendMessage(user_id, room_id, text) {
    try {
        const response = await axios.post(`${API_URL}/rooms/${room_id}/messages`, { user_id, text });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function createRoom(name) {
    try {
        const response = await axios.post(`${API_URL}/rooms`, { name });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function signUp(name, email, password, password_confirmation) {
    try {
        const response = await axios.post(
            `${API_URL}/registrations`,
            {
                name,
                email,
                password,
                password_confirmation,
            },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function signIn(email, password) {
    try {
        const response = await axios.post(
            `${API_URL}/sessions`,
            {
                email,
                password,
            },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function signOut() {
    try {
        const response = await axios.delete(`${API_URL}/logout`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function checkLoginStatus() {
    try {
        const response = await axios.get(`${API_URL}/logged_in`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
