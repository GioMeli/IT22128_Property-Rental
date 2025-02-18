import React from "react";

const ContactUs = () => {
  return (
    <div style={styles.container}>
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
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px",
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
