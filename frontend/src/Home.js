import React from "react";
import { Link } from "react-router-dom";
import rentalLogo from "./assets/rental_logo.png";
import houseIcon from "./assets/house_icon.png"; // Ensure this image exists in src/assets/

const Home = () => {
  // Dummy property data array with at least 15 properties
  const properties = [
    { id: 1, status: "Available", location: "Downtown", cost: "$1500", bedrooms: 2 },
    { id: 2, status: "Available", location: "Suburbs", cost: "$1200", bedrooms: 3 },
    { id: 3, status: "Available", location: "Midtown", cost: "$1300", bedrooms: 2 },
    { id: 4, status: "Available", location: "Uptown", cost: "$1600", bedrooms: 3 },
    { id: 5, status: "Available", location: "City Center", cost: "$1800", bedrooms: 2 },
    { id: 6, status: "Available", location: "Westside", cost: "$1100", bedrooms: 1 },
    { id: 7, status: "Available", location: "Eastside", cost: "$1400", bedrooms: 2 },
    { id: 8, status: "Available", location: "Greenwich", cost: "$1700", bedrooms: 3 },
    { id: 9, status: "Available", location: "Harbor", cost: "$2000", bedrooms: 4 },
    { id: 10, status: "Available", location: "Old Town", cost: "$1300", bedrooms: 2 },
    { id: 11, status: "Available", location: "Riverside", cost: "$1250", bedrooms: 2 },
    { id: 12, status: "Available", location: "Lakeside", cost: "$1900", bedrooms: 3 },
    { id: 13, status: "Available", location: "Hilltop", cost: "$2100", bedrooms: 4 },
    { id: 14, status: "Available", location: "Market District", cost: "$1150", bedrooms: 1 },
    { id: 15, status: "Available", location: "Historic Quarter", cost: "$1750", bedrooms: 3 }
  ];

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
          <Link to="/application-form" style={styles.navLink}>Application Form</Link> {/* New Button */}
          <Link to="/notifications" style={styles.navLink}>My Notifications</Link>
        </div>
      </div>

      {/* Welcome Message */}
      <p style={styles.welcome}>
        Welcome on Properties application, Here you can find any properties you need!!
      </p>

      {/* Navy Blue Box Containing Property Listings */}
      <div style={styles.propertiesContainer}>
        {properties.map((property) => (
          <div key={property.id} style={styles.propertyCard}>
            {/* House Sticker Icon */}
            <img src={houseIcon} alt="House Icon" style={styles.houseIcon} />
            <p><strong>Status:</strong> {property.status}</p>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Cost:</strong> {property.cost}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
          </div>
        ))}
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


