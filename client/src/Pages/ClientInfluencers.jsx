import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Spinner, Image, Flex, Text, Input, Select, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../Components/BaseUrl';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";





const ClientInfluencers = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [displayMode, setDisplayMode] = useState('list');
    const [influencerFormData, setInfluencerFormData] = useState({
      name: '',
      instagram: '',
      youtube: '',
      email: '',
      phone: '',
      message: '',
      views:'',
      followers:''
    });
    const [influencers, setInfluencers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showInfluencerForm, setShowInfluencerForm] = useState(false);
    console.log(influencerFormData)
  
  const handleInfluencerFormSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${baseUrl}/influencer/create`, {
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
          followers:'',
          views:''
        });
        setShowInfluencerForm(false);
      } catch (error) {
        console.error('Error submitting influencer form data:', error);
      }
  };
  
  const fetchInfluencers = async () => {
  try {
      const response = await fetch(`${baseUrl}/influencer/influencers`);
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
   <Box>
      <Box>
      {/* <div style={{ marginTop: '40px' }}> */}
        {displayMode === 'list' && (
          <div style={{ marginTop: '40px' }}>
            {/* <h2 style={{ fontSize: '20px', marginBottom: '10px', textAlign: 'center', marginBottom: '30px' }}>All Reports</h2> */}

            <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr textAlign='center'>
                    <Th>Influencer Name</Th>
                    <Th>Instgram</Th>
                    <Th>Followers</Th>
                    <Th>Select</Th>
                    <Th>Remarks</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {influencers && influencers.map(ele => (
                    <Tr key={ele.name} cursor="pointer" _hover={{ backgroundColor: "#f3f4f6" }}>
                      <Td>{ele.name}</Td>
                      <Td>{ele.instagram}</Td>
                      <Td>{ele.followers}</Td>
                      <Td>
                        <Button><TiTick /></Button>
                        <Button><ImCross />
</Button>

                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        )}
        
            </Box>
        <Flex mt={'90px'}>
            <Box w={'50%'} border={'2px solid red'} height={'500px'}>
                Selected
            </Box>

            <Box w={'50%'} border={'2px solid red'} height={'500px'}>
            rejected
</Box>
        </Flex>

   </Box>
  )
}

export default ClientInfluencers