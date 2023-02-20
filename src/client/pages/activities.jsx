import {getJSON} from "../utils/api/getJSON";
import {useLoader} from "../useLoader";

function ListActivities() {
    const { data, loading, error } = useLoader(
        async () => await getJSON("/api/activities"),
        []);

    const activities = data;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return activities.map(({ id, name, description }) => (
        <div key={id}>
            <p>
                {id}: {name} {description}
            </p>
        </div>
    ));
}

export function Activities(){
    return (
        <div>
            <ListActivities />
        </div>
    );

}