import React, { useState, useEffect } from 'react';
import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Spinner, Image, Flex, Text, Input, Select, Button, useToast, Textarea } from '@chakra-ui/react';
import { baseUrl } from '../../Components/BaseUrl';
import InfluencerDetail from '../InfluencerDetail'



const IrmInfluencers = () => {
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
    followers:'',
    state:'',
    city:'',
    language:'',
    barter:'',
    genre:'',
    youtubeName:''
  });
  const [influencers, setInfluencers] = useState([]);
  const [showInfluencerForm, setShowInfluencerForm] = useState(false);
  const toast=useToast()
  const [allInfluencers,setAllInfluencers]=useState([])

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
      toast({
        title: 'Influencer Added.',
        description: '',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
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
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {showInfluencerForm && (
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
          <form onSubmit={handleInfluencerFormSubmit}>
            {/* Influencer Name Input */}
              <input
                type="text"
                placeholder='Influencer Name'
                value={influencerFormData.name}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, name: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}                />
            

           
              <input
                type="text"
                placeholder='Instagram'
                value={influencerFormData.instagram}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, instagram: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}  
              />


         
              <input
                type="text"
                placeholder='Followers'
                value={influencerFormData.followers}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, followers: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}                />
            {/* </label> */}


            {/* YouTube Input */}
            {/* <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              YouTube: */}
              <input
                type="text"
                placeholder='Youtube'
                value={influencerFormData.youtube}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, youtube: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}                />
            {/* </label> */}

            {/* Email Input */}
          
              <input
                type="text"
                placeholder='Email'
                value={influencerFormData.email}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, email: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}                    />
            {/* </label> */}

            {/* Phone Input */}
            {/* <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Phone: */}
              <input
                type="text"
                placeholder='Phone Number'
                value={influencerFormData.phone}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, phone: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}                     />
            {/* </label> */}


            {/* <label style={{ display: 'block', margin: '10px 0', fontSize: '14px', fontWeight: 'bold' }}>
              Views: */}
              <input
                type="text"
                placeholder='Average Views'
                value={influencerFormData.views}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, views: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}                   />
            {/* </label> */}

             

              <input
                type="text"
                placeholder='State'
                value={influencerFormData.state}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, state: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}                   />

                 <input
                type="text"
                placeholder='City'
                value={influencerFormData.city}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, city: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}             />

                 <input
                type="text"
                placeholder='Language'
                value={influencerFormData.language}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, language: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}  />

            <input
                type="text"
                placeholder='Barter'
                value={influencerFormData.barter}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, barter: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '96%', boxSizing: 'border-box', marginTop: '5px',border:'1px solid grey',borderRadius:'5px',marginBottom:'5px' }}/>


            <input
                type="text"
                placeholder='Genre'
                value={influencerFormData.genre}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, genre: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '96%', boxSizing: 'border-box', marginTop: '5px',border:'1px solid grey',borderRadius:'5px',marginBottom:'5px' }}/>
            <Textarea
                type="text"
                placeholder='Message'
                value={influencerFormData.message}
                onChange={(e) => setInfluencerFormData({ ...influencerFormData, message: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '96%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}                 />

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
                onClick={() => setShowInfluencerForm(false)}
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
            <Flex justifyContent="space-between">
      <Text w={["30%","30%","30%","15%"]} fontSize={["10px","10px","10px","20px"]}>Influencers : {influencers.length}</Text>
      <Input fontSize={["10px","10px","10px","20px"]} onInput={(e)=>handleSearch(e.target.value)} w={["30%","30%","30%","60%"]} placeholder="Search Influencer"/>
      <div>
          <button
            onClick={() => setShowInfluencerForm(true)}
            style={{
              marginLeft: '10px',
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              borderRadius: '5px',
              cursor: 'pointer',
              border: 'none',
              fontSize: '14px',
            }}
          >
            Add New Influencer
          </button>
        </div>
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
            <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr textAlign='center'>
                    <Th>Influencer Name</Th>
                    <Th>Instagram</Th>
                    <Th>Phone No.</Th>
                    <Th>Details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {influencers && influencers.map(ele => (
                    <Tr key={ele._id} cursor="pointer" _hover={{ backgroundColor: "#f3f4f6" }}>
                      <Td>{ele.name}</Td>
                      <Td color={'blue'}> <a href={ele.instagram} target='_blank'>{getInstagramUsername(ele.instagram)}</a></Td>
                      <Td>{ele.phone}</Td>
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
            {selectedReport && <InfluencerDetail detail={selectedReport} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default IrmInfluencers