import {Link, Route, Routes, useLocation} from "react-router-dom";
import React, {useState} from "react";
import {CreateActivity} from "./createActivity";
import {Activities} from "../activities/activities";


export function ManagerPage() {
    const location = useLocation();
    const user = location.state.user;
    console.log(user);
    return (
        <div>
            <Link to={"/"}>Home</Link>
            <h1> Welcome to manager section </h1>
            <Link to={"/manager/activities/new"} state={{user: user}}>Create activity</Link>
            <Link to={"/manager/activities"} state={{user: user}}>Edit activities</Link>

            <Routes>
                <Route path={"/activities/new"} element={<CreateActivity/>}></Route>
                <Route path={"/activities"} element={<Activities user={user}/>}></Route>
            </Routes>
        </div>
    );
}