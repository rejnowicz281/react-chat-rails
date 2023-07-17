import { Link, NavLink, Outlet } from "react-router-dom";
import { useRoomsStore, useUserStore } from "../store";

function MainLayout() {
    const currentUser = useUserStore((state) => state.user);
    const rooms = useRoomsStore((state) => state.rooms);
    const logout = useUserStore((state) => state.logout);

    return (
        <div className="h-screen text-teal-400 text-xl">
            <aside className="h-full w-[300px] float-left flex-1 flex flex-col">
                <div className="py-5 p-2 text-center border-b-2 border-neutral-500 bg-neutral-800">
                    <Link className="text-4xl transition-colors hover:text-teal-800" to="/react-chat/home">
                        {currentUser.name}
                    </Link>
                    <button
                        className="block w-full bg-rose-700 transition-all hover:bg-rose-800 my-3 px-4 py-3 font-semibold"
                        onClick={logout}
                    >
                        Log out
                    </button>
                </div>
                <div className="overflow-y-scroll bg-stone-800 flex-1 p-2">
                    {rooms.map((room) => (
                        <NavLink
                            className="block p-3 hover:bg-rose-400 break-words"
                            key={room.id}
                            to={`/react-chat/rooms/${room.id}`}
                        >
                            {room.name}
                        </NavLink>
                    ))}
                </div>
            </aside>
            <main className="h-full bg-neutral-900">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
