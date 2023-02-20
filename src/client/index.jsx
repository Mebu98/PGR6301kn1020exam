import { createRoot } from "react-dom/client";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {useLoader} from "./useLoader";
import {Login} from "./pages/login";

const element = document.getElementById("app");
const root = createRoot(element);




function FrontPage() {
    const {loading, error, data} =  useLoader(async () => await fetchJSON("/api/login"));
    const user = data;
    return (
        <div>
            <h1>Hello FrontPage</h1>
            {user ? <div>Logged in as {user.username}</div> : <LoginLinks />}
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

async function fetchJSON(url){
    const res = await fetch(url);
    return await res.json();
}

function Application() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage />}></Route>
            <Route path={"/login/"} element={<Login />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

root.render(<Application />);