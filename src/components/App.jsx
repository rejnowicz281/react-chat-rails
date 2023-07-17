import { useEffect } from "react";
import { HashRouter, NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useRoomsStore, useUserStore } from "../store";
import Home from "./Home";
import Room from "./Room";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

function App() {
    const currentUser = useUserStore((state) => state.user);
    const logOutUser = useUserStore((state) => state.logout);

    const rooms = useRoomsStore((state) => state.rooms);
    const roomsLoaded = useRoomsStore((state) => state.roomsLoaded);
    const checkingLoginStatus = useUserStore((state) => state.checkingLoginStatus);
    const handleLoginStatus = useUserStore((state) => state.handleLoginStatus);

    useEffect(() => {
        handleLoginStatus();
    }, []);

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
                                        <button onClick={logOutUser}>Log out</button>
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
                            <Route path="/react-chat/sign-up" element={<SignUpForm />} />
                            <Route path="/react-chat/sign-in" element={<SignInForm />} />
                        </>
                    )}
                </Routes>
            </HashRouter>
        );
    }
}

export default App;
