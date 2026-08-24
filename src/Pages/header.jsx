import WhiteLogo from "../Images/ÉVORA white (1).png";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineShoppingBag } from "react-icons/md";
// import { FaRegUser } from "react-icons/fa6";
import { HiOutlineUser } from "react-icons/hi";

import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import "../CSS/header.css";
import {goToTop} from "../JS/goToTop";
import { useNavigate } from "react-router-dom";


export function Header() {

  const navigate = useNavigate();

  return (
    <div className="NavBar">
      <div className="Links">
        <Link to="/" onClick={goToTop}>Home</Link>
        <Link to="/men" onClick={goToTop}>Men</Link>
        <Link to="/women" onClick={goToTop}>Women</Link>
        <Link to="/accessories" onClick={goToTop}>Accessories</Link>
        <Link to="/fragrances" onClick={goToTop}>Fragrances</Link>
      </div>
      <div className="logoImg">
        <Link to="/" onClick={goToTop} id="homeEvora">
        ÉVORA
        </Link>
      </div>
      <div className="profile">
        <Link to="/search">
          <IoSearch id="cart" />
        </Link>
        <Link to ="/cart">
        <MdOutlineShoppingBag id="shopBag"/>
        </Link>
        <Link to ="/login">
        <HiOutlineUser id="login" />
        </Link>
        
      </div>
    </div>
  );
}
