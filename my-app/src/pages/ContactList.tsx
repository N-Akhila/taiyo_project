import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
};

const initialContacts: Contact[] = [];

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  return (
    <div>
      <h1>Contact Page</h1>
       
      <Link to="/create-contact">
        <button>Create Contact</button>
      </Link>
      <ul>       
        {contacts.map((contact) => (
          <li key={contact.id}>
            <span>{contact.firstName} {contact.lastName}</span>
            <span>Status: {contact.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
