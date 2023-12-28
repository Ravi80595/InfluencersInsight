import React, { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel,Flex,Box,Text,TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button,useToast, Textarea} from '@chakra-ui/react'
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
    influencers: selectedInfluencers,
    updates:''
  });

  console.log(formData)
  // console.log(influencers)
  console.log(selectedInfluencers)

  const handleCheckboxChange = (influencerId) => {
    console.log(influencerId,'id')
    setSelectedInfluencers((prevSelected) => {
      if (prevSelected.includes(influencerId)) {
        return prevSelected.filter((id) => id !== influencerId);
      } else {
        return [...prevSelected, influencerId];
      }
    });
  };

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


useEffect(() => {
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


useEffect(() => {
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

const handleFormSubmit = async (e) => {
  e.preventDefault();
  // console.log(formData,report._id)
  try {
    const updatedFormData = {
      ...formData,
      influencers: selectedInfluencers,
    };
    const response = await fetch(`${baseUrl}/report/update/${report._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    });
    if (response.ok) {
      toast({
        title: 'Report Updated.',
        description: 'Report updated successfully.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setEditMode(false);
    } else {
      console.error('Error updating report:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating report:', error);
  }
};


const getInstagramUsername = (url) => {
  try {
    const urlObject = new URL(url);
    let username = urlObject.pathname.substring(1); 
    username = username.endsWith('/') ? username.slice(0, -1) : username;
    username = username.substring(0, 10);
    return username;
  } catch (error) {
    console.error('Error extracting Instagram username:', error);
    return url;
  }
};


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
            {/* <input
              type="text"
              value={formData.reportName}
              placeholder='Campaign Name'
              onChange={(e) => setFormData({ ...formData, reportName: e.target.value })}
              style={{ padding: '8px', fontSize: '14px', width: '96%', boxSizing: 'border-box', marginTop: '5px',border:'1px solid grey',borderRadius:'5px',marginBottom:'5px' }}
            /> */}
            <input
              type="text"
              value={formData.influencersLive}
              placeholder='Updated Influencers Live'
              onChange={(e) => setFormData({ ...formData, influencersLive: e.target.value })}
              style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
            />
            <input
              type="text"
              value={formData.postsLive}
              placeholder='Update Posts Live'
              onChange={(e) => setFormData({ ...formData, postsLive: e.target.value })}
              style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
            />

            <input
              type="text"
              value={formData.reach}
              placeholder='New Reach'
              onChange={(e) => setFormData({ ...formData, reach: e.target.value })}
              style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
            />

            <input
              type="text"
              value={formData.budget}
              placeholder='New Budget'
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
            />

            <input
              type="text"
              value={formData.engagements}
              placeholder='New Engagements'
              onChange={(e) => setFormData({ ...formData, engagements: e.target.value })}
              style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
            />

            <input
              type="text"
              value={formData.likes}
              placeholder='New Likes'
              onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
              style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
            />

            <input
              type="text"
              value={formData.comments}
              placeholder='New Comments'
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              style={{ padding: '8px', fontSize: '14px', width: '96%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px'}}
            />

            <input
              type="text"
              value={formData.engagementRate}
              placeholder='New Engagement Rate'
              onChange={(e) => setFormData({ ...formData, engagementRate: e.target.value })}
              style={{ padding: '8px', fontSize: '14px', width: '96%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
            />

          <Textarea
            value={formData.updates}
            placeholder='Updates'
            onChange={(e) => setFormData({ ...formData, updates: e.target.value })}
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
        </div>     

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
                <Text fontSize={'18px'} fontWeight={'500'}>{report.budget} RS</Text>
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
                    <Th>Instagram</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {reportData.influencers && reportData.influencers.map(ele => (
                    <Tr key={ele.name} cursor="pointer" _hover={{ backgroundColor: "#f3f4f6" }}>
                      <Td>{ele.name}</Td>
                      <Td>{ele.email}</Td>
                      <Td>{ele.phone}</Td>
                      <Td color={'blue'}> <a href={ele.instagram} target='_blank'>{getInstagramUsername(ele.instagram)}</a></Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
        </TabPanel>



        <TabPanel>
          <Text>{reportData.updates}</Text>
        </TabPanel>
      </TabPanels>
      </Tabs>
      </>
  );
};

export default ReportDetailBackend;
