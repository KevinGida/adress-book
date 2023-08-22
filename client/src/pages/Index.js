import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../style.css";

export default function Index() {
  return (
    <div>
      <NavBar />
      <hr />
      <Outlet />
      <Footer />
    </div>
  );
}
