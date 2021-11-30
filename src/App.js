import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import "./style.css";
import Header from "./Pages/Components/Header";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="centering">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
