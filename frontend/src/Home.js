import React from "react";
import rentalLogo from "./assets/rental_logo.png";
import houseIcon from "./assets/house_icon.png"; // Import the house icon

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
      {/* Header: Logo and Title */}
      <div style={styles.header}>
        <img src={rentalLogo} alt="Rental Properties Logo" style={styles.logo} />
        <h1 style={styles.title}>Rental Properties Application</h1>
      </div>

      {/* Welcome Message */}
      <p style={styles.welcome}>
        Welcome on Properties application, Here you can find any properties you need!!
      </p>

      {/* Navy Blue Box Containing Property Listings */}
      <div style={styles.propertiesContainer}>
        {properties.map((property) => (
          <div key={property.id} style={styles.propertyCard}>
            {/* House Icon Above Each Property */}
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
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40px",
    marginBottom: "20px",
  },
  logo: {
    width: "80px",
    height: "80px",
    marginRight: "20px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  welcome: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  propertiesContainer: {
    backgroundColor: "navy",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
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
    margin: "0 auto 10px auto",
  },
};

export default Home;
