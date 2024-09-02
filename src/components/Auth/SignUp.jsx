import { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth"; // Import only the functions you need
import logo from "../../assets/TravelSync.png";
import { saveNewUser } from "../../axios"; // Assume this is the function to save user to your database

export default function SignUp() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // This will be saved to your own database
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function onSubmit(event) {
    event.preventDefault();

    if (!isRegistering) {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      setIsRegistering(true);

      doCreateUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          return saveNewUser(user.uid, name, email);
        })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error during sign-up process:", error);
          setErrorMessage(error.message);
        })
        .finally(() => {
          setIsRegistering(false);
        });
    }
  }

  return (
    <div>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}
      <div className="login">
        <img src={logo} alt="our Logo" className="loginLogo" />
        <div className="loginFormContainer">
          <h3>Create a New Account</h3>
          <form onSubmit={onSubmit} className="sign-up-form">
            <div>
              <label>Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
              />
            </div>

            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className="styled-button sign-up-button"
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link to={"/login"} className="hover:underline font-bold">
              Continue
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
