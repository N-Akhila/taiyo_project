import React from 'react';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import ContactList from './pages/ContactList';
import CreateContact from './pages/CreateContact';
import Dashboard from './pages/Dashboard';

type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
};
const App: React.FC = () => {
  const handleCreateContact = async (contact: Contact) => {
    try {
      const response = await fetch('https://disease.sh/v3/covid-19/countries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        // Handle successful contact creation
        console.log('Contact created successfully');
      } else {
        // Handle API error
        console.error('Failed to create contact');
      }
    } catch (error) {
      // Handle network error
      console.error('Failed to create contact', error);
    }
  };

  return (
        <BrowserRouter>
        <div style={{ display: 'flex' }}>
        <div>
            <ul>
              <li>
                <Link to="/">Contacts</Link>
              </li>
              <li>
                <Link to="/charts-maps">Charts &amp; Maps</Link>
              </li>
            </ul>
          </div>
          <div style={{ flex: 1, padding: '10px' }}>
          <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/create-contact" element={<CreateContact onCreateContact={handleCreateContact} />} />
        <Route path="/charts-maps" element={<Dashboard />} />

      </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  };

export default App;
