import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Παίρνουμε το token από το localStorage

                // Λήψη χρηστών
                const usersResponse = await axios.get('/api/admin/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(usersResponse.data);

                // Λήψη ακινήτων
                const propertiesResponse = await axios.get('/api/properties', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProperties(propertiesResponse.data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
                alert('Failed to fetch admin data.');
            }
        };

        fetchAdminData();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`/api/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(users.filter((user) => user.id !== userId));
            alert('User deleted successfully.');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user.');
        }
    };

    return (
        <div>
            <h1>Welcome to the Admin Dashboard</h1>

            <h2>Manage Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>{user.username}</p>
                        <p>Email: {user.email}</p>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
                    </li>
                ))}
            </ul>

            <h2>Manage Properties</h2>
            <ul>
                {properties.map((property) => (
                    <li key={property.id}>
                        <h3>{property.name}</h3>
                        <p>{property.description}</p>
                        <p>Price: {property.price}€</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;

