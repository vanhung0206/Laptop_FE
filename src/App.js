import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import client from "./client";
import CallApi from "./helper/axiosClient";
import admin from "./pages/admin/admin";
import * as action from "./actions/user";
function App() {
    const [isCalled, setIsCalled] = useState(false);
    const token = localStorage.getItem("Authorization");
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        if (token) {
            CallApi({
                url: "/api/auth/user",
                method: "get",
            })
                .then((data) => {
                    if (data && data.statusCode === 200) {
                        dispatch(action.getUser(data));
                    } else {
                        localStorage.removeItem("Authorization");
                        dispatch(action.logOutUser());
                    }
                    setIsCalled(true);
                })
                .catch((err) => {
                    console.log(
                        "🚀 ~ file: App.js ~ line 26 ~ useLayoutEffect ~ err",
                        err
                    );
                    setIsCalled(true);
                });
        } else {
            setIsCalled(true);
        }
    }, []);

    if (!isCalled) return null;

    return (
        <Router>
            <Switch>
                <Route path="/admin" component={admin} />
                <Route path="/" component={client} />
            </Switch>
        </Router>
    );
}

export default App;
