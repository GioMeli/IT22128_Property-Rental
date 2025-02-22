import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import rentalLogo from "./assets/rental_logo.png";
import houseIcon from "./assets/house_icon.png"; // Ensure this image exists in src/assets/

// Dummy sample properties (fallback in case backend returns fewer than 10)
const sampleProperties = [
  { id: 101, name: "Sample Apartment", location: "Athens/Ampelokipoi", cost: "$1200", bedrooms: 2 },
  { id: 102, name: "Luxury Condo", location: "Athens/Kolonaki", cost: "$2200", bedrooms: 3 },
  { id: 103, name: "Cozy Studio", location: "Athens/Evangelismos", cost: "$900", bedrooms: 1 },
  { id: 104, name: "Spacious Loft", location: "Athens/Syntagma", cost: "$1800", bedrooms: 2 },
  { id: 105, name: "Modern House", location: "Patra/Athinon", cost: "$2500", bedrooms: 4 },
  { id: 106, name: "Classic Villa", location: "Athens/Lykavitos", cost: "$3000", bedrooms: 5 },
  { id: 107, name: "Budget Flat", location: "Thessaloniki/Tsimiski", cost: "$800", bedrooms: 1 },
  { id: 108, name: "Penthouse Suite", location: "Thessaloniki/Aristotelous", cost: "$3500", bedrooms: 3 },
  { id: 109, name: "Eco Home", location: "Athens/Alimo", cost: "$1600", bedrooms: 2 },
  { id: 110, name: "Historic House", location: "Athens/Glyfada", cost: "$2000", bedrooms: 3 }
];

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const navigate = useNavigate();

  // Fetch properties from backend on component mount
  useEffect(() => {
    axios.get("http://localhost:8080/api/properties")
      .then(response => {
        const fetchedProperties = response.data;
        const combinedProperties = fetchedProperties.length < 10 
          ? [...fetchedProperties, ...sampleProperties.slice(0, 10 - fetchedProperties.length)]
          : fetchedProperties;
        setProperties(combinedProperties);
      })
      .catch(err => {
        console.error("Error fetching properties:", err);
        setProperties(sampleProperties);
      });
  }, []);

  const handleSignOut = () => {
    // Close modal and navigate to root page
    setShowSignOutModal(false);
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Header with logo, title, navigation links, and Sign Out button */}
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
          <button 
            style={styles.signOutButton} 
            onClick={() => setShowSignOutModal(true)}
            title="Sign Out"
          >
            &#x1F511;
          </button>
        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <p style={styles.modalText}>Are you sure you want to sign out?</p>
            <div style={styles.modalButtons}>
              <button style={styles.modalButton} onClick={handleSignOut}>Yes</button>
              <button style={styles.modalButton} onClick={() => setShowSignOutModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Message */}
      <p style={styles.welcome}>
        Welcome to our Properties application! Swipe through the listings below.
      </p>

      {/* Slider-like display: using a flex wrap for large cards */}
      <div style={styles.propertiesContainer}>
        {properties.length === 0 ? (
          <p style={styles.noProperties}>No properties available.</p>
        ) : (
          properties.map((property) => (
            <div key={property.id} style={styles.propertyCard}>
              <img src={houseIcon} alt="House Icon" style={styles.houseIcon} />
              <h2 style={styles.cardTitle}>
                {property.name || "Unnamed Property"}
              </h2>
              <p style={styles.cardDetail}><strong>Location:</strong> {property.location}</p>
              <p style={styles.cardDetail}><strong>Cost:</strong> {property.cost}</p>
              <p style={styles.cardDetail}><strong>Bedrooms:</strong> {property.bedrooms}</p>
              <p style={styles.cardDetail}><strong>Status:</strong> {property.status || "Available"}</p>
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
    fontFamily: "Arial, sans-serif",
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
    alignItems: "center",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    padding: "10px 15px",
    backgroundColor: "#444",
    borderRadius: "5px",
  },
  signOutButton: {
    background: "none",
    border: "none",
    color: "#ffcc00",
    fontSize: "24px",
    cursor: "pointer",
  },
  welcome: {
    textAlign: "center",
    fontSize: "20px",
    margin: "20px",
    color: "black",
  },
  propertiesContainer: {
    backgroundColor: "navy",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  propertyCard: {
    backgroundColor: "black",
    color: "white",
    borderRadius: "10px",
    padding: "20px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
  },
  houseIcon: {
    width: "40px",
    height: "40px",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "26px",
    marginBottom: "10px",
  },
  cardDetail: {
    fontSize: "18px",
    margin: "5px 0",
  },
  noProperties: {
    textAlign: "center",
    fontSize: "20px",
    color: "white",
  },
  // Modal styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    width: "300px",
  },
  modalText: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-around",
  },
  modalButton: {
    padding: "10px 15px",
    backgroundColor: "#ffcc00",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Home;


