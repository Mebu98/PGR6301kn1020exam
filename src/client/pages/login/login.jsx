import React from "react";
import {useState} from "react";
import {postJSON} from "../../utils/api/postJSON";
import {Link} from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    async function handleLoginSubmit(e) {
        e.preventDefault();

        await postJSON("api/login", {username, password}).then((res) => {
            if (res === 200){
                //window.location.href = "/";
            }
            else if (res === 401){
                alert("Username or password is incorrect");
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label>Username: <input value={username} onChange={e => setUsername(e.target.value)}/></label>
                </div>
                <div>
                    <label>Password: <input type={"password"} value={password} onChange={e => setPassword(e.target.value)}/></label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export function Login(){
    return (
        <div>
            <Link to={"/"}>Home</Link>
            <h1> Welcome to login </h1>
            <LoginForm />
        </div>
    );
}