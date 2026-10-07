import { useState } from "react";
import "../CSS/login.css";
import LoginPhoto from "../Images/pisces-portrait-beautiful-woman (1).jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function SignUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob ,setDob] =useState("");
  const [address,setAddress]=useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createUserForm = (e) => {
    e.preventDefault();

    const newUser = {
      // column in database:the variable in useState
      name: name,
      phone: phone,
      email: email,
      password: password,
      dob:dob,
      address:address,
    };

    fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/login");
      });
  };

  return (
    <div className="login-signup">
      {/* Left part for Login */}
      <div className="login-section">
        <div className="brand">
          <h1 id="loginbrand">ÉVORA</h1>
        </div>
        {/*  */}
        <div className="form-container">
          <h3 class="form-title" id="form-title">
            create Account
          </h3>

          <form onSubmit={createUserForm} method="POST" className="login-form">
            <div className="login-input">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="login-input">
              <label htmlFor="phone">phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="login-input">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dob} 
                onChange={(e) => setDob(e.target.value)}
                placeholder="Enter your date of birth"
                required
              />
            </div>
            <div className="login-input">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                required
              />
            </div>
  
            <div className="login-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="login-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="login-actions">
              <button type="submit">Create Account</button>
            </div>
          </form>

          <div className="register">
            <p id="register-p">Already have an account?</p>
            {/* <a class="register-btn" href="#">Log In</a> */}
            <Link to="/login" className="register-btn" id="login-btn-in-signup">
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Right part for Image */}
      <div className="login-image">
        <img src={LoginPhoto} alt="Évora Campaign Image Login" />
      </div>
    </div>
  );
}
