import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  // Load existing applications from the backend on mount
  useEffect(() => {
    axios.get("http://localhost:8080/api/applications")
      .then(response => setApplications(response.data))
      .catch(err => console.error("Error fetching applications:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.duration) {
      setError("Duration is required.");
      return;
    }

    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/applications", formData);
      // Add the new application (returned from backend with its id) to the state
      setApplications([...applications, response.data]);
      alert("Application Submitted Successfully!");
      // Clear the form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        preferredLocation: "",
        checkInDate: "",
        checkOutDate: "",
        duration: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to submit application. Try again.");
    }
  };

  // Delete an application by calling the backend DELETE endpoint
  const handleDeleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/applications/${id}`);
      // Remove deleted application from state
      setApplications(applications.filter(app => app.id !== id));
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Failed to delete application. Please try again.");
    }
  };

  // Navigate back to the root page ("Available Properties")
  const handleBackToProperties = () => {
    navigate("/");
  };

  return (
    <div style={styles.pageContainer}>
      {/* Left Column: Application Form */}
      <div style={styles.formContainer}>
        <h1 style={styles.title}>Application Form</h1>
        <p style={styles.text}>
          Please fill out the application form below to apply for a rental property.
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Full Name:</label>
          <input
            type="text"
            name="fullName"
            style={styles.input}
            placeholder="Enter your name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            style={styles.input}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label style={styles.label}>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            style={styles.input}
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <label style={styles.label}>Preferred Location:</label>
          <input
            type="text"
            name="preferredLocation"
            style={styles.input}
            placeholder="Enter your preferred location"
            value={formData.preferredLocation}
            onChange={handleChange}
          />

          <label style={styles.label}>Check-In Date (Optional):</label>
          <input
            type="date"
            name="checkInDate"
            style={styles.input}
            value={formData.checkInDate}
            onChange={handleChange}
          />

          <label style={styles.label}>Check-Out Date (Optional):</label>
          <input
            type="date"
            name="checkOutDate"
            style={styles.input}
            value={formData.checkOutDate}
            onChange={handleChange}
          />

          <label style={styles.label}>Duration (Required):</label>
          <input
            type="text"
            name="duration"
            style={styles.input}
            placeholder="Enter duration (e.g., 6 months)"
            value={formData.duration}
            onChange={handleChange}
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.submitButton}>Submit Application</button>
        </form>
      </div>

      {/* Right Column: Display Submitted Applications */}
      <div style={styles.applicationsContainer}>
        <h2 style={styles.applicationsTitle}>Submitted Applications</h2>
        {applications.length === 0 ? (
          <p style={styles.noApplications}>No applications submitted yet.</p>
        ) : (
          applications.map((app, index) => (
            <div key={app.id} style={styles.applicationCard}>
              <p><strong>Name:</strong> {app.fullName}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phoneNumber}</p>
              <p><strong>Location:</strong> {app.preferredLocation}</p>
              <p><strong>Duration:</strong> {app.duration}</p>
              {app.checkInDate && <p><strong>Check-In:</strong> {app.checkInDate}</p>}
              {app.checkOutDate && <p><strong>Check-Out:</strong> {app.checkOutDate}</p>}
              <button
                style={styles.deleteButton}
                onClick={() => handleDeleteApplication(app.id)}
              >
                Delete Application
              </button>
            </div>
          ))
        )}
        {/* New Button to navigate back to available properties */}
        <button style={styles.backButton} onClick={handleBackToProperties}>
          Back to Available Properties
        </button>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#001f3f", // Dark Navy Blue background
    minHeight: "100vh",
    display: "flex",
    padding: "20px",
    gap: "20px",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },
  // Left Column (Form)
  formContainer: {
    backgroundColor: "#B0B0B0", // Grey Box
    padding: "25px",
    borderRadius: "10px",
    flex: "1",
    minWidth: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    color: "black",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
    textAlign: "center",
  },
  text: {
    fontSize: "18px",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
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
  // Right Column (Applications List)
  applicationsContainer: {
    backgroundColor: "#B0B0B0", // Grey Box similar to the form container
    padding: "25px",
    borderRadius: "10px",
    flex: "1",
    minWidth: "300px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    color: "black",
    overflowY: "auto",
    maxHeight: "80vh",
  },
  applicationsTitle: {
    fontSize: "28px",
    marginBottom: "15px",
    textAlign: "center",
  },
  noApplications: {
    textAlign: "center",
    fontSize: "16px",
  },
  applicationCard: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
  },
  deleteButton: {
    marginTop: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  backButton: {
    marginTop: "20px",
    backgroundColor: "navy",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    width: "100%",
  },
};

export default ApplicationForm;

