import { useState } from "react";
import Room from "./Room";

function App() {
    const [rooms, setRooms] = useState([
        { id: 1, name: "Room 1", messages: [] },
        { id: 2, name: "Room 2", messages: [] },
    ]);
    const [currentRoom, setCurrentRoom] = useState(rooms[0]);

    function sendMessage(id, message) {
        const newRooms = [...rooms];
        newRooms.find((room) => room.id === id).messages.push(message);
        setRooms(newRooms);
    }

    return (
        <div className="App">
            <h1>React Chat</h1>
            {rooms.map((room) => (
                <button key={room.id} onClick={() => setCurrentRoom(room)}>
                    {room.name}
                </button>
            ))}
            <Room room={currentRoom} sendMessage={sendMessage} />
        </div>
    );
}

export default App;
