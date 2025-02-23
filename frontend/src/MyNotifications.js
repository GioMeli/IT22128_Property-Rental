import React, { useState } from "react";

const MyNotifications = () => {
  // Dummy notifications for demonstration
  const [notifications, setNotifications] = useState([
    { id: 1, subject: "Inquiry Received", message: "You have a new inquiry for your property." },
    { id: 2, subject: "Maintenance Update", message: "Scheduled maintenance will occur next week." },
  ]);

  // State for the email form
  const [emailForm, setEmailForm] = useState({
    ownerEmail: "",
    subject: "",
    message: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const handleChange = (e) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check required fields
    if (!emailForm.ownerEmail || !emailForm.subject || !emailForm.message) {
      setFormError("All fields are required.");
      return;
    }
    // Simulate sending email (you'd normally call a backend API here)
    setFormSuccess("Email sent successfully!");
    setFormError("");
    // Clear form (or handle as needed)
    setEmailForm({
      ownerEmail: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>My Notifications</h1>

      {/* Received Notifications Section */}
      <div style={styles.notificationsSection}>
        <h2 style={styles.subheader}>Received Notifications</h2>
        {notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          notifications.map((n) => (
            <div key={n.id} style={styles.notificationCard}>
              <h3>{n.subject}</h3>
              <p>{n.message}</p>
            </div>
          ))
        )}
      </div>

      {/* Email Form Section */}
      <div style={styles.emailSection}>
        <h2 style={styles.subheader}>Send Email to Possible Renter</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="RentersEmail"
            placeholder="Renter's Email"
            value={emailForm.renterEmail}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={emailForm.subject}
            onChange={handleChange}
            style={styles.input}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={emailForm.message}
            onChange={handleChange}
            style={{ ...styles.input, height: "100px" }}
          />
          {formError && <p style={styles.error}>{formError}</p>}
          {formSuccess && <p style={styles.success}>{formSuccess}</p>}
          <button type="submit" style={styles.button}>Send Email</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "navy",
    color: "white",
    minHeight: "100vh",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    fontSize: "36px",
    marginBottom: "20px",
  },
  notificationsSection: {
    marginBottom: "40px",
  },
  subheader: {
    fontSize: "28px",
    marginBottom: "15px",
    textAlign: "center",
  },
  notificationCard: {
    backgroundColor: "#333",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  emailSection: {
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#444",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginTop: "5px",
  },
  success: {
    color: "lightgreen",
    marginTop: "5px",
  },
};

export default MyNotifications;
