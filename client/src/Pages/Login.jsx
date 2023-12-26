import { Box,Flex,FormControl,Input,Button,FormLabel,Image,Text, Heading, color,InputGroup,InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Logins from '../Images/Logins.png'
import { baseUrl } from '../Components/BaseUrl'

const Login = () => {
  const navigate=useNavigate()
  const [show,setShow]=useState(false)
  const [values,setValues]=useState({
    email:"",
    password:"",
  })


  const handleClick = () => setShow(!show);

  const handleChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }




  const handleLogin = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const token = data.token;
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        console.error('Login failed');
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

return (
  <>
    <Box m="auto">
        <Flex>
            <Box w={'50%'} p={'70px'} h={'100vh'} display={["none","none","block"]} color={'white'} background={'#272939'}>
              <Heading mb={'20px'}>Your Go-To Hub for Influencer Insights</Heading>
              <Text fontSize={'20px'}>Step into the world of (X), where the most innovative and iconic brands empower their marketing strategies through the magic of creators. Our platform is the engine driving impactful creator marketing, offering advanced cutting-edge data, industry-leading analytics, and customizable metrics to suit your brand needs.</Text>
                <Image mt={'40px'} h="400px" src={Logins}/>
            </Box>
            <Box p={5} w={'50%'} pt={'70px'} textAlign={'center'}>
              <Flex justifyContent={'center'}>
              <Image w={'30%'} src='https://www.laudco.com/wp-content/uploads/2021/10/cropped-NkqJmjVfVYE9cegFgw0V-2.png'/>
              </Flex>
              <Text pt={'10px'} pb={'80px'}>Sign in to your account</Text>
            <FormControl isRequired w={'50%'} m={'auto'}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder='Enter email' name='email' onChange={handleChange}/>
                    <FormLabel pt={'10px'}>Password</FormLabel>
                   <InputGroup size="md">
                        <Input
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                          placeholder="Enter password"
                          name="password"
                          onChange={handleChange}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                   </InputGroup>
                    <Button mt={4} width="100%" onClick={handleLogin}>Login</Button>
            </FormControl>
            </Box>
        </Flex>
    </Box>
  </>
  )
}

export default Login
