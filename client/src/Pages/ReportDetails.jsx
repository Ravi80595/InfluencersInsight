import React, { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel,Flex,Box,Text,TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button,} from '@chakra-ui/react'
import { FaRegHeart } from "react-icons/fa";
import { FaCertificate } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { AiOutlinePercentage } from "react-icons/ai";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';



const ReportDetails = ({ report }) => {
  const navigate=useNavigate()
  const [reportData,setReportData]=useState([])
  
  console.log(reportData,'selected report')


const handleDeleteReport = async (reportId) => {
  try {
    const response = await fetch(`https://unusual-puce-mite.cyclic.app/report/${reportId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      // Remove the deleted report from the local state
      navigate('/admin')
      } else {
      console.error('Error deleting report:', response.status);
    }
  } catch (error) {
    console.error('Error deleting report:', error);
  }
};


useEffect(() => {
  // Fetch the report details by its ID
  const fetchReportDetails = async () => {
    try {
      const response = await fetch(`https://unusual-puce-mite.cyclic.app/report/${report._id}`);
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

export default ReportDetails;
