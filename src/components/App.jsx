import { useEffect, useState } from "react";
import { HashRouter, NavLink, Navigate, Route, Routes } from "react-router-dom";
import { getRooms } from "../helpers/API";
import Home from "./Home";
import Room from "./Room";

function App() {
    const [rooms, setRooms] = useState([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) {
            getRooms().then((roomsData) => {
                setRooms(roomsData);
                setMounted(true);
            });
        }
    }, []);

    if (mounted) {
        return (
            <HashRouter>
                <nav>
                    <h1>React Chat</h1>
                    {rooms.map((room) => (
                        <NavLink key={room.id} to={`/react-chat/rooms/${room.id}`}>
                            {room.name}
                        </NavLink>
                    ))}
                </nav>
                <Routes>
                    <Route path="/*" element={<Navigate to="/react-chat/home" />} />
                    <Route path="/react-chat/home" element={<Home />} />
                    <Route path="/react-chat/rooms/:id" element={<Room />} />
                </Routes>
            </HashRouter>
        );
    }
}

export default App;
