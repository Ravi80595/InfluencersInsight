import React, { useState, useEffect } from 'react';
import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Spinner, Image, Flex, Text, Input, Select, Button } from '@chakra-ui/react';
import ReportDetails from '../ReportDetails';
import InfluencerDetail from '../InfluencerDetail';
import ClientDetails from './ClientDetails';

const Clients = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [displayMode, setDisplayMode] = useState('list');
  const [clientFormData, setClientFormData] = useState({
    name: '',
    brandName:'',
    email:'',
    password:''
  });
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);
  // console.log(clientFormData)

const handleClientFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2147/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientFormData),
      });
      if (!response.ok) {
        console.log(response)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchClients();
      setClientFormData({
        name: '',
        brandName:'',
        email:'',
        password:''
      });
      setShowClientForm(false);
    } catch (error) {
      console.error('Error submitting influencer form data:', error);
    }
};

const fetchClients = async () => {
try {
    const response = await fetch('http://localhost:2147/user/allUsers');
    if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const influencersData = await response.json();
    console.log(influencersData,'clients')
    setUsers(influencersData.data);
} catch (error) {
    console.error('Error fetching influencers:', error);
}
};

useEffect(() => {
fetchClients();
}, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
        <div>
          {/* Logo */}
          <span style={{ fontWeight: 'bold' }}>Clients</span>
        </div>
        <div>
          <button
            onClick={() => setShowClientForm(true)}
            style={{
              marginLeft: '10px',
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              borderRadius: '5px',
              cursor: 'pointer',
              border: 'none',
              fontSize: '14px',
            }}
          >
            Add New Client
          </button>
        </div>
      </nav>

      {/* Influencer Form */}
      {showClientForm && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            backgroundColor: '#fff',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',
          }}
        >
          <form onSubmit={handleClientFormSubmit}>
            {/* Influencer Name Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Client Name:
              <input
                type="text"
                value={clientFormData.name}
                onChange={(e) => setClientFormData({ ...clientFormData, name: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Brand Name
              <input
                type="text"
                value={clientFormData.brandName}
                onChange={(e) => setClientFormData({ ...clientFormData, brandName: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Email
              <input
                type="text"
                value={clientFormData.email}
                onChange={(e) => setClientFormData({ ...clientFormData, email: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Password
              <input
                type="text"
                value={clientFormData.password}
                onChange={(e) => setClientFormData({ ...clientFormData, password: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button
                type="submit"
                style={{
                  padding: '10px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '14px',
                }}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowClientForm(false)}
                style={{
                  padding: '10px',
                  backgroundColor: '#ccc',
                  color: '#fff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '14px',
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Rest of the component */}
      <div style={{ marginTop: '40px' }}>
        {displayMode === 'list' && (
          <div style={{ marginTop: '40px' }}>
            <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr textAlign='center'>
                    <Th>Client Name</Th>
                    <Th>Brand Name</Th>
                    <Th>Email</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.length>0 && users && users.map(ele => (
                    <Tr key={ele.name} cursor="pointer" _hover={{ backgroundColor: "#f3f4f6" }}>
                      <Td>{ele.name}</Td>
                      <Td>{ele.brandName}</Td>
                      <Td>{ele.email}</Td>
                      <Td>
                        <Button onClick={() => { setSelectedReport(ele); setDisplayMode('details'); }}>More</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        )}

        {/* Conditionally render the details component */}
        {displayMode === 'details' && (
          <div>
            <Button onClick={() => setDisplayMode('list')}>Back</Button>
            {selectedReport && <ClientDetails clientDetail={selectedReport} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients