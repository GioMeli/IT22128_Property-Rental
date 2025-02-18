import React from "react";

const ContactUs = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Us</h1>
      <p style={styles.text}>
        For inquiries, please email us at: <a href="mailto:support@example.com">support@example.com</a>
      </p>
      {/* You can also add a contact form here if desired */}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
  },
};

export default ContactUs;
