import "../style.css";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <a href="/">
        Address
        <span className="colour"> Book</span>
      </a>
      <button className="button" onClick={() => navigate("/addresses/create")}>
        <span>Add Contact</span>
      </button>
    </nav>
  );
}
