import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useLoader } from "./useLoader";
import { Login } from "./pages/login/login";
import { Register } from "./pages/login/register";
import { getJSON } from "./utils/api/getJSON";
import { ListActivities } from "./pages/activities/listActivities";
import { ManagerPage } from "./pages/manager/managerPage";
import React from "react";

const element = document.getElementById("app");
const root = createRoot(element);

function LogOut() {
  async function handleLogout(e) {
    e.preventDefault();
    await fetch("/api/users/logout", {
      method: "DELETE",
    }).then(() => {
      window.location.href = "/";
    });
  }

  return <button onClick={handleLogout}>Log out</button>;
}

function ManagerLinks({ user }) {
  return (
    <div>
      <Link to="/manager" state={{ user: user }}>
        Manager section
      </Link>
    </div>
  );
}

function FrontPage() {
  const { loading, data } = useLoader(
    async () => await getJSON("/api/users/cookie")
  );
  const user = data;

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>Hello FrontPage</h1>
      {user ? (
        <div>
          <h1>Hello {user.name}</h1>
          <LogOut />
          {user.role === "manager" ? <ManagerLinks user={user} /> : null}
          <ListActivities user={user} />
        </div>
      ) : (
        <LoginLinks user={user} />
      )}
    </div>
  );
}

function LoginLinks() {
  return (
    <div>
      <div>
        <Link to={"/login"}>Login</Link>
      </div>
      <div>
        <Link to={"/register"}>New user</Link>
      </div>
    </div>
  );
}

function Application() {
  return (
    <BrowserRouter>
      <Link to={"/"}>Home</Link>
      <Routes>
        <Route path={"/"} element={<FrontPage />}></Route>
        <Route path={"/login/"} element={<Login />}></Route>
        <Route path={"/register/"} element={<Register />}></Route>
        <Route path={"/manager/*"} element={<ManagerPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

root.render(<Application />);
