import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error
    try {
      // Replace with your backend login endpoint URL.
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });
      
      // If login is successful, navigate to the home page.
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Rental Properties Application</h1>
      <div style={styles.boxesContainer}>
        {/* Sign In Box */}
        <div style={styles.box}>
          <h2>Sign In</h2>
          {errorMessage && <div style={styles.error}>{errorMessage}</div>}
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
        </div>

        {/* Sign Up Box */}
        <div style={styles.box}>
          <h2>Sign Up</h2>
          <p>If you don't have an account, please sign up!</p>
          <Link to="/signup">
            <button style={styles.button}>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "navy",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  title: {
    color: "white",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  boxesContainer: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#ddd",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "300px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Login;


