
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../CSS/editForm.css";

export function EditUser() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Get user data
  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {

        setName(data.name);
        setPhone(data.phone || "");
        setEmail(data.email);
        setDob(data.dob || "");
        setAddress(data.address || "");
        setRole(data.role);

      });

  }, [id]);


  // Update user
  const handleSubmit = (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    setError("");
    setSuccess("");

    fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        dob: dob,
        address: address,
        role: role,
      }),
    })
      .then(async (res) => {

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Could not update user");
        }

        return data;

      })
      .then(() => {

        setSuccess("User updated successfully");

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

      <h1>Edit User</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="name">Name</label>

          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>


        <div>
          <label htmlFor="phone">Phone</label>

          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>


        <div>
          <label htmlFor="email">Email</label>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>


        <div>
          <label htmlFor="dob">Date of Birth</label>

          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>


        <div>
          <label htmlFor="address">Address</label>

          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>


        <div>
          <label htmlFor="role">Role</label>

          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>


        {error && <p className="edit-error">{error}</p>}

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