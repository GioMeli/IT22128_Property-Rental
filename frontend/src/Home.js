import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import rentalLogo from "./assets/rental_logo.png";
import houseIcon from "./assets/house_icon.png"; // Ensure this image exists in src/assets/

const Home = () => {
  const [properties, setProperties] = useState([]);

  // Fetch properties from backend on component mount
  useEffect(() => {
    axios.get("http://localhost:8080/api/properties")
      .then(response => {
        setProperties(response.data);
      })
      .catch(err => {
        console.error("Error fetching properties:", err);
      });
  }, []);

  return (
    <div style={styles.container}>
      {/* Header: Black bar with logo, title, and navigation links */}
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          <img src={rentalLogo} alt="Rental Logo" style={styles.logo} />
          <h1 style={styles.headerTitle}>Rental Properties Application</h1>
        </div>
        <div style={styles.nav}>
          <Link to="/contact" style={styles.navLink}>Contact Us</Link>
          <Link to="/application-form" style={styles.navLink}>Application Form</Link>
          <Link to="/notifications" style={styles.navLink}>My Notifications</Link>
          <Link to="/my-properties" style={styles.navLink}>My Properties</Link>
        </div>
      </div>

      {/* Welcome Message */}
      <p style={styles.welcome}>
        Welcome to the Properties application! Here you can find any properties you need.
      </p>

      {/* Navy Blue Box Displaying Property Listings */}
      <div style={styles.propertiesContainer}>
        {properties.length === 0 ? (
          <p>No properties available.</p>
        ) : (
          properties.map((property) => (
            <div key={property.id} style={styles.propertyCard}>
              <img src={houseIcon} alt="House Icon" style={styles.houseIcon} />
              <p><strong>Name:</strong> {property.name}</p>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Cost:</strong> {property.cost}</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  header: {
    backgroundColor: "black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "80px",
    height: "80px",
    marginRight: "20px",
  },
  headerTitle: {
    color: "white",
    fontSize: "36px",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    padding: "10px 15px",
    backgroundColor: "#444",
    borderRadius: "5px",
  },
  welcome: {
    textAlign: "center",
    fontSize: "18px",
    margin: "20px",
  },
  propertiesContainer: {
    backgroundColor: "navy",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
    margin: "20px",
  },
  propertyCard: {
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "5px",
    padding: "10px",
    minWidth: "200px",
    textAlign: "left",
    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
  },
  houseIcon: {
    width: "30px",
    height: "30px",
    display: "block",
    margin: "0 auto 10px",
  },
};

export default Home;



