import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/fragrances.css";
import "../CSS/product.css";
import toast, { Toaster } from "react-hot-toast";



export function Fragrances() {
   const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  const addToCart = async (product) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login first");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/cart", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },

      body: JSON.stringify({
        product_id: product.id,
        quantity: 1,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Failed to add product");
      return;
    }

    // Update React cart state
    setCart((previousCart) => [...previousCart, product]);

    // Show success toast
    toast.success(`${product.title} added to cart`);
  } catch (error) {
    console.error("Add to cart error:", error);
    toast.error("Something went wrong");
  }
};
  return (
    <div className="fragrances-page">
      <div className="fragrances-section">
        <div className="fragrances-Hero">
          <div className="fragrances-Content">
            <h1 id="fragrances-h1">LEAVE YOUR TRACE</h1>
            <p>Unforgettable fragrances for unforgettable moments.</p>
                <button className="fragrances-Collection"
                 onClick={() => {
                document.querySelector(".products-header").scrollIntoView({
                  behavior: "smooth",
                });
              }}>
                    Explore Collection
                </button>
          </div>
        </div>
      </div>
      <div className="products-page">
      <Toaster position="top-right" /> {/* ===== PAGE HEADER ===== */}
        <section className="products-header">
          
          <p className="products-breadcrumb"> SHOPPING / COLLECTION </p>
          <h1>The Fragrances Collection</h1>
          
        </section>
        {/* ===== PRODUCTS GRID ===== */}
        <section className="products-grid">

  {products
    .filter((product) => product.category === "fragrances")
    .map((product) => (
      <article className="product-card" key={product.id}>

        <div className="product-image-box">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>

        <div className="product-info">

           <Link to ={`/products/${product.id}`} className="product-link">
          <h2 className="product-title">
            {product.title}
          </h2>
          </Link>

          <p className="product-price">
            ${product.price}
          </p>

          <button
            className="add-cart-btn"
            onClick={() => addToCart(product)}
          >
            <span>+</span>
            ADD TO CART
          </button>

        </div>

      </article>
    ))}
    
</section>
</div>
    </div>
  )
}