import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./style.css";
import Header from "./Pages/Components/Header";
import Home from "./Pages/Home";
import Form from "./Pages/Components/Form";

function App() {
  const [action, setAction] = useState("Login");
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const [authenticatedUser, setAuthenticatedUser] = useState("");

  const handleOnChange = (e) => {
    setUserName(e.target.value);
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // const fetchOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ userName, password }),
    // };

    // fetch("http://localhost:3030/login", fetchOptions)
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw Error(`[${res.status} ERROR]`);
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log("DATA", data.token);
    //     const token = data.token;

    //     if (token) {
    //       setAuthenticatedUser(token);

    //       localStorage.setItem("Token", token);
    //     }
    //   })
    //   .catch((error) => console.error({ error }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    // const fetchOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ userName, password }),
    // };

    // fetch("http://localhost:3030/sign-up", fetchOptions)
    //   .then((res) => res.json())
    //   .catch(console.log)
    //   .then((user) => {
    //     if (user) {
    //       setAuthenticatedUser(user);

    //       localStorage.setItem("user", JSON.stringify(user));
    //     }
    //   });
  };

  return (
    <div className="centering">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/sign-up">
          <Form
            handleSubmit={handleSignUp}
            handleOnChange={handleOnChange}
            password={password}
            userName={userName}
            action="Sign-up"
          />
        </Route>
        <Route exact path="/login">
          <Form
            handleSubmit={handleLogin}
            handleOnChange={handleOnChange}
            action={action}
            password={password}
            userName={userName}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
