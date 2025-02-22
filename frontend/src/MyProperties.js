import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    cost: "",
    bedrooms: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch existing properties when component mounts
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    axios
      .get("http://localhost:8080/api/properties")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.location || !form.cost || !form.bedrooms) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }
    setError("");

    try {
      // Send new property to backend
      const response = await axios.post(
        "http://localhost:8080/api/properties",
        form
      );
      setSuccess("Property added successfully!");
      setProperties([...properties, response.data]);

      // Clear form
      setForm({
        name: "",
        location: "",
        cost: "",
        bedrooms: "",
      });
    } catch (err) {
      setError("Failed to add property. Try again.");
      setSuccess("");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/properties/${id}`);
      setProperties(properties.filter((property) => property.id !== id));
    } catch (err) {
      console.error("Failed to delete property:", err);
      setError("Failed to delete property.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/home" style={styles.backButton}>Back to Home Page</Link>
      </div>
      <h1 style={styles.title}>My Properties</h1>

      {/* Form for Adding a New Property */}
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>Add New Property</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Property Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="cost"
            placeholder="Cost (e.g., $1500/month)"
            value={form.cost}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="number"
            name="bedrooms"
            placeholder="Number of Bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
          <button type="submit" style={styles.button}>Add Property</button>
        </form>
      </div>

      {/* List of Active Available Properties */}
      <div style={styles.propertiesList}>
        <h2 style={styles.listTitle}>Active Available Properties</h2>
        {properties.length === 0 ? (
          <p>No properties added yet.</p>
        ) : (
          properties.map((property) => (
            <div key={property.id} style={styles.propertyCard}>
              <p><strong>Name:</strong> {property.name}</p>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Cost:</strong> {property.cost}</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(property.id)}
              >
                Delete Property
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "navy",
    minHeight: "100vh",
    padding: "20px",
    color: "white",
    textAlign: "center",
  },
  header: {
    width: "100%",
    padding: "10px 20px",
    textAlign: "left",
  },
  backButton: {
    backgroundColor: "black",
    color: "yellow",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "16px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px",
  },
  formContainer: {
    backgroundColor: "yellow",
    color: "black",
    padding: "20px",
    borderRadius: "10px",
    width: "50%",
    margin: "20px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  formTitle: {
    fontSize: "28px",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "black",
    color: "yellow",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  deleteButton: {
    marginTop: "10px",
    backgroundColor: "red",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  error: {
    color: "red",
    marginTop: "5px",
  },
  success: {
    color: "green",
    marginTop: "5px",
  },
  propertiesList: {
    backgroundColor: "yellow",
    color: "black",
    padding: "20px",
    borderRadius: "10px",
    width: "50%",
    margin: "20px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  listTitle: {
    fontSize: "28px",
    marginBottom: "15px",
  },
  propertyCard: {
    backgroundColor: "#f4f4f4",
    color: "black",
    padding: "10px",
    borderRadius: "5px",
    margin: "10px 0",
    textAlign: "left",
  },
};

export default MyProperties;


