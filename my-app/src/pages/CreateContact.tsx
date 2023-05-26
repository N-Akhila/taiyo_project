import React, { useState } from 'react';

type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
};

type CreateContactProps = {
  onCreateContact: (contact: Contact) => void;
};

const CreateContact: React.FC<CreateContactProps> = ({ onCreateContact }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as 'active' | 'inactive');
  };

  const handleCreateContact = () => {
    const newContact: Contact = {
      id: Math.random(),
      firstName,
      lastName,
      status,
    };
    onCreateContact(newContact);
    setFirstName('');
    setLastName('');
    setStatus('active');
  };

  return (
    <div>
      <h1>Create Contact</h1>

      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>

      <div>
        <span>Status:</span>
        <label htmlFor="active">
          <input
            type="radio"
            id="active"
            value="active"
            checked={status === 'active'}
            onChange={handleStatusChange}
          />
          Active
        </label>
        <label htmlFor="inactive">
          <input
            type="radio"
            id="inactive"
            value="inactive"
            checked={status === 'inactive'}
            onChange={handleStatusChange}
          />
          Inactive
        </label>
      </div>

      <button onClick={handleCreateContact}>Save Contact</button>
    </div>
  );
};

export default CreateContact;
