import React, { useState, useEffect } from "react";  
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import rentalLogo from "./assets/rental_logo.png";

// URL for the new property icon (white house icon)
const propertyIconUrl = "https://cdn-icons-png.flaticon.com/512/9026/9026204.png";

// URL for the first banner image
const bannerImageUrl = "https://static.vecteezy.com/system/resources/thumbnails/036/603/175/small_2x/home-for-rent-3d-illustration-real-estate-concept-template-for-sales-rental-advertising-png.png";

// URL for the second banner image
const bottomBannerImageUrl = "https://e7.pngegg.com/pngimages/199/53/png-clipart-house-real-estate-renting-lease-property-real-estate-building-contract-thumbnail.png";

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
          <Link to="/ready-to-rent" style={styles.navLink}>ReadyToRent</Link>
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

      {/* Banner Images Above Available Properties */}
      <div style={styles.bannersContainer}>
        <img src={bannerImageUrl} alt="Top Banner" style={styles.bannerImage} />
        <img src={bottomBannerImageUrl} alt="Second Banner" style={styles.bottomBannerImage} />
      </div>

      {/* Welcome Box */}
      <div style={styles.welcomeBox}>
        <p style={styles.welcomeText}>
          Welcome to our Properties application! Swipe through the listings below.
        </p>
      </div>

      {/* Navy Blue Box Displaying Property Listings */}
      <div style={styles.propertiesContainer}>
        {properties.length === 0 ? (
          <p style={styles.noProperties}>No properties available.</p>
        ) : (
          properties.map((property) => (
            <div key={property.id} style={styles.propertyCard}>
              <img src={propertyIconUrl} alt="Property Icon" style={styles.houseIcon} />
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
  bannersContainer: {
    textAlign: "center",
    margin: "20px 0",
  },
  bannerImage: {
    width: "50%",
    maxWidth: "500px",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
    marginBottom: "20px",
  },
  bottomBannerImage: {
    width: "50%",
    maxWidth: "500px",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  },
  welcomeBox: {
    backgroundColor: "navy",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px auto",
    width: "80%",
    maxWidth: "800px",
  },
  welcomeText: {
    color: "white",
    fontSize: "20px",
    textAlign: "center",
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
