import React from "react";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Black Navigation Bar */}
      <div style={styles.navbar}>
        <button style={styles.navButton} onClick={() => navigate("/application-form")}>
        <button style={styles.navButton} onClick={() => navigate("/home")}>
          Application Form
        </button>
      </div>

      <h1 style={styles.title}>Contact Us</h1>
      <div style={styles.infoBox}>
        <p><strong>Address:</strong> Akardanias 25, Ampelokipoi, 11526</p>
        <p><strong>Phone:</strong> +0030 - 6970635213</p>
        <p><strong>Office Departments:</strong></p>
        <ul style={styles.list}>
          <li>Information Department</li>
          <li>Supply Department</li>
          <li>Finance Department</li>
        </ul>
        <p><strong>Email:</strong> support@propertyrentals.com</p>
      </div>

      {/* Paragraph about Property Rentals */}
      <div style={styles.textBox}>
        <p>
          Finding the perfect rental property is an essential step in creating a comfortable and fulfilling lifestyle. 
          Whether you are looking for a cozy apartment in the heart of the city or a spacious house in a quiet suburb, 
          the rental market offers diverse options to suit every need...
        </p>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Please Call us and do not lose the opportunity to stay in our Properties</p>
      </footer>
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
    textAlign: "center",
    paddingBottom: "60px",
  },
  navbar: {
    backgroundColor: "black",
    width: "100%",
    padding: "15px",
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
  },
  navButton: {
    backgroundColor: "white",
    color: "black",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
  },
  title: {
    fontSize: "36px",
    marginTop: "80px",
    color: "#333",
  },
  infoBox: {
    backgroundColor: "navy",
    color: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "50%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  textBox: {
    backgroundColor: "#fff",
    padding: "20px",
    width: "60%",
    textAlign: "justify",
    marginTop: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    lineHeight: "1.6",
  },
  list: {
    textAlign: "left",
    marginLeft: "20px",
  },
  footer: {
    backgroundColor: "black",
    color: "white",
    padding: "15px",
    width: "100%",
    position: "absolute",
    bottom: "0",
    textAlign: "center",
    fontSize: "16px",
  },
};

export default ContactUs;
