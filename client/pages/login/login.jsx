import React from "react";
import { useState } from "react";
import { postJSON } from "../../utils/api/postJSON";
import { sha256 } from "js-sha256";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLoginSubmit(e) {
    e.preventDefault();

    const sha256Password = sha256(password);

    await postJSON("api/users/login", {
      username,
      password: sha256Password,
    }).then((res) => {
      if (res === 200) {
        window.location.href = "/";
      } else if (res === 401) {
        alert("Username or password is incorrect");
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>
            Username:{" "}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:{" "}
            <input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export function Login() {
  return (
    <div>
      <h1> Welcome to login </h1>
      <LoginForm />
    </div>
  );
}
