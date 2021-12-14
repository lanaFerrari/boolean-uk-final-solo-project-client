import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import Header from "./Pages/Components/Header";
import Home from "./Pages/Home";
import Form from "./Pages/Components/Form";
import Room from "./Pages/Room";
import UserHome from "./Pages/UserHome";
import { Route, Routes, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
const { apiUrl } = require("./utils/constants");

function App() {
  const navigate = useNavigate();

  const [action, setAction] = useState("Login");
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState("");
  console.log(userName, password);

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
          const user = jwtDecode(token);

          setAuthenticatedUser(user);

          localStorage.setItem("Token", token);

          navigate(`/user/${user.id}`);
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
      .then((data) => {
        console.log("DATA", data);
        const token = data.token;
        if (token) {
          const user = jwtDecode(token);

          setAuthenticatedUser(user);

          localStorage.setItem("Token", token);

          navigate(`/user/${user.id}`);
        }
      });
  };

  return (
    <div className="centering">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route
          exact
          path="/sign-up"
          element={
            <Form
              handleSubmit={handleSignUp}
              handleOnChange={handleOnChange}
              password={password}
              userName={userName}
              action="Sign-up"
            />
          }
        />

        <Route
          exact
          path="/login"
          element={
            <Form
              handleSubmit={handleLogin}
              handleOnChange={handleOnChange}
              action={action}
              password={password}
              userName={userName}
            />
          }
        />

        <Route
          exact
          path="/user"
          element={
            <Form
              handleSubmit={handleLogin}
              handleOnChange={handleOnChange}
              action={action}
              password={password}
              userName={userName}
            />
          }
        />

        <Route exact path="/game-room/:id" element={<Room />} />

        <Route exact path="/user/:id" element={<UserHome />} />
      </Routes>
    </div>
  );
}

export default App;
