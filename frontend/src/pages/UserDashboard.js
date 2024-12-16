import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Λήψη ακινήτων μέσω του REST API
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Παίρνουμε το token από το localStorage
                const response = await axios.get('/api/properties', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
                alert('Failed to fetch properties.');
            }
        };

        fetchProperties();
    }, []);

    return (
        <div>
            <h1>Welcome to the User Dashboard</h1>
            <h2>Available Properties</h2>
            <ul>
                {properties.map((property) => (
                    <li key={property.id}>
                        <h3>{property.name}</h3>
                        <p>{property.description}</p>
                        <p>Price: {property.price}€</p>
                        <button>Rent Property</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;

