import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [filter, setFilter] = useState('All');

  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', type: 'Customer' },
    { id: 2, name: 'User 2', type: 'Vendor' },
    { id: 3, name: 'User 3', type: 'Vendor' },
    { id: 4, name: 'User 4', type: 'Customer' },
  ]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const filteredUsers = filter === 'All'
    ? users
    : users.filter(user => user.type === filter);

  return (
    <div className="user-container">
      <div className="user-filter-bar">
        <label htmlFor="filter">Filter by Type:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Vendor">Vendor</option>
          <option value="Customer">Customer</option>
        </select>
      </div>

      <h2 className="section-title">User Management</h2>

      {filteredUsers.map(user => (
        <div key={user.id} className="user-card">
          <div className="user-info">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="user"
              className="user-avatar"
            />
            <span>{user.name}</span>
          </div>
          <div className="user-meta">
            <span className="user-role">{user.type}</span>
            <button className="delete-btn" onClick={() => handleDelete(user.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserManagement;
