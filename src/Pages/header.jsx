import { MdOutlineShoppingBag } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { RiCustomerServiceFill } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import "../CSS/header.css";
import {goToTop} from "../JS/goToTop";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export function Header() {

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLinkClick = () => {
    goToTop();
    closeSidebar();
  };

  return (
    <>
      <div className="NavBar">
        <button
          className="menuToggle"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
        >
          <HiOutlineMenu />
        </button>

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

      <div
        className={`sidebarOverlay ${isSidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
      />

      <div className={`Sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button
          className="sidebarClose"
          onClick={closeSidebar}
          aria-label="Close menu"
        >
          <HiOutlineX />
        </button>
        <div className="sidebarLinks">
          <Link to="/" onClick={handleLinkClick}>Home</Link>
          <Link to="/men" onClick={handleLinkClick}>Men</Link>
          <Link to="/women" onClick={handleLinkClick}>Women</Link>
          <Link to="/accessories" onClick={handleLinkClick}>Accessories</Link>
          <Link to="/fragrances" onClick={handleLinkClick}>Fragrances</Link>
        </div>
      </div>
      <div className="chatbot">
          <Link to="/chatbot" >
          <RiCustomerServiceFill />
          </Link>
      </div>
    </>
  );
}