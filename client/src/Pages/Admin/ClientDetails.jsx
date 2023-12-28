import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Flex,Box,Text,TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, useToast, Select,} from '@chakra-ui/react'
import { useState } from 'react';
import { useEffect } from 'react';
import { baseUrl } from '../../Components/BaseUrl';
import axios from 'axios';
import ReportDetailBackend from './ReportDetailBackend';
import { formatFollowersCount } from '../../Utils/formatFollowers';




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
      const toast= useToast()
      const [allInfluencers,setAllInfluencers]=useState([])
      const [expandedRows, setExpandedRows] = useState([]);

      const handleToggleRow = (rowId) => {
        setExpandedRows((prevRows) => (prevRows.includes(rowId) ? prevRows.filter((id) => id !== rowId) : [...prevRows, rowId]));
        // setRowBorder((prevBorder)=> (prevBorder === '0px' ? '2px sold grey': ' 0px'))
      };

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
    const response = await fetch(`${baseUrl}/report/assignReport/${clientDetail._id}`, {
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

// console.log(clientDetail,'dets')


const handleUpdateSuggestion = async (influencerID) => {
  try {
    const response = await fetch(`${baseUrl}/user/suggested`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: clientDetail._id, 
        influencerID: influencerID,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    toast({
      title: 'Influencer Suggested',
      description: "Thanks for suggesting",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    // fetchData()
    console.log(result.msg);
  } catch (error) {
    console.error('Error updating selected influencers:', error);
  }
};

// console.log(influencers)
const getInstagramUsername = (url) => {
  try {
    const urlObject = new URL(url);
    let username = urlObject.pathname.substring(1); // Remove leading "/"

    // Remove trailing "/" if it exists
    username = username.endsWith('/') ? username.slice(0, -1) : username;
    // Limit username to 20 characters
    username = username.substring(0, 10);
    return username;
  } catch (error) {
    console.error('Error extracting Instagram username:', error);
    return url; // Return the original URL if extraction fails
  }
};

const reportMore = async(ele)=>{
  <ReportDetailBackend report={ele}/>
}



const [selectedState, setSelectedState] = useState('');
const [selectedGenre, setSelectedGenre] = useState('');

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry"
];


const handleStateChange = async (event) => {
  const selectedValue = event.target.value;
  setSelectedState(selectedValue);
};

const handleGenreChange = async (selectedValue) => {
  setSelectedGenre(selectedValue);
};

const applyFilters = async () => {
  try {
    let response;

    if (selectedState === '' && selectedGenre === '') {
      setInfluencers(allInfluencers);
    } else {
      if (selectedState !== '' && selectedGenre === '') {
        response = await fetch(`${baseUrl}/influencer/searchState/${encodeURIComponent(selectedState)}`);
      } else if (selectedState === '' && selectedGenre !== '') {
        response = await fetch(`${baseUrl}/influencer/searchGenre/${encodeURIComponent(selectedGenre)}`);
      } else {
        response = await fetch(`${baseUrl}/influencer/search/${encodeURIComponent(selectedState)}/${encodeURIComponent(selectedGenre)}`);
      }

      if (response.ok) {
        const data = await response.json();
        setInfluencers(data);
      } else {
        console.error('Error fetching influencers:', response.status);
      }
    }
  } catch (error) {
    console.error('Error fetching influencers:', error);
  }
};

useEffect(() => {
  applyFilters();
}, [selectedState, selectedGenre]);


return (
    <>
      <Tabs paddingTop={'20px'}>
      <TabList pb={'20px'}>
        <Tab>Client Brief</Tab>
        <Tab>Campaigns</Tab>
        <Tab>Influencers</Tab>
        <Tab>Influencers Selected/Rejected</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text fontWeight={'600'} mt={'10px'} mb={'10px'}> Client Name : {clientDetail.name}</Text>
          <Box border={'2px solid grey'} p={'7px'}>
            <Text>Brief by BD Team</Text>
            <Flex justifyContent={'space-around'} mt={'15px'}> 
              <Box>
                <Text mt={'10px'}>Brand Details : {clientDetail.brandName}</Text>
                <Text mt={'10px'}>Brand Objective : {clientDetail.brandObjective}</Text>
                <Text mt={'10px'}>Landing Cost : {clientDetail.landingCost}</Text>
                <Text mt={'10px'}> </Text>
              </Box>
              <Box>
                <Text mt={'10px'}>Email : {clientDetail.email}</Text>
                <Text mt={'10px'}>Genere : {clientDetail.genere}</Text>
                <Text mt={'10px'}> Remarks : {clientDetail.remarks}</Text>
                <Text mt={'10px'}> </Text>
              </Box>
            </Flex>
          </Box>
          {clientDetail.reports && clientDetail.briefs.map(ele => (
          <Box border={'2px solid grey'} p={'7px'} mt={'10px'}>
            <Text>Brief by client</Text>
            <Flex justifyContent={'space-around'} mt={'15px'}> 
              <Box>
                <Text mt={'10px'}>Agency Name : {ele.agencyName}</Text>
                <Text mt={'10px'}>Campaign Name : {ele.briefName}</Text>
                <Text mt={'10px'}>Category : {ele.briefCategory}</Text>
                <Text mt={'10px'}>Deal Type : {ele.briefDealType}</Text>
                <Text mt={'10px'}>Platform : {ele.briefPlatform}</Text>
                <Text mt={'10px'}> </Text>
              </Box>
              <Box>
                <Text mt={'10px'}>Influencers : {ele.briefInfluencers}</Text>
                <Text mt={'10px'}>Genre : {ele.briefGenre}</Text>
                <Text mt={'10px'}> Location : {ele.location}</Text>
                <Text mt={'10px'}>Metrics : {ele.briefMetrics}</Text>
                <Text mt={'10px'}> </Text>
              </Box>
            </Flex>
          </Box>
        ))}
        </TabPanel>
        <TabPanel>
            <Flex justifyContent={'space-between'}>
            <Box>
            <Text fontSize={'18px'}>{clientDetail.name}</Text>
            {/* <Text paddingTop={'10px'}>Email : {clientDetail.email}</Text> */}
            <Text pt={'20px'} pb={'10x'} fontWeight={'bold'} fontSize={'20px'}>Campaigns</Text>
            </Box>
            <Button onClick={() => setShowForm(true)}>New Campaign</Button>
            </Flex>
            <hr />
                <Box mt={'25px'} border={'2px solid grey'} p={'15px'} borderRadius={'5px'}>
                  {clientDetail.reports && clientDetail.reports.map(ele => (
                    <Box key={ele.brandName} mt={'25px'} border={'2px solid grey'} p={'15px'} borderRadius={'5px'} onClick={()=>reportMore(ele)}>
                        <Flex justifyContent={'space-around'}>
                          <Box>
                            <Text> Campaign Name : {ele.reportName}</Text>
                           <Text mt={'10px'}> Campaign Date : {ele.NoteDate} {ele.NoteTime}</Text>
                           <Text mt={'10px'}>Campaign Budget : {ele.budget}</Text>
                          </Box>
                          <Box>
                          <Text> Influencers Live : {ele.influencersLive}</Text>
                           <Text mt={'10px'}> Posts Live : {ele.postsLive}</Text>
                           <Text mt={'10px'}> Comments : {ele.comments}</Text>
                          </Box>
                          <Box>
                          <Text> Engagement : {ele.engagements}</Text>
                           <Text mt={'10px'}> Likes : {ele.likes}</Text>
                           <Text mt={'10px'}>Reach : {ele.reach}</Text>
                          </Box>
                        </Flex>
                      <Text>
                        {/* <Button onClick={() => { setSelectedReport(ele); setDisplayMode('details'); }}>More</Button> */}
                      </Text>
                    {/* </Text> */}
                    </Box>
                  ))}
              </Box>
                {/* </Tbody>
              </Table>
            </TableContainer> */}
        </TabPanel>



        <TabPanel>
        <Flex mb={10}mt={5} justifyContent="space-between">
    <select value={selectedState} onChange={handleStateChange}>
      <option value="">Filter by state</option>
      {states.map((state, index) => (
        <option key={index} value={state}>
          {state}
        </option>
      ))}
    </select>
    <Select
        fontSize={["10px", "10px", "10px", "20px"]}
        value={selectedGenre}
        onChange={(e) => handleGenreChange(e.target.value)}
        w={["30%", "30%", "30%", "20%"]}
        placeholder="Select Genre"
      >
        <option value="tech">Tech</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="fashion">Fashion</option>
        <option value="parenting">Parenting</option>
        <option value="travel">Travel</option>
        <option value="beauty">Beauty & makeup</option>
        <option value="gaming">Gaming</option>
        <option value="drama">Drama</option>
        <option value="food">Food & Cooking</option>
        <option value="fitness">Fitness</option>
      </Select>
      </Flex>


        <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr textAlign='center'>
                    <Th>Influencer Name</Th>
                    <Th>Instagram</Th>
                    <Th>Followers</Th>
                    <Th>Suggest</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {influencers && influencers.map(ele => (
                    <React.Fragment key={ele._id}
                    >
                      <Tr cursor="pointer" _hover={{ backgroundColor: '#f3f4f6' }} style={{ borderTop: `2px solid ${expandedRows.includes(ele._id) ? 'grey' : 'transparent'}`,borderLeft: `2px solid ${expandedRows.includes(ele._id) ? 'grey' : 'transparent'}`,borderRight: `2px solid ${expandedRows.includes(ele._id) ? 'grey' : 'transparent'}`}}
            >
                        <Td onClick={()=>handleToggleRow(ele._id)}>{ele.name}</Td>
                        <Td color={'blue'}> <a href={ele.instagram} target='_blank'>{getInstagramUsername(ele.instagram)}</a></Td>
                        <Td onClick={()=>handleToggleRow(ele._id)}>{formatFollowersCount(ele.followers)}</Td> 
                        {/* <Td> */}
                          {/* <TiTick color='green' fontSize={'30px'} onClick={() => handleTickClick(ele._id)}/> */}
                        {/* </Td> */}
                      <Td><Button onClick={()=>handleUpdateSuggestion(ele._id)}>Suggest</Button></Td>
                        {/* <Td> */}
                          {/* <ImCross color='red' onClick={() => handleReject(ele._id)}/> */}
                        {/* </Td> */}
                      </Tr>
                      {expandedRows.includes(ele._id) && (
                        <Tr style={{ borderBottom: `2px solid ${expandedRows.includes(ele._id) ? 'grey' : 'transparent'}` ,borderLeft: `2px solid ${expandedRows.includes(ele._id) ? 'grey' : 'transparent'}`,borderRight: `2px solid ${expandedRows.includes(ele._id) ? 'grey' : 'transparent'}`}}
                        >
                          <Td colSpan={5} textAlign={'left'}>
                            <Flex justifyContent={'space-between'}>
                              <Text fontWeight={'500'}>Average Views : {ele.views}</Text>
                              <Text> YouTube : {ele.youtube}</Text>
                              <Text>State : {ele.state}</Text>
                            </Flex>
                            <Flex mt={'15px'} justifyContent={'space-between'}>
                              <Text>City : {ele.city}</Text>
                              <Text> YouTube Name : {ele.youtubeName}</Text>
                              <Text>Barter : {ele.barter}</Text>
                            </Flex>
                            <Flex mt={'15px'} justifyContent={'center'}>
                              <Text>Genre : {ele.genre}</Text>
                            </Flex>
                          </Td>
                        </Tr>
                      )}
                    </React.Fragment>
                  ))}
                    {/* </Tr> */}
                
                </Tbody>
              </Table>
            </TableContainer>
        </TabPanel>
        <TabPanel>
        <Flex gap={'10px'}>
            <Box w={'50%'} p={'30px'} borderRadius={'5px'}>
              <Box background={'black'} color={'white'} cursor={'pointer'} p={'10px'} borderRadius={'5px'}>
                <Text>Selected Influencers :  {clientDetail && clientDetail.selected.length}</Text>
              </Box>
        <Box>
        <TableContainer background={'#f2f2f2'}>
          <Table size='sm'>
            <Thead>
              <Tr textAlign='center'>
              </Tr>
            </Thead>
            <Tbody>
              {clientDetail &&
                clientDetail.selected.map((ele) => (
                  <Tr key={ele.name}>
                    <Td>{ele.name}</Td>
                    <Td color={'blue'}> <a href={ele.instagram} target='_blank'>{getInstagramUsername(ele.instagram)}</a></Td>                 
                     <Td>{formatFollowersCount(ele.followers)}</Td>
                    <Td>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        </Box>
            </Box>
            <Box w={'50%'} p={'30px'}>
              <Box background={'black'} color={'white'} cursor={'pointer'} p={'10px'} borderRadius={'5px'}>
                <Text>Rejected Influencers : {clientDetail && clientDetail.rejected.length}</Text>
              </Box>
              <TableContainer background={'#f2f2f2'}>
              <Table size='sm'>
                <Thead>
                  <Tr textAlign='center'>
                  </Tr>
                </Thead>
                <Tbody>
                {
                  clientDetail && clientDetail.rejected.map(ele=>(
                      <Tr>
                        <Td>{ele.name}</Td>
                        <Td color={'blue'}> <a href={ele.instagram} target='_blank'>{getInstagramUsername(ele.instagram)}</a></Td>      
                        <Td>{formatFollowersCount(ele.followers)}</Td>
                        <Td>
                         {/* <ImCross onClick={()=>removeRejected(ele._id)} /> */}
                        </Td>
                      </Tr>
                  ))
                }
                </Tbody>
              </Table>
            </TableContainer>
            </Box>
        </Flex>
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