import React, { useEffect } from 'react'
import { Flex,Box,Text,Menu,MenuButton,MenuGroup,MenuDivider,MenuList,MenuItem,Avatar} from '@chakra-ui/react'
import { useState } from 'react'
import {GiPostStamp} from "react-icons/gi"
import axios from 'axios'
import Reports from '../Reports'
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";
import Admin from './Admin'
import Influencers from '../Influencers'
import Clients from './Clients'
import '../../CSS/Dashboard.css'


const AdminPanel = () => {
    const [show,setShow]=useState("Users")
    const [profileData,setProfileData]=useState([])


useEffect(()=>{
  getadminProfile()
},[])

const getadminProfile=()=>{
axios.get(`https://unusual-puce-mite.cyclic.app/admin/profile/${'admin._id'}`)
.then((res)=>{
  console.log(res.data)
  setProfileData([res.data])
})
}

const handleLogout=()=>{
let r=" "
localStorage.setItem("adminToken",JSON.stringify(r))
// navigate("/adminlogin")
}


return (
<Flex w='100%' backgroundColor={'#f9f9f9'}>
    <Box id='lhsBox' backgroundColor={'white'} fontSize={[12,15,20]} w={["5%","5%","10%","16%"]} h='100vh' p={["0px","0px",'20px']}>
    <Text textAlign={"center"} mb={5} >Laudco Media</Text>
      <Box id='linkBox' marginTop={'40px'}>
      <Text display={["none","none","none","block"]}>Client Facing</Text>
      <hr />
      <Flex id='usersBox' p='10px 17px' className='linkItem' onClick={()=>setShow("client")}>
      <MdOutlineAccessTime />
      <Text pl={["0px","5px",'15px']} className="lhsName">Clients</Text>
      </Flex>
      <Flex id='usersBox' p='10px 17px' className='linkItem' onClick={()=>setShow("Users")}>
      <IoAnalyticsSharp />      
      <Text pl={["0px","5px",'15px']} className="lhsName">Campaigns</Text>
      </Flex>
      <Flex id='usersBox' p='10px 17px' className='linkItem' onClick={()=>setShow("influencer")}>
      <GiPostStamp/>
      <Text pl={["0px","5px",'15px']} className="lhsName">Influencers</Text>
      </Flex>
      </Box>
</Box>


{/*     Right hand Side From Here    */}

<Box id='rhsBox' w='84%' ml='16%' h='auto'> 
<Box id='navbarBox'  p='0px 40px'>
<Flex justifyContent='space-between' pt={3} mb={3}>
<Text fontWeight='bold'>Welcome To Dashboard</Text>
</Flex>
</Box>
<Box id='rhsBody' m='30px' p='30px'>

{
show==="Users"?<Admin/>:show==="influencer"?<Influencers/>:show==="client"?<Clients/>:<h1>Fearture Available Soon</h1>
}
</Box>
</Box>
</Flex>
  )
}

export default AdminPanel