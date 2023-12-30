import React, { useState } from 'react';
import './App.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const addContact = (e) => {
    e.preventDefault();
    setContacts([...contacts, newContact]);
    setNewContact({ name: '', email: '', phone: '' });
  };

  return (
    <div>
      <h1>Contact List</h1>

      {/* Form to add a new contact */}
      <form onSubmit={addContact}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newContact.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={newContact.phone}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Contact</button>
      </form>

      {/* Display the list of contacts */}
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            <strong>Name:</strong> {contact.name} <br />
            <strong>Email:</strong> {contact.email} <br />
            <strong>Phone:</strong> {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
