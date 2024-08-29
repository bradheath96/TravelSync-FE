import { TextField } from "@mui/material";
import { UserContext } from "./UserContextProvider";
import { useContext, useState } from "react";
import { createUser, getUser } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/TravelSync.png";

export const LoginPage = () => {
  const { setUserLoggedIn } = useContext(UserContext);
  const [haveAccount, setHaveAccount] = useState(false);

  const navigate = useNavigate();

  const handleForm = () => {
    setHaveAccount((prevState) => !prevState);
  };

  const handleSignUp = (formData) => {
    formData.preventDefault();
    const formElements = formData.target.elements;
    const username = formElements.username.value;
    const email = formElements.email.value;
    const password = formElements.password.value;

    const user = {
      username: username,
      email: email,
      password: password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    return createUser(user).then((data) => {
      console.log("Login successful:", data);
      setUserLoggedIn(data);
      navigate("/");
    });
  };

  const handleLogin = (formData) => {
    formData.preventDefault();
    const formElements = formData.target.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;

    const user = {
      username: username,
      password: password,
    };

    setUserLoggedIn(user);
    localStorage.setItem("user", JSON.stringify(user));

    return getUser(user).then((data) => {
      console.log("Login successful:", data);
      navigate("/");
    });
  };

  return (
    <div className="login">
      <img src={logo} alt="our Logo" className="loginLogo" />
      <div className="loginFormContainer">
        {!haveAccount ? (
          <form onSubmit={handleSignUp} className="sign-up-form">
            <TextField
              sx={{ borderBottom: "1px black solid", margin: "5px" }}
              className="form-input"
              id="username-input"
              label="Username"
              name="username"
              required
            />
            <TextField
              sx={{ borderBottom: "1px black solid", margin: "5px" }}
              className="form-input"
              id="email-input"
              label="Email"
              name="email"
              required
            />
            <TextField
              sx={{ borderBottom: "1px black solid", margin: "5px" }}
              className="form-input"
              id="outlined-password-input"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
            <button type="submit" className="styled-button">
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="login-form">
            <TextField
              sx={{ borderBottom: "1px black solid", margin: "5px" }}
              className="form-input"
              id="username-input"
              label="Username"
              name="username"
              required
            />
            <TextField
              sx={{ borderBottom: "1px black solid", margin: "5px" }}
              className="form-input"
              id="outlined-password-input"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
            <button type="submit" className="styled-button">
              Login
            </button>
          </form>
        )}

        {!haveAccount ? (
          <button className="switch-button" onClick={handleForm}>
            Already Have An Account? Click Here To Login
          </button>
        ) : (
          <button className="switch-button" onClick={handleForm}>
            Don't Have An Account? Click Here To Signup
          </button>
        )}
      </div>
    </div>
  );
};
