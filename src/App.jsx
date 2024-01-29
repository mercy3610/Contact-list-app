import React, { useState, useEffect } from 'react';

const ContactList = () => {
  
  const [contacts, setContacts] = useState([]);

  
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: ''
  });

  
  const [editing, setEditing] = useState(false);

  
  const [editIndex, setEditIndex] = useState(null);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editing) {
      
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = newContact;
      setContacts(updatedContacts);
      setEditing(false);
      setEditIndex(null);
    } else {
    
      setContacts([...contacts, newContact]);
    }

    
    setNewContact({ name: '', email: '', phone: '' });
  };

  
  const deleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  
  const editContact = (index) => {
    setNewContact(contacts[index]);
    setEditing(true);
    setEditIndex(index);
  };

  
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Contact List</h1>

      
      <form onSubmit={handleSubmit}>
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
        <button type="submit">{editing ? 'Update Contact' : 'Add Contact'}</button>
      </form>

    
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            <strong>Name:</strong> {contact.name} <br />
            <strong>Email:</strong> {contact.email} <br />
            <strong>Phone:</strong> {contact.phone} <br />
            <button onClick={() => editContact(index)}>Edit</button>
            <button onClick={() => deleteContact(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
