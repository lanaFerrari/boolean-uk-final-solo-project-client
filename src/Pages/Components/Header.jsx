import logo from "../../Images/logo.jpg";

export default function Header() {
  return (
    <header className="align-center">
      <a href="/">
        <img src={logo} alt="Board gaming" width="200px" />
      </a>
    </header>
  );
}
