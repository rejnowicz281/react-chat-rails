import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomMessages, sendMessage } from "../helpers/API";

function Room() {
    const [mounted, setMounted] = useState(false);
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        if (!mounted) {
            getRoomMessages(id).then((messagesData) => {
                setMessages(messagesData);
                setMounted(true);
            });
        }
    }, []);

    function handleSend(e) {
        e.preventDefault();
        sendMessage(id, messageInput);
        getRoomMessages(id).then((messagesData) => {
            setMessages(messagesData);
        });
        setMessageInput("");
    }

    if (mounted) {
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
