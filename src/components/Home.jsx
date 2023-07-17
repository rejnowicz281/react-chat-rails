import { useState } from "react";
import { useRoomsStore } from "../store";

function Home() {
    const [name, setName] = useState("");
    const createRoom = useRoomsStore((state) => state.createRoom);

    function handleSubmit(e) {
        e.preventDefault();
        createRoom(name);
    }

    return (
        <div className="Home">
            Welcome to react chat!
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Room name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Room name"
                />
                <button type="submit">Create Room</button>
            </form>
        </div>
    );
}

export default Home;
