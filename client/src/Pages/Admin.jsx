import React, { useState, useEffect } from 'react';
import { Box,TableContainer,Table,Thead,Tr,Th,Tbody,Td,Spinner,Image,Flex,Text,Input,Select, Button } from '@chakra-ui/react'
import ReportDetails from './ReportDetails';


const Admin = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [displayMode, setDisplayMode] = useState('list');
  const [formData, setFormData] = useState({
    reportName: '',
    postsLive: '',
    reach: '',
    budget: '',
    engagements: '',
    influencers: [],
  });
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2147/report/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchReports();
      setFormData({
        reportName: '',
        postsLive: '',
        reach: '',
        budget: '',
        engagements: '',
        influencers: [],
      });

      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };


  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:2147/report/reports');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const reportsData = await response.json();
      console.log(reportsData)
      setReports(reportsData);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  // Effect to fetch reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <div>
          {/* Logo */}
          <span style={{ fontWeight: 'bold' }}>Laudco Media</span>
        </div>
        <div>
          {/* Button to open form */}
          <button
            onClick={() => setShowForm(true)}
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
            Add New Report
          </button>
        </div>
      </nav>
{/* <Button onClick={() => setDisplayMode('list')}>Back</Button> */}

      {/* Form */}
      {showForm && (
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
          <form onSubmit={handleFormSubmit}>
            {/* Report Name Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Report Name:
              <input
                type="text"
                value={formData.reportName}
                onChange={(e) => setFormData({ ...formData, reportName: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>

            {/* Posts Live Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Posts Live:
              <input
                type="text"
                value={formData.postsLive}
                onChange={(e) => setFormData({ ...formData, postsLive: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>

            {/* Reach Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Reach:
              <input
                type="text"
                value={formData.reach}
                onChange={(e) => setFormData({ ...formData, reach: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>

            {/* Budget Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Budget:
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>

            {/* Engagements Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Engagements:
              <input
                type="text"
                value={formData.engagements}
                onChange={(e) => setFormData({ ...formData, engagements: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>

            {/* Influencers Input */}
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Influencers:
              <input
                type="text"
                value={formData.influencers.join(', ')}
                onChange={(e) => setFormData({ ...formData, influencers: e.target.value.split(', ') })}
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
                onClick={() => setShowForm(false)}
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

      <div style={{ marginTop: '40px' }}>
{displayMode === 'list' && (
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px', textAlign: 'center', marginBottom: '30px' }}>All Reports</h2>

          <TableContainer>
            <Table size='sm'>
              <Thead>
                <Tr textAlign='center'>
                  <Th>Brand Name</Th>
                  <Th>Report Name</Th>
                  <Th>Created On</Th>
                  <Th>Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {reports && reports.map(ele => (
                  <Tr key={ele.reportName} cursor="pointer" _hover={{ backgroundColor: "#f3f4f6" }}>
                    <Td>{ele.reportName}</Td>
                    <Td>{ele.reportName}</Td>
                    <Td>{ele.NoteDate} {ele.NoteTime}</Td>
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
          {selectedReport && <ReportDetails report={selectedReport} />}
        </div>
      )}
        
      </div>
    </div>
  );
};

export default Admin;
