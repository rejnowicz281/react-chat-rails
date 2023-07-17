import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store";

function SignInForm() {
    const signIn = useUserStore((state) => state.signIn);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        signIn(email, password);
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

export default SignInForm;
