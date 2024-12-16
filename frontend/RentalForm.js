import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RentalForm = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState('');
    const [rentalDate, setRentalDate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/properties')
            .then(response => setProperties(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/rentals', {
                propertyId: selectedProperty,
                rentalDate,
            });
            alert('Rental created successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Property:</label>
                <select onChange={(e) => setSelectedProperty(e.target.value)}>
                    <option value="">Select Property</option>
                    {properties.map(property => (
                        <option key={property.id} value={property.id}>
                            {property.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Rental Date:</label>
                <input type="date" value={rentalDate} onChange={(e) => setRentalDate(e.target.value)} />
            </div>
            <button type="submit">Create Rental</button>
        </form>
    );
};

export default RentalForm;
