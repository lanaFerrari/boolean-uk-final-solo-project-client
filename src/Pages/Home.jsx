import { Button, ButtonGroup } from "@mui/material";
import board from "../Images/board.png";

export default function Home() {
  return (
    <div className="padding-top-bottom">
      <h1 className="align-center extra-padding-top">Draughts</h1>
      <p className="align-center extra-padding-top">Enter to play</p>

      <div className="align-center padding-top-bottom">
        <ButtonGroup
          size="large"
          color="secondary"
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button onClick="/login">Login</Button>
          <Button onClick="/sign-up">Sign Up</Button>
        </ButtonGroup>
      </div>
      <div className="align-center">
        <img src={board} alt="Board gaming" width="350px" />
      </div>
    </div>
  );
}
