import React, { useState } from "react";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    preferredLocation: "",
    checkInDate: "",
    checkOutDate: "",
    duration: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.duration) {
      setError("Duration is required.");
      return;
    }

    setError(""); 
    alert("Application Submitted Successfully!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Application Form</h1>
      <p style={styles.text}>
        Please fill out the application form below to apply for a rental property.
      </p>

      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Full Name:</label>
        <input type="text" name="fullName" style={styles.input} placeholder="Enter your name" onChange={handleChange} />

        <label style={styles.label}>Email:</label>
        <input type="email" name="email" style={styles.input} placeholder="Enter your email" onChange={handleChange} />

        <label style={styles.label}>Phone Number:</label>
        <input type="text" name="phoneNumber" style={styles.input} placeholder="Enter your phone number" onChange={handleChange} />

        <label style={styles.label}>Preferred Location:</label>
        <input type="text" name="preferredLocation" style={styles.input} placeholder="Enter your preferred location" onChange={handleChange} />

        <label style={styles.label}>Check-In Date (Optional):</label>
        <input type="date" name="checkInDate" style={styles.input} onChange={handleChange} />

        <label style={styles.label}>Check-Out Date (Optional):</label>
        <input type="date" name="checkOutDate" style={styles.input} onChange={handleChange} />

        <label style={styles.label}>Duration (Required):</label>
        <input type="text" name="duration" style={styles.input} placeholder="Enter duration (e.g., 6 months)" onChange={handleChange} required />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.submitButton}>Submit Application</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#001f3f", // Dark Navy Blue
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
    color: "white",
  },
  text: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "white",
  },
  form: {
    backgroundColor: "#B0B0B0", // Grey Box
    padding: "25px",
    borderRadius: "10px",
    width: "40%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  },
  label: {
    display: "block",
    marginTop: "10px",
    fontWeight: "bold",
    color: "black",
  },
  input: {
    width: "90%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
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
