import {Link, Route, Routes} from "react-router-dom";
import {useState} from "react";

function CreateActivity() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");


    async function handleSubmit(e) {
        e.preventDefault();

        await fetch("/api/activities/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                description
            })
        }).then((res) => {
            if(res.ok){
                window.location.href = "/";
            }
        });
    }

    return(
        <div>
            <h1> Create activity </h1>
            <form onSubmit={handleSubmit}>
                <div> Name: <input type={"text"} value={name} onChange={e => setName(e.target.value)}/> </div>
                <div> Description: <input type={"text"} value={description} onChange={e => setDescription(e.target.value)}/> </div>
                <button type={"submit"}> Create </button>
            </form>
        </div>
    );
}

export function ManagerPage() {
    return (
        <div>
            <h1> Welcome to manager section </h1>
            <Link to={"/manager/activities/new"}>Create activity</Link>

            <Routes>
                <Route path={"/activities/new"} element={<CreateActivity/>}></Route>
            </Routes>
        </div>
    );
}