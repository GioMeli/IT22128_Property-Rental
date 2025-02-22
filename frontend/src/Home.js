import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import rentalLogo from "./assets/rental_logo.png";

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
        // Optionally, you can set a fallback here:
        // setProperties(sampleProperties);
      });
  }, []);

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,  // One large card at a time
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

      {/* Slider Container */}
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
  sliderContainer: {
    width: "80%",
    maxWidth: "800px",
    margin: "0 auto",
  },
  slide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "30px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
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
    color: "black",
  },
};

export default Home;
