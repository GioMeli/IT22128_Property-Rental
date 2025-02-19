import React, { useState } from "react";

const MyProperties = () => {
  // State for storing properties (for now, using local state)
  const [properties, setProperties] = useState([]);

  // State for the form inputs
  const [form, setForm] = useState({
    name: "",
    location: "",
    cost: "",
    bedrooms: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Update form state when an input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check that all fields are filled
    if (!form.name || !form.location || !form.cost || !form.bedrooms) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess("Property added successfully!");

    // Add the new property to the list (simulate an API call)
    setProperties([...properties, { id: properties.length + 1, ...form }]);

    // Clear the form fields
    setForm({
      name: "",
      location: "",
      cost: "",
      bedrooms: ""
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Properties</h1>

      {/* Yellow box form for adding a new property */}
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

      {/* List of available properties */}
      <div style={styles.propertiesList}>
        <h2 style={styles.listTitle}>Available Properties</h2>
        {properties.length === 0 ? (
          <p>No properties added yet.</p>
        ) : (
          properties.map((property) => (
            <div key={property.id} style={styles.propertyCard}>
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
    backgroundColor: "navy",
    minHeight: "100vh",
    padding: "20px",
    color: "white",
    textAlign: "center",
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
  error: {
    color: "red",
    marginTop: "5px",
  },
  success: {
    color: "green",
    marginTop: "5px",
  },
  propertiesList: {
    backgroundColor: "white",
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
