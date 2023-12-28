import React from 'react'
import { Box,TableContainer,Table,Thead,Tr,Th,Tbody,Td,Spinner,Image,Flex,Text,Input,Select, Button } from '@chakra-ui/react'
import { useState } from 'react';
import ReportDetails from './ReportDetails';
import { useEffect } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import {baseUrl} from '../Components/BaseUrl'


const Reports = ({data}) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [displayMode, setDisplayMode] = useState('list');
  const [reports, setReports] = useState([]);
  console.log('profile report',data[0].reports)


  
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

useEffect(() => {
  fetchReports();
}, []);



return (
  <div style={{ marginTop: '40px' }}> 
      {/* <Button>Create New Campaign</Button> */}
    {displayMode === 'list' && (
            <div style={{ marginTop: '40px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '10px', textAlign: 'center', marginBottom: '30px' }}>All Campaigns</h2>
              <TableContainer>
                <Table size='sm'>
                  <Thead>
                    <Tr textAlign='center'>
                      <Th>Campaign Name</Th>
                      <Th>Report Name</Th>
                      <Th>Created On</Th>
                      <Th>Details</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data[0].reports.length>0 && data[0].reports.map(ele => (
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
              <Button onClick={() => setDisplayMode('list')}><IoMdArrowBack /></Button>
              {selectedReport && <ReportDetails report={selectedReport} />}
            </div>
          )}
            
          </div>
  )
}

export default Reports