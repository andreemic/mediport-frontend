import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import ReportApp from "./ReportApp";
import DoctorApp from "./DoctorApp";


ReactDOM.render(
    <Router>
        <Switch>
            <Route path={'/app'} component={DoctorApp}/>
            <Route path={'/report/:reportid'} component={ReportApp}/>

            <Redirect to={'/app'}/>
        </Switch>
    </Router>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
