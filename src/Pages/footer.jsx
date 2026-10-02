import {goToTop} from "../JS/goToTop";
import { Link } from "react-router-dom";
import "../CSS/footer.css";

export function Footer() {
  return (

    <div className="Footer">


    <div className="upper-footer-part">
      <div className="footer-div">
        <h2 className="footer-h2">ÉVORA</h2>
        <p className="footer-p">
          ELEGANCE IN EVERY DETAIL
          <br />
          Discover timeless pieces designed for modern, confident individuals.
        </p>
      </div>
      <div className="footer-div">
        <h3 className="footer-h3">
            SHOP
        </h3>
        <ul className="footer-ul">
            <li className="footer-li">
                <Link to="/" onClick={goToTop}>Home</Link>
            </li>
                <li className="footer-li">
                <Link to="/men" onClick={goToTop}>Men</Link>
                </li>
                <li className="footer-li">
                <Link to="/women" onClick={goToTop}>Women</Link>
                </li>
                <li className="footer-li">
                <Link to="/accessories" onClick={goToTop}>Accessories</Link>
                </li>
                <li className="footer-li">
                <Link to="/fragrances" onClick={goToTop}>Fragrances</Link>
                </li>
        </ul>
      </div>
      <div className="footer-div">
        <h3 className="footer-h3">
            Follow Us
        </h3>
        <ul className="footer-ul">
            <li className="footer-li">
                <a href="#" className="footer-a">Instagram</a>
            </li>
            <li className="footer-li">
                <a href="#" className="footer-a">TIKTOK</a>
            </li>
            <li className="footer-li">
                <a href="#" className="footer-a">Youtube</a>
            </li>
            <li className="footer-li">
                <a href="#" className="footer-a">X</a>
            </li>
            <li className="footer-li">
                <a href="#" className="footer-a">Facbook</a>
            </li>
        </ul>
      </div>
      <div className="footer-div">
        <h3 className="footer-h3">
            ABOUT
        </h3>
        <ul className="footer-ul">
            <li className="footer-li">
                <a href="#" className="footer-a">
                Our story</a>
                </li>
            <li className="footer-li">
                <a href="#" className="footer-a">
                our journal</a>
                </li>
            <li className="footer-li">
                <a href="#" className="footer-a">
                collection</a>
                </li>
            <li className="footer-li">
                <a href="#" className="footer-a">
                press & media</a>
                </li>
            
        </ul>
      </div>
      <div className="footer-div">
        <h3 className="footer-h3">Support</h3>
        <ul className="footer-ul">
            <li className="footer-li">
                <a href="#" className="footer-a">Contact</a>
            </li>
            <li className="footer-li">
                <a href="#" className="footer-a">Shipping</a>
            </li>
            <li className="footer-li">
                <a href="#" className="footer-a">Returns</a>
            </li>
            <li className="footer-li">
                <a href="#" className="footer-a">FAQ</a>
            </li>
            </ul>
      </div>
      </div>

      <div className="lower-footer-part">
        <div className="lower-left">
            <p className="lower-left-p">© 2025 ÉVORA ALL RIGHTS RESERVED</p>
        </div>
        <div className="lower-right">
            <a href="#" className="footer-a">Privacy Policy</a>
            <a href="#" className="footer-a">Terms of Purchase</a>
            <a href="#" className="footer-a">Cookies Settings</a>
            <a href="#" className="footer-a">Accessibility</a>
            <a href="#" className="footer-a">Legal Notice</a>
        </div>
      </div>
    </div>
  );
}
