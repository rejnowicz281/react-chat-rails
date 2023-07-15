import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "../helpers/API";
import { useUserStore } from "../store";

function SignInForm({ loadRooms }) {
    const setUser = useUserStore((state) => state.setUser);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const data = await signIn(email, password);
        if (data) {
            console.log(data);
            setUser(data.user);
            await loadRooms();
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="SignInForm">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign In</button>
            </form>
            <Link to="/react-chat/sign-up">Sign Up </Link>
        </>
    );
}

SignInForm.propTypes = {
    loadRooms: PropTypes.func.isRequired,
};

export default SignInForm;
