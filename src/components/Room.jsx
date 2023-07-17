import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomMessages, sendMessage } from "../helpers/API";
import { useUserStore } from "../store";

function Room() {
    const currentUser = useUserStore((state) => state.user);
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
        let mounted = true;
        setInitialMessagesLoaded(false);
        getRoomMessages(id).then((messagesData) => {
            if (mounted) {
                setMessages(messagesData);
                setInitialMessagesLoaded(true);
            }
        });

        return () => (mounted = false);
    }, [id]);

    // Scroll to bottom of messages on new message and on load
    useEffect(() => {
        if (initialMessagesLoaded && socketConnected) {
            const messagesDiv = document.querySelector(".messages");
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }, [messages]);

    function handleSend(e) {
        e.preventDefault();
        sendMessage(currentUser.id, id, messageInput);
        setMessageInput("");
    }

    if (initialMessagesLoaded && socketConnected) {
        return (
            <div className="h-full flex flex-col">
                <div className="messages flex-1 overflow-y-scroll break-words p-3">
                    {messages.length === 0 && (
                        <div className="text-2xl flex h-full justify-center items-center">No messages yet.</div>
                    )}
                    {messages.map((message) => (
                        <div className="p-3" key={message.id}>
                            <div className="italic">&apos;{message.user.name}&apos; said:</div>
                            <div className="ps-5">{message.text}</div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSend} className="flex p-3">
                    <input
                        className="flex-1 outline-none px-3 rounded-3xl bg-neutral-700"
                        type="text"
                        id="message"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        required
                        placeholder="Type a message..."
                    />
                    <button
                        className="p-3 ms-3 transition-colors hover:bg-neutral-800 hover:text-neutral-100 rounded-2xl"
                        type="submit"
                    >
                        Send
                    </button>
                </form>
            </div>
        );
    } else {
        return <div className="text-4xl h-full flex justify-center items-center">Loading...</div>;
    }
}

export default Room;
