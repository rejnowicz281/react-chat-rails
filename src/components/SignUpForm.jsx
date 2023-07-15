import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../helpers/API";
import { useUserStore } from "../store";

function SignUpForm({ loadRooms }) {
    const setUser = useUserStore((state) => state.setUser);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== passwordConfirm) {
            alert("Passwords don't match");
            return;
        }
        const data = await signUp(name, email, password, passwordConfirm);
        if (data) {
            console.log(data);
            setUser(data.user);
            await loadRooms();
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="SignUpForm">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <label htmlFor="password_confirm">Confirm password</label>
                <input
                    type="password"
                    id="password_confirm"
                    placeholder="Confirm your password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <button type="submit">Sign up</button>
            </form>
            <Link to="/react-chat/sign-in">Log In </Link>
        </>
    );
}

SignUpForm.propTypes = {
    loadRooms: PropTypes.func.isRequired,
};

export default SignUpForm;
