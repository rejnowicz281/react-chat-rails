import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="bg-stone-900 text-stone-100 h-screen flex flex-col justify-center items-center">
            <Outlet />
        </div>
    );
}

export default AuthLayout;
