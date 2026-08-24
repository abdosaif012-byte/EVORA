import "../CSS/home.css";
import WhiteLogo from "../Images/ÉVORA white (1).png";

export function Home() {
  return (
    <div className="Home">
      <div className="hero" id="hero">
        <div className="content">
          <h1 className="evora-h1">ÉVORA</h1>
          <h2>
            DEFINE YOUR STYLE.
            <br />
            EMBRACE YOUR
            <br />
            ELEGANCE.
          </h2>

          <p>Discover carefully crafted pieces made for every moment.</p>

          <button className="ShopNow">Shop Now</button>
        </div>
      </div>
      <div className="brand-marquee">
        <div className="marquee-content">
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
          <span>•</span>
          <img src={WhiteLogo} alt="ÉVORA logo" />
        </div>
      </div>
      <div className="shop">
        <div className="Women">
          <button className="ShopWomen">Shop Women</button>
        </div>
        <div className="Men">
          <button className="ShopMen">Shop Men</button>
        </div>
        <div className="Fragrances">
          <button className="ShopMen">Shop Fragrances</button>
        </div>
        <div className="Accessories">
          <button className="ShopMen">Shop Accessories</button>
        </div>
      </div>
    </div>
  );
}
