import React, { useState } from "react";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import logo from "../../assets/TravelSync.png";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { saveNewUser } from "../../axios";
import continueGoogle from "../../assets/continue-google.png";

export default function Login() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithEmailAndPassword(email, password).then((response) => {
        console.log("login success");
      });
    }
  }

  function handleDemoMode() {
    const demoEmail = "demo@example.com";
    const demoPassword = "password";
    doSignInWithEmailAndPassword(demoEmail, demoPassword).then((response) => {
      console.log("signed into demo mode");
    });
  }

  function onGoogleSignIn(event) {
    event.preventDefault;
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle()
        .then((result) => {
          const user = result.user;
          console.log(result._tokenResponse.isNewUser);
          if (result._tokenResponse.isNewUser) {
            saveNewUser(user.uid, user.displayName, user.email)
              .then((response) => {
                console.log("new user saved to the database:", response);
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            console.log("existing user signed in");
          }
        })
        .catch((err) => {
          setIsSigningIn(false);
        });
    }
  }

  return (
    <div>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      <div className="login">
        <img src={logo} alt="our Logo" className="loginLogo" />

        <div className="loginFormContainer">
          <h3>Welcome Back</h3>
          <form onSubmit={onSubmit} className="sign-up-form">
            <div>
              <label>Email</label>
              <input
                type="email"
                autoComplete="email"
                className="form-input"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-input"
              />
            </div>
            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}
            <button
              type="submit"
              disabled={isSigningIn}
              className="styled-button sign-up-button"
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p>
            Don't have an account?{" "}
            <Link to={"/SignUp"} className="hover:underline font-bold">
              Sign up
            </Link>
          </p>
          <button
            disabled={isSigningIn}
            onClick={(e) => {
              onGoogleSignIn(e);
            }}
            className="google-sign-in"
          >
            <img src={continueGoogle} className="continue-google-img" />
            {isSigningIn ? "Signing In..." : "Continue with Google"}
          </button>
        </div>
        <button className="styled-button" onClick={handleDemoMode}>
          Click here for Demo mode
        </button>
      </div>
    </div>
  );
}
