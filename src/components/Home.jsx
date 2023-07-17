import PropTypes from "prop-types";
import { useState } from "react";
import { createRoom } from "../helpers/API";

function Home({ loadRooms }) {
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        createRoom(name);
        loadRooms();
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

Home.propTypes = {
    loadRooms: PropTypes.func.isRequired,
};

export default Home;
