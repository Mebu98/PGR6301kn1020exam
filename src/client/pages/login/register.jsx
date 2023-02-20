import React from "react";
import {useState} from "react";
import {postJSON} from "../../utils/api/postJSON.jsx";

export function Register() {
  return (
      <div>
          <h1> Welcome to register </h1>
          <RegisterForm />
      </div>
    );
}

function RegisterForm(){
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegisterSubmit(e) {
        e.preventDefault();

        if(username.length < 3){
            alert("Username must be at least 3 characters long");
            return;
        }
        if(name.length < 1){
            alert("Name must be at least 1 characters long");
            return;
        }
        if(password.length < 3){
            alert("Password must be at least 3 characters long");
            return;
        }

        await postJSON("api/login/register", {username, name, password}).then((res) => {
            console.log(res);
            if(res === 200){
                window.location.href = "/";
            }
            else if(res === 409){
                alert("Username already exists");
            }
            else{
                alert(res);
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleRegisterSubmit}>
                <div>
                    <label>Username: <input value={username} onChange={e => setUsername(e.target.value)}/></label>
                </div>
                <div>
                    <label>Name: <input value={name} onChange={event => setName(event.target.value)}/></label>
                </div>
                <div>
                    <label>Password: <input value={password} onChange={e => setPassword(e.target.value)}/></label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}