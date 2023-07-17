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
        <div className="h-full flex justify-center items-center flex-col">
            <h1 className="text-5xl p-7">Welcome to React Chat!</h1>
            <form className="text-center" onSubmit={handleSubmit}>
                <input
                    className="block mt-2 mb-5 p-2 rounded-lg outline-none bg-inherit border"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Room name"
                    required
                />
                <button
                    className="p-3 rounded-lg text-rose-500 bg-stone-800 hover:text-rose-600 transition-all active:scale-110"
                    type="submit"
                >
                    Create a Room
                </button>
            </form>
        </div>
    );
}

export default Home;
