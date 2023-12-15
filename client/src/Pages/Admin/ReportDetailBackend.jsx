import React, { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel,Flex,Box,Text,TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button,useToast} from '@chakra-ui/react'
import { FaRegHeart } from "react-icons/fa";
import { FaCertificate } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { AiOutlinePercentage } from "react-icons/ai";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Components/BaseUrl';



const ReportDetailBackend = ({ report }) => {
  const navigate=useNavigate()
  const [reportData,setReportData]=useState([])
  const toast = useToast()
  const [editMode, setEditMode] = useState(false);
  const [influencers, setInfluencers] = useState(report.influencersLive);
  const [postsLive, setPostsLive] = useState(report.postsLive);
  const [reach, setReach] = useState(report.reach);
  const [budget, setBudget] = useState(report.budget);


const handleDeleteReport = async (reportId) => {
  try {
    const response = await fetch(`${baseUrl}/report/${reportId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      toast({
        title: 'Campaign Deleted.',
        description: "Campaign deleted please go back.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      navigate('/admin')
      } else {
      console.error('Error deleting report:', response.status);
    }
  } catch (error) {
    console.error('Error deleting report:', error);
  }
};


const handleSaveChanges = async () => {
  // Implement logic to send a PUT request and save changes to the server
  // Update the state and exit edit mode
  setEditMode(false);
};


useEffect(() => {
  // Fetch the report details by its ID
  const fetchReportDetails = async () => {
    try {
      const response = await fetch(`${baseUrl}/report/${report._id}`);
      if (response.ok) {
        const data = await response.json();
        setReportData(data);
      } else {
        console.error('Error fetching report details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching report details:', error);
    }
  };

  fetchReportDetails();
}, []);


return (
  <>
      <Tabs>
      <TabList pb={'20px'}>
        <Tab>Dashboard</Tab>
        <Tab>Influencers</Tab>
        <Tab>Contents</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
        {editMode ? (
              // <form>
              //   <label>
              //     Influencers Live:
              //     <input type="text" value={influencers} onChange={(e) => setInfluencers(e.target.value)} />
              //   </label>
              //   <Button onClick={handleSaveChanges}>Save</Button>
              //   <Button onClick={() => setEditMode(false)}>Cancel</Button>
              // </form>



<form onSubmit={handleSaveChanges} style={{width:'50%',margin:'auto',border:'2px solid grey',padding:'20px',borderRadius:'20px'}}>
          
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Client Name:
              <input
                type="text"
                value={influencers}
                onChange={(e) => setInfluencers( e.target.value)}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Posts Live
              <input
                type="text"
                value={postsLive}
                onChange={(e) => setPostsLive(e.target.value)}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Reach
              <input
                type="text"
                value={reach}
                onChange={(e) => setReach( e.target.value)}
                style={{ padding: '8px', fontSize: '14px', width: '100%', boxSizing: 'border-box', marginTop: '5px' }}
              />
            </label>
            <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Budget
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget( e.target.value)}
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
                onClick={() => setEditMode(false)}
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
            

            ) : (
          <Box>
            <Box>
            <Flex justifyContent={'space-around'}>
              <Box border={'2px solid grey'} p={'17px'} borderRadius={'10px'} w={'22%'}>
                <Flex justifyContent={'space-between'}>
                  <Box>
                <Text fontSize={'16px'} fontWeight={'400'} pb={'10px'}>INFLUENCERS LIVE</Text>
                <Text fontSize={'18px'} fontWeight={'500'}>{report.influencersLive}</Text>
                  </Box>
                  <FaCertificate />
                </Flex>
              </Box>
              <Box border={'2px solid grey'} p={'17px'} borderRadius={'10px'} w={'22%'}>
                <Flex justifyContent={'space-between'}>
                  <Box>
                <Text fontSize={'16px'} fontWeight={'400'} pb={'10px'}>POSTS LIVE</Text>
                <Text fontSize={'18px'} fontWeight={'500'}>{report.postsLive}</Text>
                  </Box>
                  <FaCertificate />
                </Flex>
              </Box>
              <Box border={'2px solid grey'} p={'17px'} borderRadius={'10px'} w={'22%'}>
                <Flex justifyContent={'space-between'}>
                  <Box>
                <Text fontSize={'16px'} fontWeight={'400'} pb={'10px'}>TOTAL REACH</Text>
                <Text fontSize={'18px'} fontWeight={'500'}>{report.reach}</Text>
                  </Box>
                  <FaCertificate />
                </Flex>
              </Box>
              <Box border={'2px solid grey'} p={'17px'} borderRadius={'10px'} w={'22%'}>
                <Flex justifyContent={'space-between'}>
                  <Box>
                <Text fontSize={'16px'} fontWeight={'400'} pb={'10px'}>BUDGET SPENT</Text>
                <Text fontSize={'18px'} fontWeight={'500'}>{report.budget} RUPIYA</Text>
                  </Box>
                  <FaCertificate/>
                </Flex>
              </Box>
            </Flex>
            <Flex  w={'90%'} m={'auto'} mt={'90px'} justifyContent={'space-around'}>
              <Box w={'50%'} lineHeight={'29px'} borderRadius={'10px'} border={'1px solid grey'} p={'20px'}>
                <Text fontSize={'16px'}>ENGAGEMENTS</Text>
                <Text fontSize={'20px'} fontWeight={'500'}>{report.engagements} M</Text>
                <Text>no. of people engaged with influencers posts</Text>
                <Box backgroundColor={'rgb(248, 250, 252)'} p={'20px'} lineHeight={'30px'} mt={'20px'}>
                  <Flex justifyContent={'space-between'}>
                    <Flex gap={'15px'} fontSize={'18px'}>
                    <FaRegHeart />
                      <Text marginTop={'-7px'}>Likes</Text>
                    </Flex>
                      <Text fontWeight={'500'}>{report.likes}</Text>
                  </Flex>
                  <Flex justifyContent={'space-between'}>
                    <Flex gap={'15px'} fontSize={'18px'}>
                    <FaRegComment />
                      <Text marginTop={'-7px'}>Comments</Text>
                    </Flex>
                      <Text fontWeight={'500'}>{report.comments}</Text>
                  </Flex>
                  <Flex justifyContent={'space-between'}>
                    <Flex gap={'15px'} fontSize={'18px'}>
                    <AiOutlinePercentage />
                      <Text marginTop={'-7px'}>Engagement Rate</Text>
                    </Flex>
                      <Text fontWeight={'500'}>{report.engagementRate}</Text> 
                  </Flex>
                  <Flex justifyContent={'space-between'}>
                    <Flex gap={'15px'} fontSize={'18px'}>
                    <MdCurrencyRupee />
                      <Text marginTop={'-7px'}>CPE</Text>
                    </Flex>
                      <Text fontWeight={'500'}>{report.cpe}</Text>
                  </Flex>
                </Box>
              </Box>


              <Box w={'40%'} borderRadius={'10px'} border={'1px solid grey'} p={'20px'}>
                  <Text>Historic V/S New Engagements</Text>
                  <Box textAlign={'center'} lineHeight={'32px'} pt={'20px'}>
                    <Text fontSize={'18px'}>Historical</Text>
                    <Text fontSize={'20px'} fontWeight={'bold'}>  2.2M</Text>
                    <Text fontSize={'18px'} pt={'20px'}>New Engagement</Text>
                    <Text fontSize={'20px'} fontWeight={'bold'}>2.7M</Text>
                  </Box>
              </Box>
            </Flex>
          </Box>
          {/* <Flex justifyContent={'space-around'} w={'50%'} m={'auto'} mt={'30px'}>
            <Button>Edit</Button>
            <Button onClick={() => handleDeleteReport(report._id)}>Delete</Button>
          </Flex> */}
           {/* ... Existing code ... */}
           <Flex justifyContent={'space-around'} w={'50%'} m={'auto'} mt={'30px'}>
           <Button onClick={() => setEditMode(true)}>Edit</Button>
           <Button onClick={() => handleDeleteReport(report._id)}>Delete</Button>
         </Flex>
       </Box>
     )}
          
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
                  {reportData.influencers && reportData.influencers.map(ele => (
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
          <p>three!</p>
        </TabPanel>
      </TabPanels>
      </Tabs>
      </>
  );
};

export default ReportDetailBackend;
