import React, { useEffect } from 'react'
import "../CSS/Dashboard.css"
import { Flex,Box,Text,Menu,MenuButton,MenuGroup,MenuDivider,MenuList,MenuItem,Avatar,Image} from '@chakra-ui/react'
import { useState } from 'react'
import {GiPostStamp} from "react-icons/gi"
import axios from 'axios'
import Reports from './Reports'
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import laudcoWhite from '../Images/laudcoWhite.png'
import {baseUrl} from '../Components/BaseUrl'
import ClientInfluencers from './ClientInfluencers'
import ClientCreateCampaign from './ClientCreateCampaign'
import ClientAllInfluencers from './ClientAllInfluencers'

const Dashboard = () => {
    const [show,setShow]=useState("Users")
    const [profileData,setProfileData]=useState([])


useEffect(() => {
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
            console.log(data,'profile data')
            setProfileData([data.Data]);
          })
          .catch((error) => {
            console.error('Error fetching user profile:', error);
          });
      }
}, []); 




return (
<Flex w='100%'>
    <Box backgroundImage={'https://themewagon.github.io/pluto/images/layout_img/pattern_h.png'} backgroundColor="#15283c" id='lhsBox'  fontSize={[12,15,20]} w={["5%","5%","10%","16%"]} h='100vh' p={["0px","0px",'0px']}>
      <Flex justifyContent={'center'} p={'10px'} pt={'20px'}>
      <Image w={'150px'} src={laudcoWhite}/>
      </Flex>
      <Box id='linkBox' marginTop={'20px'} color={'white'}>
      <Text display={["none","none","none","block"]} pb={'5px'} color={'white'} pl={'10px'}>General</Text>
      <hr />
      <Flex id='usersBox' _hover={{color:'black'}} p='10px 17px' className='linkItem' onClick={()=>setShow("create")}>
      <MdOutlineAccessTime />
      <Text pl={["0px","5px",'15px']} className="lhsName">Create Campaign</Text>
      </Flex>
      <Flex id='usersBox' _hover={{color:'black'}} p='10px 17px' className='linkItem' onClick={()=>setShow("Posts")}>
      <GiPostStamp/>
      <Text pl={["0px","5px",'15px']} className="lhsName">Suggestions</Text>
      </Flex>
      <Flex id='usersBox' _hover={{color:'black'}} p='10px 17px' className='linkItem' onClick={()=>setShow("Users")}>
      <IoAnalyticsSharp />      
      <Text pl={["0px","5px",'15px']} className="lhsName">Live Campaigns</Text>
      </Flex>
      <Flex id='usersBox' _hover={{color:'black'}} p='10px 17px' className='linkItem' onClick={()=>setShow("track")}>
      <MdOutlineAccessTime />
      <Text pl={["0px","5px",'15px']} className="lhsName">Influencers</Text>
      </Flex>
      </Box>
</Box>


{/*     Right hand Side From Here    */}
  {
  profileData.length>0 && profileData.map(ele=>(

<Box id='rhsBox' w='84%' ml='16%' h='auto' backgroundColor={'#f9f9f9'}> 
<Box id='navbarBox' backgroundColor={'#15283c'} p='0px 40px'>
<Flex justifyContent='space-between' pt={3} mb={3}>
<Text fontWeight='bold'>Welcome</Text>
</Flex>
</Box>
<Box id='rhsBody' m='30px' p='30px'>

{
show==="Users"?<Reports data={profileData}/>:show==="Posts"?<ClientInfluencers data={profileData}/>:show==="create"?<ClientCreateCampaign data={profileData}/>:show==="track"?<ClientAllInfluencers data={profileData}/>:<h1>Fearture Available Soon</h1>
}
</Box>
</Box>
))
}
</Flex>
  )
}

export default Dashboard