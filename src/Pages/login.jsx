import WhiteLogo from "../Images/ÉVORA white (1).png";
import "../CSS/login.css";

export function Login() {
  return (
    <div className="loginPage">

      <div className="loginImage">
    
      </div>

      <div className="loginForm">

        <div className="logo">
          <img src={WhiteLogo} alt="ÉVORA Logo" className="lgnLogo"/>
        </div>

        <form className="login-form">
            <br></br>
            <hr></hr>
            <br></br>
          <h1>Login</h1>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}