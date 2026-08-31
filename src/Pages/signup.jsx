import "../CSS/login.css";
import LoginPhoto from "../Images/pisces-portrait-beautiful-woman (1).jpg"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export function SignUp() {
  return (
    <div className="login-signup">

      {/* Left part for Login */}
      <div className="login-section">

        <div className="brand">
          <h1 id="loginbrand">
            ÉVORA
          </h1>
        </div>
{/*  */}
      <div className="form-container">
        <h3 class="form-title" id="form-title">create Account</h3>

        <form action="#" method="POST" className="login-form">
          <div className="login-input">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
          </div>
          <div className="login-input">
            <label htmlFor="phone">phone Number</label>
            <input type="text" id="phone" name="phone" placeholder="Enter your phone number" required />
          </div>
          <div className="login-input">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>

          <div className="login-input">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter your password"  required/>
          </div>

          <div className="login-actions">
            <button type="submit" >Create Account</button>
          </div>
        </form>

        <div className="register">
          <p id="register-p">Already have an account?</p>
          {/* <a class="register-btn" href="#">Log In</a> */}
          <Link to="/login" className="register-btn" >Log In</Link>
        </div>
      </div>
      </div>

      {/* Right part for Image */}
      <div className="login-image">
      <img src={LoginPhoto} alt="Évora Campaign Image Login"/>
      </div>
    </div>
  );
}
