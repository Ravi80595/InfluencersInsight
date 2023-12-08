import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Flex,Box,Text,TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button,} from '@chakra-ui/react'
import { useState } from 'react';
import { useEffect } from 'react';




const ClientDetails = ({clientDetail}) => {
    const [showForm, setShowForm] = useState(false);
    const [influencers, setInfluencers] = useState([]);
    const [showInfluencers, setShowInfluencers] = useState(false);
    const [selectedInfluencers, setSelectedInfluencers] = useState([]);
    const [formData, setFormData] = useState({
        reportName: '',
        postsLive: '',
        reach: '',
        budget: '',
        engagements: '',
        influencersLive:'',
        likes:'',
        comments:'',
        engagementRate:'',
        cpe:'',
        influencers: selectedInfluencers || [],
      });

console.log('client details',clientDetail)


const handleCheckboxChange = (influencerId) => {
    setSelectedInfluencers((prevSelected) => {
      if (prevSelected.includes(influencerId)) {
        // If already selected, remove it
        return prevSelected.filter((id) => id !== influencerId);
      } else {
        // If not selected, add it
        return [...prevSelected, influencerId];
      }
    });
  };

const handleFormSubmit = async (e) => {
  e.preventDefault();
  try {
    const updatedFormData = {
      ...formData,
      influencers: selectedInfluencers,
    };
    console.log(updatedFormData)
    const response = await fetch(`http://localhost:2147/report/assignReport/${clientDetail._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // fetchReports();

    // Clear the form data
    setFormData({
      reportName: '',
      postsLive: '',
      reach: '',
      budget: '',
      engagements: '',
      influencers: [],
    });

    setSelectedInfluencers([]); // Clear selected influencers

    setShowForm(false);
  } catch (error) {
    console.error('Error submitting form data:', error);
  }
};

useEffect(() => {
    // Fetch influencers from the backend when the component mounts
    const fetchInfluencers = async () => {
      try {
        const response = await fetch('http://localhost:2147/influencer/influencers');
        const influencersData = await response.json();
        setInfluencers(influencersData);
      } catch (error) {
        console.error('Error fetching influencers:', error);
      }
    };

    fetchInfluencers();
  }, []);


return (
    <>
      <Tabs paddingTop={'20px'}>
      <TabList pb={'20px'}>
        <Tab>Client Details</Tab>
        <Tab>Influencers</Tab>
        {/* <Tab>Contents</Tab> */}
      </TabList>
      <TabPanels>
        <TabPanel>
            <Flex justifyContent={'space-between'}>
            <Box>
            <Text fontSize={'18px'}>{clientDetail.name}</Text>
            <Text paddingTop={'10px'}>Email : {clientDetail.email}</Text>
            <Text pt={'20px'} pb={'10x'} fontWeight={'bold'} fontSize={'20px'}>Campaigns</Text>
            </Box>
            <Button onClick={() => setShowForm(true)}>New Campaign</Button>
            {/* <button
            
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
          </button> */}
            </Flex>
            <hr />
            <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr textAlign='center'>
                    <Th>Name</Th>
                    <Th>Starting Date</Th>
                    <Th>Brand Name</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {clientDetail.reports && clientDetail.reports.map(ele => (
                    <Tr key={ele.name} cursor="pointer" _hover={{ backgroundColor: "#f3f4f6" }}>
                      <Td>{ele.name}</Td>
                      <Td>{ele.email}</Td>
                      <Td>{ele.phone}</Td>
                      <Td>
                        {/* <Button onClick={() => { setSelectedReport(ele); setDisplayMode('details'); }}>More</Button> */}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
        </TabPanel>



        <TabPanel>
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
                  {clientDetail.influencers && clientDetail.influencers.map(ele => (
                    <Tr key={ele.name} cursor="pointer" _hover={{ backgroundColor: "#f3f4f6" }}>
                      <Td>{ele.name}</Td>
                      <Td>{ele.email}</Td>
                      <Td>{ele.phone}</Td>
                      <Td>
                        {/* <Button onClick={() => { setSelectedReport(ele); setDisplayMode('details'); }}>More</Button> */}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
        </TabPanel>
      </TabPanels>
      </Tabs>

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
              <input
                type="text"
                value={formData.reportName}
                placeholder='Campaign Name'
                onChange={(e) => setFormData({ ...formData, reportName: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '96%', boxSizing: 'border-box', marginTop: '5px',border:'1px solid grey',borderRadius:'5px',marginBottom:'5px' }}
              />

              <input
                type="text"
                value={formData.influencersLive}
                placeholder='Influencers Live'
                onChange={(e) => setFormData({ ...formData, influencersLive: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />
              <input
                type="text"
                value={formData.postsLive}
                placeholder='Posts Live'
                onChange={(e) => setFormData({ ...formData, postsLive: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />

              <input
                type="text"
                value={formData.reach}
                placeholder='Reach'
                onChange={(e) => setFormData({ ...formData, reach: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />

              <input
                type="text"
                value={formData.budget}
                placeholder='Budget'
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />

              <input
                type="text"
                value={formData.engagements}
                placeholder='Engagements'
                onChange={(e) => setFormData({ ...formData, engagements: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />

              <input
                type="text"
                value={formData.likes}
                placeholder='Likes'
                onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />

              <input
                type="text"
                value={formData.comments}
                placeholder='Comments'
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '96%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px'}}
              />

              <input
                type="text"
                value={formData.engagementRate}
                placeholder='Engagement Rate'
                onChange={(e) => setFormData({ ...formData, engagementRate: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '96%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />

              <div style={{ maxHeight: showInfluencers ? '200px' : '0', overflowY: 'auto', transition: 'max-height 0.5s ease' }}>
                {influencers.map((influencer) => (
                  <div key={influencer._id}>
                    <input
                      type="checkbox"
                      id={influencer._id}
                      checked={selectedInfluencers.includes(influencer._id)}
                      onChange={() => handleCheckboxChange(influencer._id)}
                    />
                    <label htmlFor={influencer._id}>{influencer.name}</label>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowInfluencers(!showInfluencers)}
                style={{
                  padding: '5px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '12px',
                  marginTop: '5px',
                }}
              >
                {showInfluencers ? 'Hide Influencers' : 'Select Influencers'}
              </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button type="submit"
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
      </>
  )
}

export default ClientDetails