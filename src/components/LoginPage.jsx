import { TextField } from "@mui/material";
import { UserContext } from "./UserContextProvider";
import { useContext, useState } from "react";
import { createUser, getUser } from "../utils/axios";

export const LoginPage = () => {
  const { setUserLoggedIn } = useContext(UserContext);
  const [haveAccount, setHaveAccount] = useState(false);

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

    console.log(user);
    setUserLoggedIn(user.email);
    localStorage.setItem("user", JSON.stringify(user.email));

    return createUser(user);
  };

  const handleLogin = (formData) => {
    formData.preventDefault();
    const formElements = formData.target.elements;
    const email = formElements.email.value;
    const password = formElements.password.value;

    const user = {
      email: email,
      password: password,
    };

    setUserLoggedIn(user.email);
    localStorage.setItem("user", JSON.stringify(user.email));

    // You can add logic here to check login credentials, e.g., an API call
    console.log("Login successful:", user);

    return getUser(user);
  };

  return (
    <div className="login">
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
          <button type="submit" className="user-submit-btn">
            Sign Up
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
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
          <button type="submit" className="user-submit-btn">
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
  );
};
