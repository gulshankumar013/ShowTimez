import React, { useEffect, useState } from 'react';
import '../Dashbord/manageUsers.css'; // Import CSS file for styling
import axios from 'axios';

const ManageUsers = () => {
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.post("http://localhost:5164/fetchAllUser", { eventID: "1001" });
      console.log("API Response:", response.data); // Log the entire response
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.users) {
          setUsers(responseData.rData.users);
          console.log("Users:", responseData.rData.users);
        } else {
          console.log("No users data in response");
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post("http://localhost:5164/deleteUser", {
        eventID: "1001",
        addInfo: {
          id: id
        }
      });
      console.log("Delete Response:", response.data); // Log the entire response
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData.rMessage === "DELETE SUCCESSFULLY.") {
          setUsers(users.filter(user => user.id !== id)); // Remove user from local state
          console.log(`User with ID ${id} deleted successfully`);
        } else {
          console.log("Failed to delete user");
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const toggleExpand = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <div className='manage-user'>
      <h2>Manage Users</h2>
      <div className="user-cards-container">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-card ${expandedUserId === user.id ? 'expanded' : ''}`}
            onClick={() => toggleExpand(user.id)}
          >
            <img src={user.profile} alt={user.name} className="user-image" />
            <h3>{user.name}</h3>
            {expandedUserId === user.id && (
              <div className="user-details">
                <p>Email: {user.email}</p>
                <p>Phone: {user.mobile}</p>
                <p>Gender: {user.gender}</p>
                <div className="user-actions">
                  <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete User</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
