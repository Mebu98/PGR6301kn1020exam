import {getJSON} from "../../utils/api/getJSON";
import {useLoader} from "../../useLoader";
import {Link} from "react-router-dom";
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
            <p>description: {activity.description}</p>
        </div>
    );
}

function ListActivities({user}) {

    const [activitiesList, setActivitiesList] = useState([]);

    const { data, loading, error } = useLoader(
        async () => await getJSON("/api/activities"),
        []);

    useEffect(() => {
        setActivitiesList(data);
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    function handleRemove(_id) {
        const newList = activitiesList.filter((activity) => activity._id !== _id);
        setActivitiesList(newList);
    }

    function deleteButton(_id) {
        return user && user.role === "manager" ?
            <button className={"delete-activity-button"} onClick={(e) => {
                deleteActivity(_id).then((res) => {
                    if (res === 200) {
                        handleRemove(_id);
                    } else {
                        console.log("Error deleting activity");
                    }
                });
                //update list of activities
            }}
            >Delete</button>
            : null;
    }

    return (
        <div>
            <h1>Activities</h1>
            <ul id={"activities-list"}>
                {activitiesList ? activitiesList.map((activity) => (
                <li key={activity._id}>
                    <ActivityCard activity={activity}/>
                    {deleteButton(activity._id)}
                </li>)) : null}
            </ul>
        </div>);
}

export function Activities({user}){
    return (
        <div>
            <ListActivities user={user}/>
        </div>
    );

}