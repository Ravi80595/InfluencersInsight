import React, { useState, useEffect } from 'react';
import { Box,TableContainer,Table,Thead,Tr,Th,Tbody,Td,Spinner,Image,Flex,Text,Input,Select, Button } from '@chakra-ui/react'
// import ReportDetails from '../ReportDetails';
import ReportDetailBackend from './ReportDetailBackend';
import { baseUrl } from '../../Components/BaseUrl';


const Admin = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [displayMode, setDisplayMode] = useState('list');
 
  const [reports, setReports] = useState([]);
 
  const [influencers, setInfluencers] = useState([]);
  const [showInfluencers, setShowInfluencers] = useState(false);

// console.log(formData)


useEffect(() => {
    // Fetch influencers from the backend when the component mounts
    const fetchInfluencers = async () => {
      try {
        const response = await fetch(`${baseUrl}/influencer/influencers`);
        const influencersData = await response.json();
        setInfluencers(influencersData);
      } catch (error) {
        console.error('Error fetching influencers:', error);
      }
    };

    fetchInfluencers();
  }, []);


 

  const fetchReports = async () => {
    try {
      const response = await fetch(`${baseUrl}/report/reports`);
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
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <div>
          {/* Logo */}
          <span style={{ fontWeight: 'bold' }}>Campaigns</span>
        </div>
        <div>
          {/* Button to open form */}
        
        </div>
      </nav>
{/* <Button onClick={() => setDisplayMode('list')}>Back</Button> */}

      {/* Form */}
      

      <div style={{ marginTop: '40px' }}>
{displayMode === 'list' && (
        <div style={{ marginTop: '40px' }}>
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
      {displayMode === 'details' && (
        <div>
          <Button onClick={() => setDisplayMode('list')}>Back</Button>
          {selectedReport && <ReportDetailBackend report={selectedReport} />}
        </div>
      )}
        
      </div>
    </div>
  );
};

export default Admin;
