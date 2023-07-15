import { useState } from "react";
import { signIn } from "../helpers/API";
import { useUserStore } from "../store";

function SignInForm() {
    const setUser = useUserStore((state) => state.setUser);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const data = await signIn(email, password);
        if (data) {
            console.log(data);
            setUser(data.user);
        }
    }

    return (
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
    );
}

export default SignInForm;
