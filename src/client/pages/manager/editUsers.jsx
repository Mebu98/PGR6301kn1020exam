import {useLoader} from "../../useLoader";
import {getJSON} from "../../utils/api/getJSON";

function ListUsers() {
    const {data, loading, error} = useLoader(
        async () => await getJSON("/api/users/all"),
        []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const users = data;

    return (
        <div>
            <ul id={"users-list"}>
                {users.map(({ _id, username, name, role }) => (
                    <li key={_id}>
                        <p>role: {role}</p>
                        <p>username: {username}</p>
                        <p>name: {name}</p>
                    </li>))}
            </ul>
        </div>
    );

}

export function EditUsers() {
    return (
        <div>
            <h1> Edit users </h1>
            <ListUsers/>
        </div>
    );
}