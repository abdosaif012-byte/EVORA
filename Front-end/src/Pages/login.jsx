import "../CSS/login.css";
import LoginPhoto from "../Images/pisces-portrait-beautiful-woman (1).jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginUserForm = (e)=>{
     e.preventDefault();

     const userData ={
      email:email ,
      password : password
     };
     fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok){
          throw new Error("Email or password is incorrect");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        navigate("/");
      })
      .catch(error =>setError(error.message));
  }

  return (
    <div className="login-signup">
      {/* Left part for Login */}
      <div className="login-section">
        <div className="brand">
          <h1 id="loginbrand">ÉVORA</h1>
        </div>
        {/*  */}
        <div className="form-container">
          <h3 className="form-title" id="form-title">
            Log In
          </h3>

          <form onSubmit={loginUserForm} method="POST" className="login-form">
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
            <div className="errorMessage">
              {error && <p className="login-error">{error}</p>}
            </div>

            <div className="login-actions">
              <button type="submit">Log In</button>
              <div className="forgot-wrap">
                <a href="#">Forgot your password?</a>
              </div>
            </div>
          </form>

          <div className="register">
            <p id="register-p">Don't have an account?</p>
            <Link to="/signup" className="register-btn">
              Register
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
