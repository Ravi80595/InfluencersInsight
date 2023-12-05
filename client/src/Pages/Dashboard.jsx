import React, { useEffect } from 'react'
import "../CSS/Dashboard.css"
import { Flex,Box,Text,Menu,MenuButton,MenuGroup,MenuDivider,MenuList,MenuItem,Avatar} from '@chakra-ui/react'
import { useState } from 'react'
import {GiPostStamp} from "react-icons/gi"
import axios from 'axios'
import Reports from './Reports'
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineAccessTime } from "react-icons/md";



const Dashboard = () => {
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
<Flex w='100%'>
    <Box id='lhsBox' backgroundColor={'#777'} fontSize={[12,15,20]} w={["5%","5%","10%","16%"]} h='100vh' p={["0px","0px",'20px']}>
    <Text textAlign={"center"} mb={5} >Laudco Media</Text>
      <Box id='linkBox' marginTop={'40px'}>
      <Text display={["none","none","none","block"]}>Client Facing</Text>
      <hr />
      <Flex id='usersBox' p='10px 17px' className='linkItem' onClick={()=>setShow("Admins")}>
      <MdOutlineAccessTime />
      <Text pl={["0px","5px",'15px']} className="lhsName">Publish Time</Text>
      </Flex>
      <Flex id='usersBox' p='10px 17px' className='linkItem' onClick={()=>setShow("Users")}>
      <IoAnalyticsSharp />      
      <Text pl={["0px","5px",'15px']} className="lhsName">Reports</Text>
      </Flex>
      <Flex id='usersBox' p='10px 17px' className='linkItem' onClick={()=>setShow("Posts")}>
      <GiPostStamp/>
      <Text pl={["0px","5px",'15px']} className="lhsName">Industry</Text>
      </Flex>
      {/* <hr /> */}
      {/* <Text display={["none","none","none","block"]}>Managment</Text>
      <Flex id='usersBox' p='10px 17px' className='linkItem' onClick={()=>setShow('teams')}>
      <BsTagsFill />  
      <Text pl={["0px","5px",'15px']} className="lhsName">Manage Team</Text>
      </Flex>
      <Flex id='usersBox' p='10px 17px' className='linkItem' onClick={()=>setShow(3)}>
      <FaRupeeSign/>  
      <Text pl={["0px","5px",'15px']} className="lhsName">BlackList</Text>
      </Flex>
      <Flex id='usersBox' p='10px 17px' className='linkItem' onClick={()=>setShow('feedback')}>
      <CiDiscount1/>
      <Text pl={["0px","5px",'15px']} className="lhsName" >Feedbacks</Text>
      </Flex>
      <Text display={["none","none","none","block"]}>Charts</Text>
      <Flex id='usersBox' p='10px 17px' className='linkItem' onClick={()=>setShow(3)}>
      <FaRupeeSign/>  
      <Text pl={["0px","5px",'15px']} className="lhsName">Bar Charts</Text>
      </Flex> */}
      </Box>
</Box>


{/*     Right hand Side From Here    */}

<Box id='rhsBox' w='84%' ml='16%' h='auto'> 
<Box id='navbarBox'  p='0px 40px'>
<Flex justifyContent='space-between' pt={3} mb={3}>
<Text fontWeight='bold'>Welcome To Dashboard</Text>
<Menu fontSize="20px">
            <MenuButton>
        {
        profileData && profileData.map(ele=>(
          <Avatar src={ele.userPicturePath}/>
                // <Image w={50} h="40px" src= borderRadius={50}/>
            ))
          }
            </MenuButton>
            <MenuList>
              <MenuGroup title='Profile'>
                {/* <Link to="/adminProfile"> */}
                <MenuItem>My Account</MenuItem>
                {/* </Link> */}
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title='Manage'>
                {/* <Link to="/adminSetting"> */}
                <MenuItem>Setting & Privacy</MenuItem>
                {/* </Link> */}
                <MenuItem>Language</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
</Flex>
</Box>
<Box id='rhsBody' m='30px' p='30px'>

{
show==="Users"?<Reports/>:<h1>Fearture Available Soon</h1>
}
</Box>
</Box>
</Flex>
  )
}

export default Dashboard