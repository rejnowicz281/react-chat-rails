import { useUserStore } from "../store";

function SignUpForm() {
    const setUser = useUserStore((state) => state.setUser);

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const passwordConfirm = form.password_confirm.value;

        if (password !== passwordConfirm) {
            alert("Passwords don't match");
            return;
        }

        setUser({ name, email, password });
    }

    return (
        <form onSubmit={handleSubmit} className="SignUpForm">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
            <label htmlFor="password_confirm">Confirm password</label>
            <input type="password" id="password_confirm" placeholder="Confirm your password" />
            <button type="submit">Sign up</button>
        </form>
    );
}

export default SignUpForm;
