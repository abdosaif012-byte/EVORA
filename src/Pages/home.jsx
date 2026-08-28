import "../CSS/home.css";
import BrandImage from "../Images/pexels-ba-tik-3754256.jpg";
import { useNavigate } from "react-router-dom";

export function Home() {
  
  const navigate = useNavigate();

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

          <button
            className="ShopNow"
            onClick={() => {
              document.querySelector(".shop").scrollIntoView({
                behavior: "smooth"
              });
            }}
          >
            Explore Collection
          </button>
        </div>
      </div>
      <br />
      <br />
      
      <div className="brand-story">
        <div className="brand-content">
          <span class="brand-label">THE ÉVORA STORY</span>

          <h2>
            TIMELESS
            <br />
            BY DESIGN
          </h2>

          <p>
            ÉVORA was created from a belief that true style never follows the
            moment. It lives beyond seasons, trends, and passing impressions.
          </p>

          <p>
            Inspired by timeless silhouettes, refined details, and the beauty of
            simplicity, every piece is designed to bring confidence and
            character to the way you move through life.
          </p>
        </div>
        <div className="brand-image">
          <img
            src={BrandImage}
            className="brand-image"
            alt="Evora fashion model"
          />
        </div>
      </div>
      <div className="shop">
        <div className="Women">
          <button className="ShopWomen" onClick={() => navigate("/women")}>Shop Women</button>
        </div>
        <div className="Men">
          <button className="ShopMen"   onClick={() => navigate("/men")}>Shop Men</button>
        </div>
        <div className="Fragrances">
          <button className="ShopMen"   onClick={() => navigate("/fragrances")}>Shop Fragrances</button>
        </div>
        <div className="Accessories">
          <button className="ShopMen"   onClick={() => navigate("/accessories")}>Shop Accessories</button>
        </div>
      </div>
    </div>
  );
}
