import { createRoot } from "react-dom/client";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {useLoader} from "./useLoader";
import {Login} from "./pages/login/login";
import {Register} from "./pages/login/register";
import {getJSON} from "./utils/api/getJSON";
import {Activities} from "./pages/activities";
import {ManagerPage} from "./pages/manager/managerPage";

const element = document.getElementById("app");
const root = createRoot(element);



function LogOut(){
    async function handleLogout(e) {
        e.preventDefault();
        await fetch("/api/login/", {
            method: "DELETE"}).then(() => {
                window.location.href = "/";
        });
    }

    return (
        <button onClick={handleLogout}>Log out</button>
    );
}

function ManagerLinks() {
    return (
        <div>
            <Link to={"/manager"}>Manager section</Link>
        </div>
    );
}

function FrontPage() {
    const {loading, data} =  useLoader(async () => await getJSON("/api/login"));
    const user = data;

    if(loading){
        return <div>loading...</div>;
    }

    return (
        <div>
            <Link to={"/"}>Home</Link>
            <h1>Hello FrontPage</h1>
            {user ?
                <div>
                    <h1>Hello {user.name}</h1>
                    <LogOut/>
                    <Activities/>
                    {user.role === "manager" ? <ManagerLinks/> : null}
                </div>
                :
                <LoginLinks user={user} />}
        </div>
    );
}

function LoginLinks() {
    return(
        <div>
            <div>
                <Link to={"/login"}>Login</Link>
            </div>
            <div>
                <Link to={"/register"}>New user</Link>
            </div>
        </div>
    )

}

function Application() {
  return (
    <BrowserRouter>
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