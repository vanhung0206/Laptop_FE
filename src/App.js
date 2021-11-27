import React from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import client from "./client";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={client} />
        {/*         <Route path="/admin" component={admin} />
         */}
      </Switch>
    </Router>
  );
}

export default App;
