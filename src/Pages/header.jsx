import Logo from "../Images/ÉVORA Black Nav.png";
import WhiteLogo from "../Images/ÉVORA white (1).png";
import { LuShoppingCart } from "react-icons/lu";
import "../CSS/header.css";

export function Header() {
  return (
    <div className="NavBar">
      <div className="logoImg">
        <a href="#">
        <img src={WhiteLogo} alt="Evora Logo" />
        </a>
      </div>
      <div className="Links">
        <a href="#">Home</a>
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">Accessories</a>
      </div>
      <div className="profile">
        <a href="#">
          <LuShoppingCart id="cart" />
        </a>
        <button className="login">Log In</button>
      </div>
    </div>
  );
}
