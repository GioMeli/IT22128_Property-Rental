import React from "react";

const ApplicationForm = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Application Form</h1>
      <p style={styles.text}>Please fill out the application form below to apply for a rental property.</p>

      <form style={styles.form}>
        <label style={styles.label}>Full Name:</label>
        <input type="text" style={styles.input} placeholder="Enter your name" />

        <label style={styles.label}>Email:</label>
        <input type="email" style={styles.input} placeholder="Enter your email" />

        <label style={styles.label}>Phone Number:</label>
        <input type="text" style={styles.input} placeholder="Enter your phone number" />

        <label style={styles.label}>Preferred Location:</label>
        <input type="text" style={styles.input} placeholder="Enter your preferred location" />

        <button type="submit" style={styles.submitButton}>Submit Application</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: "60px",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#333",
  },
  text: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  form: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "40%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  label: {
    display: "block",
    marginTop: "10px",
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  submitButton: {
    marginTop: "20px",
    backgroundColor: "navy",
    color: "white",
    padding: "10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  },
};

export default ApplicationForm;
