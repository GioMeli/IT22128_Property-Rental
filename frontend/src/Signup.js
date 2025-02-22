import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", {
        username,
        password,
      });
      // If successful, show success message
      if (response.status === 200) {
        setMessage("User created successfully!");
      }
    } catch (err) {
      setError("Failed to create account. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.signupBox}>
        <h2 style={styles.title}>Sign Up</h2>
        {message && <p style={styles.success}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f0f0f0",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  signupBox: {
    backgroundColor: "navy",
    padding: "40px",
    borderRadius: "8px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    color: "white",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    color: "black",
  },
  button: {
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#ffcc00",
    color: "black",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  success: {
    color: "lightgreen",
    marginBottom: "10px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default SignUp;



