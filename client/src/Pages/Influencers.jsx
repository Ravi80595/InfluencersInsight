import React, { useState, useEffect } from 'react';
import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Spinner, Image, Flex, Text, Input, Select, Button } from '@chakra-ui/react';
import ReportDetails from './ReportDetails';
import InfluencerDetail from './InfluencerDetail';

const Influencer = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [displayMode, setDisplayMode] = useState('list');
  const [influencerFormData, setInfluencerFormData] = useState({
    name: '',
    instagram: '',
    youtube: '',
    email: '',
    phone: '',
    message: '',
  });
  const [influencers, setInfluencers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showInfluencerForm, setShowInfluencerForm] = useState(false);
  console.log(influencerFormData)

const handleInfluencerFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://unusual-puce-mite.cyclic.app/influencer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(influencerFormData),
      });
      if (!response.ok) {
        console.log(response)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchInfluencers();
      setInfluencerFormData({
        name: '',
        instagram: '',
        youtube: '',
        email: '',
        phone: '',
        message: '',
      });
      setShowInfluencerForm(false);
    } catch (error) {
      console.error('Error submitting influencer form data:', error);
    }
};

const fetchInfluencers = async () => {
try {
    const response = await fetch('https://unusual-puce-mite.cyclic.app/influencer/influencers');
    if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const influencersData = await response.json();
    setInfluencers(influencersData);
} catch (error) {
    console.error('Error fetching influencers:', error);
}
};

useEffect(() => {
fetchInfluencers();
}, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
        <div>
          {/* Logo */}
          <span style={{ fontWeight: 'bold' }}>Influencers</span>
        </div>
        <div>
          <button
            onClick={() => setShowInfluencerForm(true)}
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
            Add New Influencer
          </button>
        </div>
      </nav>

      {/* Influencer Form */}
      {showInfluencerForm && (
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
          <form onSubmit={handleInfluencerFormSubmit}>
            {/* Influencer Name Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Influencer Name:
              <input
                type="text"
                value={influencerFormData.name}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, name: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>

            {/* Instagram Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Instagram:
              <input
                type="text"
                value={influencerFormData.instagram}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, instagram: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>

            {/* YouTube Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              YouTube:
              <input
                type="text"
                value={influencerFormData.youtube}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, youtube: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>

            {/* Email Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Email:
              <input
                type="text"
                value={influencerFormData.email}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, email: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>

            {/* Phone Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Phone:
              <input
                type="text"
                value={influencerFormData.phone}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, phone: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>

            {/* Message Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Message:
              <input
                type="text"
                value={influencerFormData.message}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, message: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>

            {/* Button Container */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              {/* Submit Button */}
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

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowInfluencerForm(false)}
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
            {/* <h2 style={{ fontSize: '20px', marginBottom: '10px', textAlign: 'center', marginBottom: '30px' }}>All Reports</h2> */}

            <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr textAlign='center'>
                    <Th>Influencer Name</Th>
                    <Th>Email</Th>
                    <Th>Phone No.</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {influencers && influencers.map(ele => (
                    <Tr key={ele.name} cursor="pointer" _hover={{ backgroundColor: "#f3f4f6" }}>
                      <Td>{ele.name}</Td>
                      <Td>{ele.email}</Td>
                      <Td>{ele.phone}</Td>
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
            {selectedReport && <InfluencerDetail detail={selectedReport} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Influencer