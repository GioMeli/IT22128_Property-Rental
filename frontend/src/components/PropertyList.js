import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/properties')
            .then(response => setProperties(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Properties</h1>
            <ul>
                {properties.map(property => (
                    <li key={property.id}>
                        {property.name} - {property.location} - ${property.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyList;

