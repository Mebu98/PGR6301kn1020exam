import React, {useState} from "react";

export function CreateActivity() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [response, setResponse] = useState(<div></div>);


    async function handleSubmit(e) {
        e.preventDefault();

        // Manager validation is done in the backend via the signed cookie
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
                setResponse(
                    <div>
                        <h1>Activity {name} created</h1>
                    </div>
                );
            }
            else{
                setResponse(
                    <div>
                        <h1>{res.statusText}</h1>
                    </div>
                );
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
            {response}
        </div>
    );
}