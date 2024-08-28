import { TextField } from "@mui/material";
import { UserContext } from "./UserContextProvider";
import { useContext, useState } from "react";
import { createUser } from "../utils/axios";

export const LoginPage = () => {
  const { setUserLoggedIn } = useContext(UserContext);
  const [haveAccount, setHaveAccount] = useState(false);

  const handleForm = () => {
    setHaveAccount((prevState) => !prevState);
  };

  const handleSignUp = (formData) => {
    formData.preventDefault();
    console.log(formData);
    const username = formData.target[0].value;
    const email = formData.target[2].value;
    const password = formData.target[4].value;

    const user = {
      username: username,
      email: email,
      password: password,
    };

    setUserLoggedIn(user);
    localStorage.setItem("user", JSON.stringify(user));
    console.log(user, "IN FUNC");

    return createUser(user);
  };

  const handleLogin = (formData) => {
    formData.preventDefault();
    console.log(formData);
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
            required
          />
          <TextField
            sx={{ borderBottom: "1px black solid", margin: "5px" }}
            className="form-input"
            id="email-input"
            label="Email"
            required
          />
          <TextField
            sx={{ borderBottom: "1px black solid", margin: "5px" }}
            className="form-input"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
          />
          <button className="user-submit-btn">Sign Up</button>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <TextField
            sx={{ borderBottom: "1px black solid", margin: "5px" }}
            className="form-input"
            id="email-input"
            label="Email"
            required
          />
          <TextField
            sx={{ borderBottom: "1px black solid", margin: "5px" }}
            className="form-input"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
          />
          <button className="user-submit-btn">Login</button>
        </form>
      )}

      {!haveAccount ? (
        <button className="switch-button" onClick={handleForm}>
          Already Have An Account? Click Here To Login
        </button>
      ) : (
        <button className="switch-button" onClick={handleForm}>
          Don' Have An Account? Click Here To Signup
        </button>
      )}
    </div>
  );
};
