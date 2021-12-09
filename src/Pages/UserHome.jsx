import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const { apiUrl } = require("../utils/constants");

export default function UserHome() {
  const navigate = useNavigate();

  const [userGames, setUserGames] = useState([]);
  const [allGamesAvailable, setAllGamesAvailable] = useState([]);
  const [profile, setProfile] = useState({});

  const token = localStorage.getItem("Token");

  console.log("Token", token);
  console.log("profile", profile);

  function checkStatus(game) {
    return game.status === "start";
  }

  function getActiveGames() {
    const fetchOptions = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };

    fetch(`${apiUrl}/games`, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        const cleanData = data.games.filter(checkStatus);

        setAllGamesAvailable(cleanData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getProfile() {
    const fetchOptions = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };

    fetch(`${apiUrl}/users/profile`, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.userWithGames.profile);

        if (data.userWithGames.userGames) {
          setUserGames(data.userWithGames.userGames);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleCreateGame = () => {
    const fetchOptions = {
      method: "POST",
      headers: {
        authorization: token,
      },
    };

    fetch(`${apiUrl}/games`, fetchOptions)
      .then((res) => res.json())
      .then((game) => {
        console.log("Data inside handle Create Game", game);
        const newGame = game.id;

        navigate(`/game-room/${newGame}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleJoinGame = (id) => {
    const fetchOptions = {
      method: "PUT",
      headers: {
        authorization: token,
      },
    };

    fetch(`${apiUrl}/games/${id}/join`, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data JOIN", data);
        navigate(`/game-room/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOff = () => {
    localStorage.removeItem("token");

    navigate(`/`);
  };

  useEffect(() => {
    getActiveGames();
    getProfile();
  }, []);

  return (
    <div>
      <h1>Hello, {profile.userName}</h1>
      <p>Score: {profile.score}</p>
      <Button
        variant="outlined"
        onClick={() => {
          handleSignOff();
        }}
      >
        Sign out
      </Button>
      <hr />

      <Button
        variant="outlined"
        onClick={() => {
          handleCreateGame();
        }}
      >
        Create New Game
      </Button>
      <p>Or choose one of the active games of the list:</p>
      <ul className="responsive-grid">
        {allGamesAvailable.map((game, index) => {
          const id = game.id;

          return (
            <li key={index}>
              <h3>Game Number: {id}</h3>
              <p>photo here</p>
              <Button
                variant="outlined"
                onClick={() => {
                  handleJoinGame(id);
                }}
              >
                Play game
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
