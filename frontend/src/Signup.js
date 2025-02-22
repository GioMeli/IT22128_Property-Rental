import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");    // Clear previous errors
    setSuccess("");  // Clear previous success message

    try {
      await axios.post("http://localhost:8080/signup", {
        username,
        password,
      });

      setSuccess("User created successfully! Redirecting to login...");
      // Redirect to the login page after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Failed to create account. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.signupBox}>
        <h2 style={styles.title}>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
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
        <p style={styles.footerText}>
          Already have an account?{" "}
          <button style={styles.linkButton} onClick={() => navigate("/login)}>
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#d1d1d1", // Grey background
  },
  signupBox: {
    backgroundColor: "navy", // Navy blue box
    padding: "40px",         // Larger padding for a bigger window
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    color: "white",
    width: "400px",          // Increase width for a nicer look
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid white",
    backgroundColor: "white",
    color: "black",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#ffcc00", // Yellow button
    color: "black",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  success: {
    color: "lightgreen",
    marginBottom: "10px",
  },
  footerText: {
    marginTop: "15px",
    fontSize: "14px",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#ffcc00",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Signup;



