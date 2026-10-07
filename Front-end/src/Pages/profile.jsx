import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "../CSS/profile.css";

export function ProfileAndDashboard() {
  const navigate = useNavigate();

  const [dashboardSection, setDashboardSection] = useState("personalDetails");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  const [sectionLoading, setSectionLoading] = useState(false);

  const token = localStorage.getItem("token");

  // show the current user's orders
  useEffect(() => {
    if (!token) return;

    fetch("http://127.0.0.1:8000/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to get orders");
        }

        return res.json();
      })
      .then((data) => {
        setUserOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // current user information
  useEffect(() => {
    if (!token) {
      setError("You are not logged in");
      setLoading(false);
      return;
    }

    fetch("http://127.0.0.1:8000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to get profile");
        }

        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load profile");
        setLoading(false);
      });
  }, []);

  // Admin dashboard data
  useEffect(() => {
    if (!token) return;

    const endpoints = {
      users: "http://127.0.0.1:8000/api/users",
      products: "http://127.0.0.1:8000/api/products",
      orders: "http://127.0.0.1:8000/api/all-orders",
    };

    const setters = {
      users: setUsers,
      products: setProducts,
      orders: setOrders,
    };

    if (!endpoints[dashboardSection]) return;

    setSectionLoading(true);

    fetch(endpoints[dashboardSection], {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch ${dashboardSection}`);
        }

        return res.json();
      })
      .then((data) => {
        setters[dashboardSection](data);
        setSectionLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSectionLoading(false);
      });
  }, [dashboardSection]);

  // Logout
  const logout = () => {
    fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Logout failed");
        }

        return res.json();
      })
      .then(() => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Edit Product
  const editProduct = (id) => {
    navigate(`/products/edit/${id}`);
  };

  // Edit User
  const editUser = (id) => {
    navigate(`/users/edit/${id}`);
  };

  // Delete Product
  const deleteProduct = (id) => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setProducts(products.filter((product) => product.id !== id));
    });
  };

  // Update Order Status
  const updateOrderStatus = (id, newStatus) => {
    const previousOrders = orders;

    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)),
    );

    fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update order status");
        }

        return res.json();
      })
      .then(() => {
        toast.success("Order status updated");
      })
      .catch((err) => {
        console.log(err);

        setOrders(previousOrders);

        toast.error("Could not update order status");
      });
  };

  // Delete User
  const deleteUser = (id) => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      });
  };

  // Loading / Error

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profileAndDashboard">
      <Toaster position="top-right" />

      {/* SIDEBAR */}
      <div className="pfp-sidebar">
        <div className="pfp-info">
          <h3 className="pfp-info-name">{user?.name?.split(" ")[0]}</h3>

          <p className="pfp-info-role">{user?.role}</p>
        </div>

        {/* Personal Details */}

        <button
          className="pfp-btn"
          onClick={() => setDashboardSection("personalDetails")}
        >
          <span className="pfp-btn-span">Personal Details</span>

          <span className="pfp-btn-span">→</span>
        </button>

        {/* Admin buttons */}

        {user?.role === "admin" && (
          <>
            {/* Users */}

            <button
              className="pfp-btn"
              onClick={() => setDashboardSection("users")}
            >
              <span className="pfp-btn-span">Users</span>

              <span className="pfp-btn-span">→</span>
            </button>

            {/* Products */}

            <button
              className="pfp-btn"
              onClick={() => setDashboardSection("products")}
            >
              <span className="pfp-btn-span">Products</span>

              <span className="pfp-btn-span">→</span>
            </button>

            {/* Orders */}

            <button
              className="pfp-btn"
              onClick={() => setDashboardSection("orders")}
            >
              <span className="pfp-btn-span">Orders</span>

              <span className="pfp-btn-span">→</span>
            </button>
          </>
        )}

        {/* Logout */}

        <button className="pfp-btn" id="logout-btn" onClick={logout}>
          <span className="pfp-btn-span">Logout</span>

          <span className="pfp-btn-span">
            <FiLogOut />
          </span>
        </button>
      </div>

      {/* CONTENT */}
      <div className="pfp-content">
        {/* PERSONAL DETAILS */}
        {dashboardSection === "personalDetails" && (
          <div>
            <h1>Personal Details</h1>

            <div className="personal-details">
              <p>Name: {user?.name}</p>

              <p>Email: {user?.email}</p>

              <p>Phone: {user?.phone}</p>

              <p>Date of Birth: {user?.dob}</p>

              <p>Address: {user?.address}</p>

              <p>Role: {user?.role}</p>
            </div>

            {/*  CURRENT USER ORDERS */}
            <h2 className="section-subheading">My Orders</h2>

            {userOrders.length === 0 ? (
              <p>You don't have any orders yet.</p>
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Products</th>
                    <th>Total Price</th>
                  </tr>
                </thead>

                <tbody>
                  {userOrders.map((o) => (
                    <tr key={o.id}>
                      <td>{o.id}</td>

                      <td>
                        {o.items?.map((item) => (
                          <div key={item.id}>
                            {item.product?.title}
                            {" × "}
                            {item.quantity}
                          </div>
                        ))}
                      </td>

                      <td>{o.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* USERS */}
        {dashboardSection === "users" && (
          <div>
            <h1>Users</h1>

            <p>
              <Link to="/signup" className="create-btn">
                Create New User
              </Link>
            </p>

            {sectionLoading ? (
              <p>Loading users...</p>
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>DOB</th>
                    <th>Address</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>

                      <td>{u.phone}</td>

                      <td>{u.email}</td>

                      <td>{u.role}</td>

                      <td>{u.dob}</td>

                      <td>{u.address}</td>

                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => editUser(u.id)}
                        >
                          Edit
                        </button>
                      </td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            deleteUser(u.id);

                            toast.success("User deleted successfully");
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* PRODUCT */}
        {dashboardSection === "products" && (
          <div>
            <h1>Products</h1>

            <p>
              <Link to="/products/create" className="create-btn">
                Create New Product
              </Link>
            </p>

            {sectionLoading ? (
              <p>Loading products...</p>
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.title}</td>

                      <td>{p.price}</td>

                      <td>{p.category}</td>

                      <td>
                        <a
                          href={p.image}
                          target="_blank"
                          rel="noreferrer"
                          className="product-image-link"
                        >
                          Image
                        </a>
                      </td>

                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => editProduct(p.id)}
                        >
                          Edit
                        </button>
                      </td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => {
                            deleteProduct(p.id);

                            toast.success("Product deleted successfully");
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ADMIN ORDERS*/}

        {dashboardSection === "orders" && (
          <div>
            <h1>Orders</h1>

            {sectionLoading ? (
              <p>Loading orders...</p>
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>The Products</th>
                    <th>Total Price</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>{o.id}</td>

                      <td>{o.user_id}</td>

                      <td>{o.user?.name}</td>

                      <td>
                        {o.items?.map((item) => (
                          <div key={item.id}>
                            {item.product?.title}
                            {" × "}
                            {item.quantity}
                          </div>
                        ))}
                      </td>

                      <td>{o.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
