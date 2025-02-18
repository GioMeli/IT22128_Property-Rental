import React from "react";
import rentalLogo from "./assets/rental_logo.png"; // <-- Make sure the path is correct

const Home = () => {
  // Example properties data (replace with real data from backend if needed)
  const properties = [
    { id: 1, name: "Cozy Apartment", location: "Downtown", price: 1200 },
    { id: 2, name: "Spacious Villa", location: "Suburbs", price: 2500 },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {/* The image next to the title */}
        <img src={rentalLogo} alt="Rental Property" style={styles.logo} />
        <h1 style={styles.title}>Rental Properties Application</h1>
      </div>

      <p style={styles.welcome}>
        Welcome on Properties application, Here you can find any properties you need!!
      </p>

      <div style={styles.propertiesList}>
        {properties.map((prop) => (
          <div key={prop.id} style={styles.propertyCard}>
            <h2>{prop.name}</h2>
            <p>{prop.location}</p>
            <p>Price: ${prop.price}</p>
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
  propertiesList: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  propertyCard: {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    margin: "10px",
    padding: "15px",
    width: "200px",
    textAlign: "center",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  },
};

export default Home;
