import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiUrl } from "../utils/constants";
import BoardGame from "./Components/BoardGame";

export default function Room() {
  const gameId = useParams();
  const token = localStorage.getItem("Token");
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);
  const [game, setGame] = useState({});

  function getGameWithUsers() {
    const fetchOptions = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };

    fetch(`${apiUrl}/games/${gameId.id}`, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        setGame(data.game);
        setPlayerOne(data.userInGame[0]);
        setPlayerTwo(data.secondUserInGame[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getGameWithUsers();
  }, [token, gameId]);

  return (
    <main>
      <div>
        <p>
          Player 1:{" "}
          {playerOne
            ? playerOne.userName
            : "There's an error, Try refreshing the page"}
        </p>
        <p>
          Player 2:{" "}
          {playerTwo ? playerTwo.userName : "Player hasn't entered the room"}
        </p>
      </div>
      <div>
        <BoardGame />
      </div>
    </main>
  );
}
