import React, { useState } from 'react'
import { baseUrl } from '../Components/BaseUrl';
import { Box, Flex, Select, Text, Textarea, Tooltip, useToast } from '@chakra-ui/react';

const ClientCreateCampaign = ({data}) => {
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const toast = useToast()
  const [formData, setFormData] = useState({
    briefName: '',
    briefInfluencers: '',
    briefCategory: '',
    briefPlatform: '',
    briefGenre: '',
    briefBudget:'',
    briefMetrics:'',
    briefDealType:'',
    briefLocation:'',
  });
  const [isAgency, setIsAgency] = useState(false);
  const [agencyName, setAgencyName] = useState('');

  console.log(formData,'client campaing')


  const handleAgencyChange = (event) => {
    const value = event.target.value;
    setIsAgency(value === 'Yes');
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
      agencyName:agencyName
    };
    console.log(updatedFormData)
    const response = await fetch(`${baseUrl}/user/briefs/${data[0]._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ briefs: [updatedFormData] }),
    });

    if (response.ok) {
      console.log('Brief added successfully');
      toast({
        title: 'Brief added successfully.',
        description: "",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setFormData({
        briefName: '',
        briefBudget: '',
        briefInfluencers: '',
        briefCategory: '',
        briefPlatform: '',
        briefGenre: '',
        briefMetrics: '',
        briefDealType: '',
        briefLocation: '',
      });
    } else {
      console.error('Failed to add brief');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};




return (
  <div>
    
   <Flex justifyContent={'center'}>
 <div
          style={{
            width: '40%',
            backgroundColor: '#fff',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            // zIndex: '9',
          }}
        >
          <form onSubmit={handleFormSubmit}>
          <label>
               Are You an Agency?
          <Select w={'96%'} value={isAgency ? 'Yes' : 'No'} onChange={handleAgencyChange} style={{border:'1px solid grey'}}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
        </label>

      {isAgency && (
          <input
            type="text"
            placeholder="Enter your agency name"
            value={agencyName}
            onChange={(event) => setAgencyName(event.target.value)}
            style={{ padding: '8px', fontSize: '14px', width: '96%', boxSizing: 'border-box', marginTop: '5px',border:'1px solid grey',borderRadius:'5px',marginBottom:'5px' }}
          />
      )}
              <input
                type="text"
                value={formData.briefName} 
                placeholder='Campaign Name'
                onChange={(e) => setFormData({ ...formData, briefName: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '96%', boxSizing: 'border-box', marginTop: '5px',border:'1px solid grey',borderRadius:'5px',marginBottom:'5px' }}
              />

              <input
                type="text"
                value={formData.briefBudget}
                placeholder='Budget'
                onChange={(e) => setFormData({ ...formData, briefBudget: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />
              <input
                type="text"
                value={formData.briefInfluencers}
                placeholder='No. of Influencers'
                onChange={(e) => setFormData({ ...formData, briefInfluencers: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />

            {/* <Tooltip label='Rejected Influencers' fontSize='md' placement='top-start'>
              
                </Tooltip> */}

              <input
                type="text"
                value={formData.briefPlatform}
                placeholder='Platform'
                onChange={(e) => setFormData({ ...formData, briefPlatform: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />

              <input
                type="text"
                value={formData.briefGenre}
                placeholder='Genre'
                onChange={(e) => setFormData({ ...formData, briefGenre: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />
              <input
                type="text"
                value={formData.briefDealType}
                placeholder='Deal Type'
                onChange={(e) => setFormData({ ...formData, briefDealType: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px'}}
              />

              <input
                type="text"
                value={formData.briefLocation}
                placeholder='Location'
                onChange={(e) => setFormData({ ...formData, briefLocation: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />

              {/* <input
                      type="text"
                      value={formData.briefCategory}
                      placeholder='Follower Criteria'
                      onChange={(e) => setFormData({ ...formData, briefCategory: e.target.value })}
                      style={{ padding: '8px', fontSize: '14px', width: '47%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
                      /> */}

                <Select value={formData.briefCategory} onChange={(e)=>setFormData({...formData,briefCategory:e.target.value})}>
                  <option value="nano">Nano</option>
                    <option value="micro">Micro</option>
                  <option value="macro">Macro</option>
                    <option value="celebrity">Celebrity</option>
                </Select>

                <Textarea
                type="text"
                value={formData.briefMetrics}
                placeholder='Remarks (Any specific requirements)'
                onChange={(e) => setFormData({ ...formData, briefMetrics: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', width: '96%', boxSizing: 'border-box', margin: '5px',border:'1px solid grey',borderRadius:'5px' }}
              />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
            </div>
          </form>
        </div>
        </Flex>

<Text mt={'30px'} fontWeight={'600'}>Prvious briefs shared</Text>

  {data[0].briefs && data[0].briefs.map(ele => (
          <Box border={'2px solid grey'} p={'7px'} mt={'10px'}>
            <Flex justifyContent={'space-around'} mt={'15px'}> 
              <Box>
                <Text mt={'10px'}>Agency Name : {ele.agencyName}</Text>
                <Text mt={'10px'}>Campaign Name : {ele.briefName}</Text>
                <Text mt={'10px'}>Category : {ele.briefCategory}</Text>
                <Text mt={'10px'}> </Text>
              </Box>
              <Box>
                <Text mt={'10px'}>Influencers : {ele.briefInfluencers}</Text>
                <Text mt={'10px'}>Genre : {ele.briefGenre}</Text>
                <Text mt={'10px'}>Message : {ele.briefMetrics}</Text>
                <Text mt={'10px'}> </Text>
              </Box>
              <Box>
                <Text mt={'10px'}>Deal Type : {ele.briefDealType}</Text>
                <Text mt={'10px'}>Platform : {ele.briefPlatform}</Text>
                <Text mt={'10px'}> Location : {ele.briefLocation}</Text>
                <Text mt={'10px'}> </Text>
              </Box>
            </Flex>
          </Box>
        ))}
    </div>
  )
}

export default ClientCreateCampaign