import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomMessages, sendMessage } from "../helpers/API";

function Room() {
    const [initialMessagesLoaded, setInitialMessagesLoaded] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    // Websocket configuration
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000/cable");

        ws.onopen = () => {
            setSocketConnected(true);
            console.log("Connected to WebSocket in room " + id);

            ws.send(
                JSON.stringify({
                    command: "subscribe",
                    identifier: JSON.stringify({
                        channel: "RoomChannel",
                        room_id: id,
                    }),
                })
            );
        };

        ws.onmessage = (e) => {
            const response = JSON.parse(e.data);
            if (response.type === "ping") return;
            if (response.type === "confirm_subscription") return;
            if (response.type === "welcome") return;

            const messageData = response.message;
            setMessages((messages) => [...messages, messageData]);
        };

        return () => {
            ws.close();
        };
    }, [id]);

    // Get messages from API on first load
    useEffect(() => {
        getRoomMessages(id).then((messagesData) => {
            setMessages(messagesData);
            setInitialMessagesLoaded(true);
        });
    }, [id]);

    function handleSend(e) {
        e.preventDefault();
        sendMessage(id, messageInput);
        setMessageInput("");
    }

    if (initialMessagesLoaded && socketConnected) {
        return (
            <div className="Room">
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>{message.text}</li>
                    ))}
                </ul>
                <form onSubmit={handleSend}>
                    <input
                        type="text"
                        id="message"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

export default Room;
