import {getJSON} from "../utils/api/getJSON";
import {useLoader} from "../useLoader";

function ListActivities() {
    const { data, loading, error } = useLoader(
        async () => await getJSON("/api/activities"),
        []);

    const activities = data;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <ul id={"activities-list"}>
                {activities.map(({ _id, name, description }) => (
                <li key={_id}>
                    <span>
                        {_id}: {name} {description}
                    </span>
                </li>))}
            </ul>
        </div>);
}

export function Activities(){
    return (
        <div>
            <ListActivities />
        </div>
    );

}