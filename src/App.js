import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./style.css";
import Header from "./Pages/Components/Header";
import Home from "./Pages/Home";
import Form from "./Pages/Components/Form";
import Room from "./Pages/Room";
import UserHome from "./Pages/UserHome";
const { apiUrl } = require("./utils/constants");

function App() {
  const [action, setAction] = useState("Login");
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [profile, setProfile] = useState(null);
  const [gameToJoin, setGameToJoin] = useState(null);
  const [listOfGames, setListOFGames] = useState([]);

  console.log("profile", profile);

  const [authenticatedUser, setAuthenticatedUser] = useState("");
  console.log("Auth", authenticatedUser);

  const handleOnChange = (e) => {
    setUserName(e.target.value);
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    };

    fetch(`${apiUrl}/auth/login`, fetchOptions)
      .then((res) => {
        if (!res.ok) {
          throw Error(`[${res.status} ERROR]`);
        }
        return res.json();
      })
      .then((data) => {
        const token = data.token;

        if (token) {
          setAuthenticatedUser(token);

          localStorage.setItem("Token", token);
        }
      })
      .catch((error) => console.error({ error }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const score = 0;

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password, score }),
    };

    fetch(`${apiUrl}/auth/sign-up`, fetchOptions)
      .then((res) => res.json())
      .catch(console.log)
      .then((token) => {
        if (token) {
          setAuthenticatedUser(token);

          localStorage.setItem("user", JSON.stringify(token));
        }
      });
  };

  function getProfile() {
    const token = localStorage.getItem("Token");
    console.log("Token", token);

    const fetchOptions = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };

    fetch(`${apiUrl}/users/profile`, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.userWithGames);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getProfile();
  }, []);

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
        <Route exact path="/user">
          <Form
            handleSubmit={handleLogin}
            handleOnChange={handleOnChange}
            action={action}
            password={password}
            userName={userName}
          />
        </Route>
        <Route exact path="/game-room/:id">
          <Room />
        </Route>
        <Route exact path="/user/:id">
          <UserHome profile={profile} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
