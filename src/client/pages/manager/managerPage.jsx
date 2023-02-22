import {Link, Route, Routes, useLocation} from "react-router-dom";
import {CreateActivity} from "./createActivity";
import {ListActivities} from "../activities/listActivities";
import {EditUsers} from "./editUsers";


export function ManagerPage() {
    const location = useLocation();
    const user = location.state.user;
    return (
        <div>
            <h1> Welcome to manager section </h1>
            <ul>
                <li>
                    <Link to={"/manager/activities/new"} state={{user: user}}>Create activity</Link>
                </li>
                <li>
                    <Link to={"/manager/activities/edit"} state={{user: user}}>Edit activities</Link>
                </li>
                <li>
                    <Link to={"/manager/users/edit"} state={{user: user}}>Edit users</Link>
                </li>
            </ul>

            <Routes>
                <Route path={"/activities/new"} element={<CreateActivity/>}></Route>
                <Route path={"/activities/edit"} element={<ListActivities user={user}/>}></Route>
                <Route path={"/users/edit/"} element={<EditUsers/>}></Route>
            </Routes>
        </div>
    );
}