import "../CSS/home.css";
import WhiteLogo from "../Images/ÉVORA white (1).png";

export function Home() {
  return (
    <div className="Home">
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
