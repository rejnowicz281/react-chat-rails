import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store";

function SignInForm() {
    const signIn = useUserStore((state) => state.signIn);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await signIn(email, password);
        console.log(response);
        if (response.status == 401) setError(true);
    }

    return (
        <div className="w-[500px]">
            <form className="bg-stone-800 rounded-2xl p-12 text-xl" onSubmit={handleSubmit}>
                {error && <div className="text-center text-sm p-4">Invalid email or password</div>}
                <label htmlFor="email">Email</label>
                <input
                    className="text-base text-stone-700 block mt-3 mb-5 p-2 w-full rounded bg-slate-100 outline-none"
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    className="text-base text-stone-700 block mt-3 mb-5 p-2 w-full rounded bg-slate-100 outline-none"
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    className="bg-green-500 w-full p-4 mt-3 font-medium transition-colors hover:bg-green-400"
                    type="submit"
                >
                    Sign In
                </button>
            </form>
            <div className="text-center mt-6">
                <Link
                    className="text-teal-500 text-dark text-center rounded transition-colors hover:text-teal-200 text-lg"
                    to="/react-chat/sign-up"
                >
                    Go to Sign Up →
                </Link>
            </div>
        </div>
    );
}

export default SignInForm;
