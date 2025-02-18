import React from "react";

const ContactUs = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Us</h1>
      <div style={styles.infoBox}>
        <p><strong>Address:</strong> Akardanias 25, Ampelokipoi, 11526</p>
        <p><strong>Phone:</strong> +0030 - 6970635213</p>
        <p><strong>Office Departments:</strong></p>
        <ul style={styles.list}>
          <li>Information Department</li>
          <li>Supply Department</li>
          <li>Finance Department</li>
        </ul>
        <p><strong>Email:</strong> support@propertyrentals.com</p>
      </div>

      {/* Paragraph about Property Rentals */}
      <div style={styles.textBox}>
        <p>
          Finding the perfect rental property is an essential step in creating a comfortable and fulfilling lifestyle. Whether you are looking for a cozy apartment in the heart of the city or a spacious house in a quiet suburb, the rental market offers diverse options to suit every need. One of the greatest benefits of renting is flexibility—allowing individuals and families to move freely without the long-term financial commitment of homeownership. Additionally, rental properties often come with amenities such as security, maintenance, and communal facilities, enhancing the quality of life for tenants.  
        </p>
        <p>
          Property rentals have become increasingly popular due to changing economic conditions and evolving lifestyles. More people prefer renting due to its affordability compared to buying a home, particularly in urban areas where property prices continue to rise. Moreover, renting provides access to prime locations that might otherwise be financially out of reach. Whether you need a short-term lease for work or a long-term rental for stability, the variety of available properties ensures that there is something for everyone.  
        </p>
        <p>
          At Rental Properties Application, we strive to make the process smooth and hassle-free by offering a curated selection of properties tailored to different preferences. Our dedicated team is here to assist you in finding a home that matches your lifestyle and budget. Feel free to contact us to explore available listings and secure the best rental experience today!  
        </p>
      </div>

      <footer style={styles.footer}>
        <p>Please Call us and do not lose the opportunity to stay in our Properties</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: "60px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px",
    color: "#333",
  },
  infoBox: {
    backgroundColor: "navy",
    color: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "50%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  textBox: {
    backgroundColor: "#fff",
    padding: "20px",
    width: "60%",
    textAlign: "justify",
    marginTop: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    lineHeight: "1.6",
  },
  list: {
    textAlign: "left",
    marginLeft: "20px",
  },
  footer: {
    backgroundColor: "black",
    color: "white",
    padding: "15px",
    width: "100%",
    position: "absolute",
    bottom: "0",
    textAlign: "center",
    fontSize: "16px",
  },
};

export default ContactUs;
