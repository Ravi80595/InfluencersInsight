import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Spinner, Image, Flex, Text, Input, Select, Button, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../Components/BaseUrl';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
// import { Spinner } from '@chakra-ui/react'


const ClientAllInfluencers = ({data}) => {
    const [influencers, setInfluencers] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [isLoading,setIsLoading]=useState(false)
    const [rowBorder,setRowBorder]=useState('0px')
    const [query, setQuery] = useState('');
    const toast=useToast()
    const [allInfluencers,setAllInfluencers]=useState([])



    const handleToggleRow = (rowId) => {
      setExpandedRows((prevRows) => (prevRows.includes(rowId) ? prevRows.filter((id) => id !== rowId) : [...prevRows, rowId]));
      setRowBorder((prevBorder)=> (prevBorder === '0px' ? '2px sold grey': ' 0px'))
    };
  
const fetchInfluencers = async () => {
    try {
        setIsLoading(true)
        const response = await fetch(`${baseUrl}/influencer/influencers`);
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const influencersData = await response.json();
        setIsLoading(false)
        setInfluencers(influencersData);
        setAllInfluencers(influencersData)
    } catch (error) {
      setIsLoading(false)
        console.error('Error fetching influencers:', error);
    }
    };

useEffect(() => {
fetchInfluencers();
}, []);

      
const handleTickClick = async (influencerID) => {
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
    //   fetchData()
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
    //   fetchData()
      console.log(result.msg);
    } catch (error) {
      console.error('Error updating selected influencers:', error);
    }
  }


// Function to extract Instagram username from URL and limit to 20 characters
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


const formatFollowersCount=(followersCount)=> {
  if (followersCount < 1000) {
    return followersCount.toString(); // No conversion needed for less than 1K
  } else if (followersCount < 1000000) {
    // Convert to K format
    const countInK = (followersCount / 1000).toFixed(1);
    return `${countInK}K`;
  } else {
    // Convert to M format
    const countInM = (followersCount / 1000000).toFixed(1);
    return `${countInM}M`;
  }
}


const handleSearch = async (e) => {
  try {
    const response = await fetch(`${baseUrl}/influencer/search/${e}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const influencersData = await response.json();
    setInfluencers(influencersData);
  } catch (error) {
    console.error('Error fetching influencers:', error);
  }
};


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

const [selectedState, setSelectedState] = useState('');
const [selectedGenre, setSelectedGenre] = useState('');



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
    <Box>
    <Flex justifyContent="space-between">
      <Text w={["30%","30%","30%","15%"]} fontSize={["10px","10px","10px","20px"]}>Influencers : {influencers.length}</Text>
      <Input fontSize={["10px","10px","10px","20px"]} onInput={(e)=>handleSearch(e.target.value)} w={["30%","30%","30%","60%"]} placeholder="Search Influencer"/>
      <Text w={["30%","30%","30%","15%"]} fontSize={["10px","10px","10px","20px"]}>Verified Users : 0</Text>
    </Flex>

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
          {isLoading ? (
            <Flex mt='60px' justifyContent={'center'} >
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
              />
              </Flex>
          ) :
            influencers.map((ele) => (
        <React.Fragment key={ele._id}
        >
          <Tr cursor="pointer" _hover={{ backgroundColor: '#f3f4f6' }} style={{ borderTop: `2px solid ${expandedRows.includes(ele._id) ? 'grey' : 'transparent'}`,borderLeft: `2px solid ${expandedRows.includes(ele._id) ? 'grey' : 'transparent'}`,borderRight: `2px solid ${expandedRows.includes(ele._id) ? 'grey' : 'transparent'}`}}
>
            <Td onClick={()=>handleToggleRow(ele._id)}>{ele.name}</Td>
            <Td color={'blue'}> <a href={ele.instagram} target='_blank'>{getInstagramUsername(ele.instagram)}</a></Td>
            <Td onClick={()=>handleToggleRow(ele._id)}>{formatFollowersCount(ele.followers)}</Td> 
            <Td>
              <TiTick color='green' fontSize={'30px'} onClick={() => handleTickClick(ele._id)}/>
            </Td>
            <Td>
              <ImCross color='red' onClick={() => handleReject(ele._id)}/>
            </Td>
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
          </Tbody>
        </Table>
      </TableContainer>
    </div>
</Box>
  )
}

export default ClientAllInfluencers