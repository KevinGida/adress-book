import "../style.css";
import instagramLogo from "../assets/icons8-instagram-old-50.png";
import facebookLogo from "../assets/icons8-facebook-50.png";
import linkedInLogo from "../assets/icons8-linkedin-50.png";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy;2023 Kevin Gida</p>
      <ul>
        <a href="https://www.instagram.com/kevingida/">
          <img src={instagramLogo} alt="instagram" />
        </a>
        <a href="https://www.facebook.com/Kevingida">
          <img src={facebookLogo} alt="facebook" />
        </a>
        <a href="https://www.linkedin.com/in/kevin-gida/">
          <img src={linkedInLogo} alt="linkedIn" />
        </a>
      </ul>
    </footer>
  );
}
