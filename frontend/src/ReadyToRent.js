import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const sampleApplications = [
  {
    id: 1,
    fullName: "Alice Johnson",
    email: "alice@example.com",
    phoneNumber: "123-456-7890",
    preferredLocation: "Athens",
    duration: "6 months",
    checkInDate: "2025-03-01",
    checkOutDate: "2025-09-01",
  },
  {
    id: 2,
    fullName: "Bob Smith",
    email: "bob@example.com",
    phoneNumber: "234-567-8901",
    preferredLocation: "Thessaloniki",
    duration: "1 year",
    checkInDate: "2025-04-01",
    checkOutDate: "2026-04-01",
  },
  {
    id: 3,
    fullName: "Charlie Davis",
    email: "charlie@example.com",
    phoneNumber: "345-678-9012",
    preferredLocation: "Patras",
    duration: "3 months",
    checkInDate: "",
    checkOutDate: "",
  },
  {
    id: 4,
    fullName: "Diana Prince",
    email: "diana@example.com",
    phoneNumber: "456-789-0123",
    preferredLocation: "Athens",
    duration: "9 months",
    checkInDate: "2025-05-15",
    checkOutDate: "2026-02-15",
  },
  {
    id: 5,
    fullName: "Evan Rogers",
    email: "evan@example.com",
    phoneNumber: "567-890-1234",
    preferredLocation: "Heraklion",
    duration: "1 year",
    checkInDate: "2025-06-01",
    checkOutDate: "2026-06-01",
  }
];

const ReadyToRent = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  // Fetch applications from backend on component mount
  useEffect(() => {
    axios.get("http://localhost:8080/api/applications")
      .then(response => {
        const fetched = response.data;
        // Ensure at least 5 applications are displayed:
        if (fetched.length < 5) {
          const needed = 5 - fetched.length;
          setApplications([...fetched, ...sampleApplications.slice(0, needed)]);
        } else {
          setApplications(fetched);
        }
      })
      .catch(err => {
        console.error("Error fetching applications:", err);
        setApplications(sampleApplications);
      });
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  const handleContact = () => {
    navigate("/my-notifications");
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.windowContainer}>
        {/* Header with buttons */}
        <div style={styles.windowHeader}>
          <button style={styles.headerButton} onClick={handleBack}>
            Back to Available Properties
          </button>
          <button style={styles.headerButton} onClick={handleContact}>
            Contact With Possible Renter
          </button>
        </div>
        <h1 style={styles.title}>Ready To Rent</h1>
        {applications.length === 0 ? (
          <p style={styles.noApplications}>No applications available.</p>
        ) : (
          applications.map((app) => (
            <div key={app.id} style={styles.applicationCard}>
              <p style={styles.cardText}><strong>Name:</strong> {app.fullName}</p>
              <p style={styles.cardText}><strong>Email:</strong> {app.email}</p>
              <p style={styles.cardText}><strong>Phone:</strong> {app.phoneNumber}</p>
              <p style={styles.cardText}><strong>Preferred Location:</strong> {app.preferredLocation}</p>
              <p style={styles.cardText}><strong>Duration:</strong> {app.duration}</p>
              {app.checkInDate && (
                <p style={styles.cardText}><strong>Check-In:</strong> {app.checkInDate}</p>
              )}
              {app.checkOutDate && (
                <p style={styles.cardText}><strong>Check-Out:</strong> {app.checkOutDate}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#2c3e50", // Navy grey background
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  windowContainer: {
    backgroundColor: "#001f3f", // Navy blue window
    padding: "30px",
    borderRadius: "10px",
    width: "80%",
    maxWidth: "800px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    color: "white",
    overflowY: "auto",
    maxHeight: "80vh",
  },
  windowHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  headerButton: {
    backgroundColor: "#ffcc00",
    color: "black",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    marginBottom: "20px",
  },
  noApplications: {
    textAlign: "center",
    fontSize: "18px",
  },
  applicationCard: {
    backgroundColor: "#34495e", // Lighter navy grey for cards
    borderRadius: "5px",
    padding: "15px",
    marginBottom: "15px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
  },
  cardText: {
    fontSize: "16px",
    margin: "5px 0",
  },
};

export default ReadyToRent;

