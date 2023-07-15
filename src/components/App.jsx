import { useEffect, useState } from "react";
import { HashRouter, NavLink, Navigate, Route, Routes } from "react-router-dom";
import { getRooms } from "../helpers/API";
import { useUserStore } from "../store";
import Home from "./Home";
import Room from "./Room";
import SignUpForm from "./SignUpForm";

function App() {
    const currentUser = useUserStore((state) => state.user);
    const logOutUser = useUserStore((state) => state.logout);
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

    if (mounted && currentUser) {
        return (
            <HashRouter>
                <nav>
                    <h1>Welcome, {currentUser.name}</h1>
                    <button onClick={logOutUser}>Log out</button>
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
    } else {
        return <SignUpForm />;
    }
}

export default App;
