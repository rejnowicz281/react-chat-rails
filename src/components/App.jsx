import { useEffect, useState } from "react";
import { HashRouter, NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { checkLoginStatus, getRooms, signOut } from "../helpers/API";
import { useUserStore } from "../store";
import Home from "./Home";
import Room from "./Room";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

function App() {
    const currentUser = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const logOutUser = useUserStore((state) => state.logout);
    const [rooms, setRooms] = useState([]);
    const [roomsLoaded, setRoomsLoaded] = useState(false);
    const [checkingLoginStatus, setCheckingLoginStatus] = useState(true);

    useEffect(() => {
        handleLoginStatus();
    }, []);

    async function handleLoginStatus() {
        const loginStatus = await checkLoginStatus();
        if (loginStatus.logged_in && !currentUser) {
            await loadRooms();
            setUser(loginStatus.user);
        } else if (!loginStatus.logged_in && currentUser) {
            setUser(null);
        }
        setCheckingLoginStatus(false);
    }

    async function handleLogOut() {
        const data = await signOut();
        if (data) {
            console.log(data);
            logOutUser();
            setRooms([]);
        }
    }

    async function loadRooms() {
        const roomsData = await getRooms();
        setRooms(roomsData);
        setRoomsLoaded(true);
        console.log("rooms loaded!");
    }

    if (!checkingLoginStatus) {
        return (
            <HashRouter>
                <Routes>
                    {currentUser && roomsLoaded ? (
                        <Route
                            element={
                                <>
                                    <nav>
                                        <h1>Welcome, {currentUser.name}</h1>
                                        <button onClick={handleLogOut}>Log out</button>
                                        {rooms.map((room) => (
                                            <NavLink key={room.id} to={`/react-chat/rooms/${room.id}`}>
                                                {room.name}
                                            </NavLink>
                                        ))}
                                    </nav>
                                    <Outlet />
                                </>
                            }
                        >
                            <Route path="/*" element={<Navigate to="/react-chat/home" />} />
                            <Route path="/react-chat/home" element={<Home />} />
                            <Route path="/react-chat/rooms/:id" element={<Room />} />
                        </Route>
                    ) : (
                        <>
                            <Route path="/*" element={<Navigate to="/react-chat/sign-up" />} />
                            <Route path="/react-chat/sign-up" element={<SignUpForm loadRooms={loadRooms} />} />
                            <Route path="/react-chat/sign-in" element={<SignInForm loadRooms={loadRooms} />} />
                        </>
                    )}
                </Routes>
            </HashRouter>
        );
    }
}

export default App;
