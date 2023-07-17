import { NavLink, Outlet } from "react-router-dom";
import { useRoomsStore, useUserStore } from "../store";

function MainLayout() {
    const currentUser = useUserStore((state) => state.user);
    const rooms = useRoomsStore((state) => state.rooms);
    const logout = useUserStore((state) => state.logout);

    return (
        <div>
            <nav>
                <h1>Welcome, {currentUser.name}</h1>
                <button onClick={logout}>Log out</button>
                {rooms.map((room) => (
                    <NavLink key={room.id} to={`/react-chat/rooms/${room.id}`}>
                        {room.name}
                    </NavLink>
                ))}
            </nav>
            <Outlet />
        </div>
    );
}

export default MainLayout;
