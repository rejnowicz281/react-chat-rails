import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store";

function SignUpForm() {
    const signUp = useUserStore((state) => state.signUp);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (password !== passwordConfirm) {
            alert("Passwords don't match");
            return;
        }
        signUp(name, email, password);
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

export default SignUpForm;
