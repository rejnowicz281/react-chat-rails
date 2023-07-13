import axios from "axios";
import { API_URL } from "./config";

async function getRooms() {
    try {
        const response = await axios.get(`${API_URL}/rooms`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getRoom(room_id) {
    try {
        const response = await axios.get(`${API_URL}/rooms/${room_id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getRoomMessages(room_id) {
    try {
        const response = await axios.get(`${API_URL}/rooms/${room_id}/messages`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function sendMessage(room_id, text) {
    try {
        const response = await axios.post(`${API_URL}/rooms/${room_id}/messages`, { text });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export { getRoom, getRoomMessages, getRooms, sendMessage };
