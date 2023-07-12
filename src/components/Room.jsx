import { useEffect, useState } from "react";

function Room({ room, sendMessage }) {
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        setMessageInput("");
    }, [room]);

    function handleSend(e) {
        e.preventDefault();
        sendMessage(room.id, messageInput);
        setMessageInput("");
    }

    return (
        <div className="Room">
            <h2>{room.name}</h2>
            <ul>
                {room.messages.map((message, idx) => (
                    <li key={idx}>{message}</li>
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

export default Room;
