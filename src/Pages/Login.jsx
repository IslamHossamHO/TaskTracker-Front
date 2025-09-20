import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import graduationCap from "../Assets/graduationcap.png";
import eye from "../Assets/eye.png";
import "../Styles/Pages/Login.css";
import { LoginAPI , GetUserById } from "../Api";

export default function Login() {
  const [seePass, setSeePass] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPass] = useState("");
  const navigate = useNavigate();

  const HandleLogin = async (e) => {
    e.preventDefault();
    const result = await LoginAPI(Email, Password);
    const s = result;

    if (result) {
      const m = await GetUserById(s.id);
      sessionStorage.setItem("User" , JSON.stringify(m));
      navigate("/profile");
    } else {
      alert("Login failed!");
    }
  };

  return (
    <div id="loginContainer" className="login__frame">
      <div className="login__icon-frame">
        <img src={graduationCap} className="login__icon" alt="Icon" />
      </div>
      <h1 className="login__title">School Task Manager</h1>
      <h2 className="login__subtitle">Sign in to your account</h2>

      <form id="loginForm" onSubmit={HandleLogin}>
        <div className="login__input-wrapper">
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email Address"
            className="login__input"
          />
        </div>

        <div className="login__input-wrapper">
          <input
            type={seePass ? "text" : "password"}
            value={Password}
            onChange={(e) => setPass(e.target.value)}
            required
            placeholder="Password"
            className="login__input"
          />
          <img
            src={eye}
            className="login__eye-button"
            onClick={() => setSeePass(!seePass)}
            alt="Toggle Password"
          />
        </div>

        <div className="login__checkbox-row">
          <label>
            <input type="checkbox" className="login__checkbox" />
            <span className="login__remember-label">Remember me</span>
          </label>
          <span className="login__forgot-label">Forgot your password?</span>
        </div>

        <button type="submit" className="login__button">
          Sign In
        </button>
      </form>
    </div>
  );
}
