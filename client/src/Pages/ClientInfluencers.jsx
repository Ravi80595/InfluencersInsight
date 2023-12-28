import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Spinner, Image, Flex, Text, Input, Select, Button, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../Components/BaseUrl';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { formatFollowersCount } from '../Utils/formatFollowers';
import { Tooltip } from '@chakra-ui/react'

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
const [data,setData]=useState()
const [tableHeight, setTableHeight] = useState('10px');
const [tableTwoHeight, setTableTwoHeight] = useState('10px');
const [expandedRows, setExpandedRows] = useState([]);
const [rowBorder,setRowBorder]=useState('0px')
const toast=useToast()

const handleToggleRow = (rowId) => {
  setExpandedRows((prevRows) => (prevRows.includes(rowId) ? prevRows.filter((id) => id !== rowId) : [...prevRows, rowId]));
  setRowBorder((prevBorder)=> (prevBorder === '0px' ? '2px sold grey': ' 0px'))
};

const toggleTableVisibility = () => {
  setTableHeight((prevHeight) => (prevHeight === 'auto' ? '10px' : 'auto'));
};

const toggleTableTwoVisibility = () => {
  setTableTwoHeight((prevHeight) => (prevHeight === 'auto' ? '10px' : 'auto'));
};


const fetchData = async ()=>{
  const token = localStorage.getItem('token');
  if (token) {
    fetch(`${baseUrl}/user/userProfile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData([data.Data]);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }
}

  
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
  fetchData()
}, []);


const handleTickClick = async (influencerID) => {
  console.log(influencerID,'influencer id')
  try {
    const response = await fetch(`${baseUrl}/user/selected`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: data[0]._id, 
        influencerID: influencerID,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    toast({
      title: 'Influencer Selected',
      description: 'Team connect with influencer.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    fetchData()
    console.log(result.msg);
  } catch (error) {
    console.error('Error updating selected influencers:', error);
  }
};


const handleReject = async (influencerID)=>{
  try {
    const response = await fetch(`${baseUrl}/user/rejected`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: data[0]._id, 
        influencerID: influencerID,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    toast({
      title: 'Influencer Rejected',
      description: 'Thanks for updating.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
    fetchData()
    console.log(result.msg);
  } catch (error) {
    console.error('Error updating selected influencers:', error);
  }
}

const removeRejected = async (influencerID)=>{
  try {
    const response = await fetch(`${baseUrl}/user/removeFromRejected`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: data[0]._id, 
        influencerID: influencerID,
      }),
    }); 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    fetchData()
    console.log(result.msg);
  } catch (error) {
    console.error('Error updating selected influencers:', error);
  }
}


const removeSelected = async (influencerID)=>{
  try {
    const response = await fetch(`${baseUrl}/user/removeFromSelected`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: data[0]._id, 
        influencerID: influencerID,
      }),
    }); 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    fetchData()
    console.log(result.msg);
  } catch (error) {
    console.error('Error updating selected influencers:', error);
  }
}



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


return (
   <Box>
          <Flex justifyContent="space-between">
            <Text w={["30%","30%","30%","15%"]} fontSize={["10px","10px","10px","20px"]}>Suggested : {data && data[0].suggested.length}</Text>
            {/* <Input fontSize={["10px","10px","10px","20px"]} onInput={handleChange} w={["30%","30%","30%","60%"]} placeholder="Search Influencer"/> */}
            {/* <Text w={["30%","30%","30%","15%"]} fontSize={["10px","10px","10px","20px"]}>Verified Users : 0</Text> */}
          </Flex>
        <Flex gap={'10px'}>
            <Box w={'50%'} p={'30px'} borderRadius={'5px'}>
            <Tooltip label='Selected Influencers' fontSize='md' placement='top-start'>
              <Box background={'black'} color={'white'} cursor={'pointer'} p={'10px'} borderRadius={'5px'} onClick={toggleTableVisibility}>
                <Text>Selected Influencers :  {data && data[0].selected.length}</Text>
              </Box>
              </Tooltip>
        <Box>
        <TableContainer height={tableHeight} background={'#f2f2f2'}>
          <Table size='sm'>
            <Thead>
              <Tr textAlign='center'>
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                data[0].selected.map((ele) => (
                  <Tr key={ele.name}>
                    <Td>{ele.name}</Td>
                    <Td color={'blue'}> <a href={ele.instagram} target='_blank'>{getInstagramUsername(ele.instagram)}</a></Td>                 
                     <Td onClick={()=>handleToggleRow(ele._id)}>{formatFollowersCount(ele.followers)}</Td>
                    <Td>
                      <ImCross cursor={'pointer'} onClick={()=>removeSelected(ele._id)}/>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        </Box>
            </Box>
            <Box w={'50%'} p={'30px'}>
            <Tooltip label='Rejected Influencers' fontSize='md' placement='top-start'>
              <Box background={'black'} color={'white'} cursor={'pointer'} p={'10px'} borderRadius={'5px'} onClick={toggleTableTwoVisibility}>
                <Text>Rejected Influencers : {data && data[0].rejected.length}</Text>
              </Box>
              </Tooltip>
              <TableContainer height={tableTwoHeight} background={'#f2f2f2'}>
              <Table size='sm'>
                <Thead>
                  <Tr textAlign='center'>
                  </Tr>
                </Thead>
                <Tbody>
                {
                  data && data[0].rejected.map(ele=>(
                      <Tr>
                        <Td>{ele.name}</Td>
                        <Td color={'blue'}> <a href={ele.instagram} target='_blank'>{getInstagramUsername(ele.instagram)}</a></Td>      
                        <Td onClick={()=>handleToggleRow(ele._id)}>{formatFollowersCount(ele.followers)}</Td>
                        <Td>
                         <ImCross onClick={()=>removeRejected(ele._id)} />
                        </Td>
                      </Tr>
                  ))
                }
                </Tbody>
              </Table>
            </TableContainer>
            </Box>
        </Flex>
      <Box>
          <div style={{ marginTop: '40px' }}>
            <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr textAlign='center'>
                    <Th>Influencer Name</Th>
                    <Th>Instgram</Th>
                    <Th>Followers</Th>
                    <Th>Select</Th>
                    <Th>Reject</Th>
                  </Tr>
                </Thead>
                <Tbody>
                {data &&
                  data[0].suggested.map((ele) => (
              <React.Fragment key={ele._id}
              >
                <Tooltip label='Click to see more details' fontSize='md' placement='top-start'>
                <Tr cursor="pointer" _hover={{ backgroundColor: '#f3f4f6' }} style={{ borderTop: `2px solid ${expandedRows.includes(ele._id) ? 'grey' : 'transparent'}`,borderLeft: `2px solid ${expandedRows.includes(ele._id) ? 'grey' : 'transparent'}`,borderRight: `2px solid ${expandedRows.includes(ele._id) ? 'grey' : 'transparent'}`}}>
                  <Td onClick={()=>handleToggleRow(ele._id)}>{ele.name}</Td>
                  <Td color={'blue'}> <a href={ele.instagram} target='_blank'>{getInstagramUsername(ele.instagram)}</a></Td>                  <Td onClick={()=>handleToggleRow(ele._id)}>{formatFollowersCount(ele.followers)}</Td>
                  <Td>
                    <TiTick color='green' fontSize={'30px'} onClick={() => handleTickClick(ele._id)}/>
                  </Td>
                  <Td>
                    <ImCross color='red' onClick={() => handleReject(ele._id)}/>
                  </Td>
                </Tr>
                </Tooltip>
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
                </Tbody>
              </Table>
            </TableContainer>
          </div>
      </Box>
   </Box>
  )
}

export default ClientInfluencers