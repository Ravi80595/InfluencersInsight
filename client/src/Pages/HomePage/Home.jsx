import React from 'react'
import Navbar from '../../Components/Navbar'
import { Box, Image,Flex,Button,Text } from '@chakra-ui/react'
import Homes from '../../Images/Homes.png'
import { Link } from 'react-router-dom'

const Home = () => {



return (
    <>
     <Box w="100%" boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' backgroundColor="white" position={'fixed'} zIndex={999999}>
    <Flex justifyContent='space-between' w='100%' h={20}>
      <Flex  w={["40%","40%",'50%']} p={5} gap={'30px'}>
        <Image display={["none","none","block"]} src="https://www.laudco.com/wp-content/uploads/2021/10/cropped-NkqJmjVfVYE9cegFgw0V-2.png"/>
        {/* <Heading fontFamily='cursive' fontSize={["20px","10px","30px"]}>Socialpshcyo</Heading> */}
      </Flex>
      <Flex w={["70%","40%",'30%']} p={5} justifyContent="space-evenly" fontSize='10px'>
        {/* <Button display={["none","none","block"]} onClick={()=>alert("Please Signup to create Account")}>Create Account</Button> */}
        <Link to='/login'>
        <Button>Login</Button>
        </Link>
      </Flex>
    </Flex>
    </Box>
    <Box pt={'50px'}> 
    <Image w={'100%'} src={Homes}/>
    </Box>
    <Box mt={'50px'}>
      <Flex>
        <Box mt={'40px'} p={'50px'}>
          <Text fontSize='30px'>
          Powerful tools to find, connect, and collaborate
          </Text>
        </Box>
        <Flex justifyContent={'center'}>
          <Image w={'70%'} src='https://d1ks0pavw8unez.cloudfront.net/p/images/powerful-tools/creators-outreach.png'/>  
        </Flex> 
      </Flex>
    </Box>
    </>
  )
}

export default Home