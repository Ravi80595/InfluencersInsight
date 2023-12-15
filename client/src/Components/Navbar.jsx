import { Box,Flex,Image,Heading,Button,Text} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {



return (
    <>
    <Box w="100%" boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' position='fixed' backgroundColor="white">
    <Flex justifyContent='space-between' w='100%' h={20}>
      <Flex  w={["40%","40%",'50%']} p={5} gap={'30px'}>
        <Image display={["none","none","block"]} src="https://www.laudco.com/wp-content/uploads/2021/10/cropped-NkqJmjVfVYE9cegFgw0V-2.png"/>
        {/* <Heading fontFamily='cursive' fontSize={["20px","10px","30px"]}>Socialpshcyo</Heading> */}
      </Flex>
      <Flex w={["70%","40%",'30%']} p={5} justifyContent="space-evenly" fontSize='10px'>
        {/* <Button display={["none","none","block"]} onClick={()=>alert("Please Signup to create Account")}>Create Account</Button> */}
        <Link to='/login'>
        <Text>Home</Text>
        <Text>About</Text>
        <Text>Login</Text>
        </Link>
      </Flex>
    </Flex>
    </Box>
    </>
  )
}

export default Navbar