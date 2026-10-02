
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/editForm.css";

export function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [success, setSuccess] = useState("");

  // Get product data
  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {

        setTitle(data.title);
        setPrice(data.price);
        setDescription(data.description || "");
        setImage(data.image || "");
        setCategory(data.category);

      });

  }, [id]);


  // Update product
  const handleSubmit = (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/api/products/${id}`, {
      method: "PUT",

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
      .then((res) => res.json())
      .then(() => {

        setSuccess("Product updated successfully");

        setTimeout(() => {
          navigate("/profile");
        }, 1000);

      });
      navigate("/profile");
  };


  return (
    <div className="edit-product" style={{ margin: "80px 0" }}>

      <h1>Edit Product</h1>

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
          />
        </div>


        <div>
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="fragrances">Fragrances</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>


        {success && <p>{success}</p>}


        <button type="submit">
          Save Changes
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


