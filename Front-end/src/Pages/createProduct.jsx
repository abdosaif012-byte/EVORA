import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/editForm.css";

export function CreateProduct() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    setError("");
    setSuccess("");

    fetch("http://127.0.0.1:8000/api/products", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title: title,
        price: price,
        description: description,
        image: image,
        category: category,
      }),
    })
      .then(async (res) => {

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Could not create product");
        }

        return data;
      })
      .then(() => {

        setSuccess("Product created successfully");

        setTimeout(() => {
          navigate("/profile");
        }, 1000);

      })
      .catch((error) => {

        console.log(error);
        setError(error.message);

      });

  };


  return (
    <div className="edit-product">

      <h1>Create Product</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="title">Title</label>

          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>


        <div>
          <label htmlFor="price">Price</label>

          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>


        <div>
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>


        <div>
          <label htmlFor="image">Image</label>

          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>


        <div>
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="fragrances">Fragrances</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>


        {error && <p className="edit-error">{error}</p>}

        {success && <p>{success}</p>}


        <button type="submit">
          Create Product
        </button>


        <button
          type="button"
          onClick={() => navigate("/profile")}
        >
          Cancel
        </button>

      </form>

    </div>
  );
}