import React, { useState, useEffect } from 'react';

const ContactList = () => {
  // State to hold contacts
  const [contacts, setContacts] = useState([]);

  // State for new contact form input
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // State to manage editing mode
  const [editing, setEditing] = useState(false);

  // State to store the index of the contact being edited
  const [editIndex, setEditIndex] = useState(null);

  // Function to handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  // Function to handle form submission and add/edit a contact
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editing) {
      // If editing, update the contact at the specified index
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = newContact;
      setContacts(updatedContacts);
      setEditing(false);
      setEditIndex(null);
    } else {
      // If not editing, add a new contact
      setContacts([...contacts, newContact]);
    }

    // Clear the form inputs
    setNewContact({ name: '', email: '', phone: '' });
  };

  // Function to handle contact deletion
  const deleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  // Function to handle contact editing
  const editContact = (index) => {
    setNewContact(contacts[index]);
    setEditing(true);
    setEditIndex(index);
  };

  // Effect to load contacts from local storage on component mount
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  // Effect to save contacts to local storage whenever contacts change
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Contact List</h1>

      {/* Form to add or edit a contact */}
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

      {/* Display the list of contacts */}
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
