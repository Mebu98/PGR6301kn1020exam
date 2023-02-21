import {getJSON} from "../../utils/api/getJSON";
import {useLoader} from "../../useLoader";
import {useEffect, useState} from "react";

async function deleteActivity(id) {
    let response;
    await fetch(`/api/activities/${id}`, {
        method: "DELETE"
    }).then((res) => {
        response = res.status;
    });
    return response;
}

function ActivityCard({activity}) {
    return (
        <div className={"activity-card"}>
            <h3>name: {activity.name}</h3>
            <p>category: {activity.category}</p>
            <p>description: {activity.description}</p>
        </div>
    );
}

export function ListActivities({user}) {

    const [activitiesList, setActivitiesList] = useState([]);

    const { data, loading, error } = useLoader(
        async () => await getJSON("/api/activities"),
        []);

    useEffect(() => {
        setActivitiesList(data);
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    function handleLiRemove(_id) {
        const newList = activitiesList.filter((activity) => activity._id !== _id);
        setActivitiesList(newList);
    }

    function deleteButton(_id) {
        return(
            // Only show the delete button if the user is a manager
            // and the current page is the manager activities page
            (user && user.role === "manager" && window.location.pathname === "/manager/activities/edit") ?
            <button className={"delete-activity-button"} onClick={() => {
                deleteActivity(_id).then((res) => {
                    if (res === 200) {
                        handleLiRemove(_id);
                    } else {
                        console.log("Error deleting activity");
                    }
                });
            }}
            >Delete</button>
            : null
        )
    }

    return (
        <div>
            <h1>Activities</h1>
            <ul id={"activities-list"}>
                {activitiesList ? activitiesList.map((activity) => (
                    // Crash prevention, only try to map list if list exists
                <li key={activity._id}>
                    <ActivityCard activity={activity}/>
                    {deleteButton(activity._id)}
                </li>)) : null}
            </ul>
        </div>);
}