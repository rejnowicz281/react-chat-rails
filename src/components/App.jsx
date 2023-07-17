import { useEffect } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useRoomsStore, useUserStore } from "../store";
import AuthLayout from "./AuthLayout";
import Home from "./Home";
import MainLayout from "./MainLayout";
import Room from "./Room";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

function App() {
    const currentUser = useUserStore((state) => state.user);

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
                        <Route element={<MainLayout />}>
                            <Route path="/*" element={<Navigate to="/react-chat/home" />} />
                            <Route path="/react-chat/home" element={<Home />} />
                            <Route path="/react-chat/rooms/:id" element={<Room />} />
                        </Route>
                    ) : (
                        <Route element={<AuthLayout />}>
                            <Route path="/*" element={<Navigate to="/react-chat/sign-up" />} />
                            <Route path="/react-chat/sign-up" element={<SignUpForm />} />
                            <Route path="/react-chat/sign-in" element={<SignInForm />} />
                        </Route>
                    )}
                </Routes>
            </HashRouter>
        );
    }
}

export default App;
