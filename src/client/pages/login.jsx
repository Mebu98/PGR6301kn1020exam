import {useState} from "react";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    async function handleLoginSubmit(e) {
        e.preventDefault();
        const result = await fetch("/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({username, password})
        });
        console.log(result);
    }

    return (
        <div>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label>Username: <input value={username} onChange={e => setUsername(e.target.value)}/></label>
                </div>
                <div>
                    <label>Password: <input value={password} onChange={e => setPassword(e.target.value)}/></label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export function Login(){
    return (
        <div>
            <h1> Welcome to login </h1>
            <LoginForm />
        </div>
    );
}