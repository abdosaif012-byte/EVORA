import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../CSS/productinfo.css";

export function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((previousQuantity) => previousQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((previousQuantity) => {
      if (previousQuantity > 1) {
        return previousQuantity - 1;
      }

      return 1;
    });
  };

  const addToCart = async () => {
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
          quantity: quantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to add product");
        return;
      }

      toast.success(`${product.title} added to cart`);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong");
    }
  };

  if (!product) {
    return (
      <div className="product-details-loading">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <Toaster position="top-right" />

      <div className="product-details-container">
        {/* ===== IMAGE ===== */}

        <div className="product-details-image-box">
          <img
            src={product.image}
            alt={product.title}
            className="product-details-image"
          />
        </div>

        {/* ===== PRODUCT INFO ===== */}

        <div className="product-details-info">
          <p className="product-details-category">{product.category}</p>

          <h1 className="product-details-title">{product.title}</h1>

          <p className="product-details-price">${product.price}</p>

          <div className="product-details-line"></div>

          <p className="product-details-description">
            {product.description ||
              "A refined piece from the ÉVORA collection, designed with a timeless and sophisticated aesthetic."}
          </p>

          {/* Quantity */}

          <div className="quantity-section">
            <p>QUANTITY</p>

            <div className="quantity-control">
              <button onClick={decreaseQuantity}>−</button>

              <span>{quantity}</span>

              <button onClick={increaseQuantity}>+</button>
            </div>
          </div>

          {/* Add to cart */}

          <button className="details-add-cart" onClick={addToCart}>
            ADD TO CART
          </button>

          {/* Back */}

          <button className="back-to-shop" onClick={() => navigate(-1)}>
            ← BACK TO COLLECTION
          </button>
        </div>
      </div>
    </div>
  );
}
