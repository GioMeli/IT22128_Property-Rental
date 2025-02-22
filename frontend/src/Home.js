import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import rentalLogo from "./assets/rental_logo.png";

const Home = () => {
   // Dummy property data array with at least 15 properties
  const properties = [
    { id: 1, status: "Available", location: "Athens/Ampelokipoi", cost: "$1500", bedrooms: 2 },
    { id: 2, status: "Available", location: "Athens/Zografou", cost: "$1200", bedrooms: 3 },
    { id: 3, status: "Available", location: "Athens/Panormou", cost: "$1300", bedrooms: 2 },
    { id: 4, status: "Available", location: "Athens/Kolonak", cost: "$1600", bedrooms: 3 },
    { id: 5, status: "Available", location: "Athens/Monastiraki", cost: "$1800", bedrooms: 2 },
    { id: 6, status: "Available", location: "Athens/Syntagma", cost: "$1100", bedrooms: 1 },
    { id: 7, status: "Available", location: "Thesalloniki/Tsimiski", cost: "$1400", bedrooms: 2 },
    { id: 8, status: "Available", location: "Volos/Limani", cost: "$1700", bedrooms: 3 },
    { id: 9, status: "Available", location: "Volos/Kentro", cost: "$2000", bedrooms: 4 },
    { id: 10, status: "Available", location: "Pireas/Limani", cost: "$1300", bedrooms: 2 },
    { id: 11, status: "Available", location: "Ioannina/Limani", cost: "$1250", bedrooms: 2 },
    { id: 12, status: "Available", location: "Athens/Alimos", cost: "$1900", bedrooms: 3 },
    { id: 13, status: "Available", location: "Athens/Glyfada", cost: "$2100", bedrooms: 4 },
    { id: 14, status: "Available", location: "Cyprus/Nicosia", cost: "$1150", bedrooms: 1 },
    { id: 15, status: "Available", location: "Cyprus/Limmasol", cost: "$1750", bedrooms: 3 }
  ];
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/properties")
      .then(response => {
        setProperties(response.data);
      })
      .catch(err => {
        console.error("Error fetching properties:", err);
      });
  }, []);

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,  // One card at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <img src={rentalLogo} alt="Rental Logo" style={styles.logo} />
        <h1 style={styles.headerTitle}>Rental Properties Application</h1>
      </header>

      {/* Welcome Message */}
      <p style={styles.welcome}>
        Welcome to our Properties application! Swipe through the listings below.
      </p>

      {/* Slider Container with navy blue background */}
      <div style={styles.sliderContainer}>
        {properties.length === 0 ? (
          <p style={styles.noProperties}>No properties available.</p>
        ) : (
          <Slider {...sliderSettings}>
            {properties.map((property) => (
              <div key={property.id} style={styles.slide}>
                <div style={styles.card}>
                  <h2 style={styles.cardTitle}>
                    {property.name || "Unnamed Property"}
                  </h2>
                  <p style={styles.cardDetail}>
                    <strong>Location:</strong> {property.location}
                  </p>
                  <p style={styles.cardDetail}>
                    <strong>Cost:</strong> {property.cost}
                  </p>
                  <p style={styles.cardDetail}>
                    <strong>Bedrooms:</strong> {property.bedrooms}
                  </p>
                  <p style={styles.cardDetail}>
                    <strong>Status:</strong> {property.status || "Available"}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    marginBottom: "20px",
  },
  logo: {
    width: "80px",
    height: "80px",
    marginRight: "20px",
  },
  headerTitle: {
    color: "white",
    fontSize: "36px",
    margin: 0,
  },
  welcome: {
    textAlign: "center",
    fontSize: "20px",
    marginBottom: "20px",
    color: "black",
  },
  // Slider container updated to navy blue background
  sliderContainer: {
    width: "80%",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "navy",
    padding: "20px",
    borderRadius: "10px",
  },
  slide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
    padding: "20px",
  },
  // Card now uses white text
  card: {
    backgroundColor: "transparent", // Transparent to show the navy background if desired
    borderRadius: "10px",
    padding: "30px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    color: "white",
  },
  cardTitle: {
    fontSize: "28px",
    marginBottom: "15px",
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
};

export default Home;

