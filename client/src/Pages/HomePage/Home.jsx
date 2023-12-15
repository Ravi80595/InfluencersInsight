import React from 'react'
import Navbar from '../../Components/Navbar'
import { Box, Image,Flex,Button,Text } from '@chakra-ui/react'
import Homes from '../../Images/Homes.png'
import { Link } from 'react-router-dom'

const Home = () => {


  const containerStyle = {
    position: 'relative',
    backgroundImage: 'url("https://sandpipercomms.com/wp-content/uploads/2021/08/shutterstock_1932042689-scaled.jpg")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '80vh',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the last value for the overlay opacity
  };


return (
    <>
     <Box w="100%" boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' backgroundColor="white" position={'fixed'} zIndex={999999}>
    <Flex justifyContent='space-between' w='100%' h={20}>
      <Flex  w={["40%","40%",'50%']} p={5} gap={'30px'}>
        <Image display={["none","none","block"]} src="https://www.laudco.com/wp-content/uploads/2021/10/cropped-NkqJmjVfVYE9cegFgw0V-2.png"/>
        {/* <Heading fontFamily='cursive' fontSize={["20px","10px","30px"]}>Socialpshcyo</Heading> */}
      </Flex>
      <Flex w={["70%","40%",'30%']} p={5} justifyContent="space-evenly" fontSize='20px' fontWeight={'500'}>
        {/* <Button display={["none","none","block"]} onClick={()=>alert("Please Signup to create Account")}>Create Account</Button> */}
        <Text>Home</Text>
        <Text>About</Text>
        <Link to='/login'>
        <Text>Login</Text>
        </Link>
      </Flex>
    </Flex>
    </Box>




    <Box pt={'50px'}> 
    <Flex h={'100vh'} justifyContent={'space-around'} bgRepeat={'no-repeat'} bgSize={'cover'} backgroundImage={Homes} >
      <Box w={'50%'}>
        {/* <Image src={Homes}/> */}
      </Box>
      {/* <Box mt={'90px'} w={'40%'} color={'white'} >
        <Text fontSize={'42px'} mt={'54px'} fontWeight={'600'}>Where Influencers <br/> Collaboration Happen</Text>
        <Text fontSize={'25px'} mt={'10px'}>Qoruz helps brands to find, connect and collaborate with the most relevant influencers.</Text>
        <Flex mt={'25px'} mb={'50px'} gap={'20px'}>
        <Button fontSize={'16px'} fontWeight={'500'} pt={'12px'} pb={'12px'} color={'#181A20'} backgroundColor={'#FCD535'}>Know More</Button>
        <Button fontSize={'16px'} fontWeight={'500'} pt={'12px'} pb={'12px'} color={'#181A20'} backgroundColor={'#FCD535'}>Login</Button>
        </Flex>
      </Box> */}
    </Flex>

 {/* <Flex style={containerStyle} justifyContent={'space-around'}> */}
      {/* Background Image Overlay */}
      {/* <div style={overlayStyle}></div> */}

      {/* Your content goes here */}
      {/* <Box w={'50%'}></Box>
      <Box mt={'90px'} w={'40%'} color={'white'}>
        <Text fontSize={'42px'} mt={'54px'} fontWeight={'600'} color={'white'}>   
          Where Influencers <br /> Collaboration Happen
        </Text>
        <Text fontSize={'25px'} mt={'10px'}>
          Qoruz helps brands to find, connect and collaborate with the most relevant influencers.
        </Text>
        <Flex mt={'25px'} mb={'50px'} gap={'20px'}>
          <Button fontSize={'16px'} fontWeight={'500'} pt={'12px'} pb={'12px'} color={'#181A20'} backgroundColor={'#FCD535'}>
            Know More
          </Button>
          <Button fontSize={'16px'} fontWeight={'500'} pt={'12px'} pb={'12px'} color={'#181A20'} backgroundColor={'#FCD535'}>
            Login
          </Button>
        </Flex>
      </Box>
    </Flex> */}



    </Box>
    <Box mt={'50px'}>
      <Flex w={'80%'} m={'auto'}>
        <Box mt={'40px'} p={'50px'}>
          <Text fontSize='38px' fontWeight={'700'}>
          Powerful tools to find, connect, and collaborate
          </Text>
          <Flex gap={'30px'} mt={'50px'}>
            <Flex>
            <Image src='https://d1ks0pavw8unez.cloudfront.net/p/images/powerful-tools/creator-search.svg'/>
            </Flex>
            <Box>
              <Text fontWeight={'600'} fontSize={'27px'}>Influencer Search</Text>
              <Text>Find your perfect influencers in minutes.</Text>
            </Box>
          </Flex>
          <Flex gap={'30px'} mt={'20px'}>
            <Flex>
            <Image src='https://d1ks0pavw8unez.cloudfront.net/p/images/powerful-tools/creator-search.svg'/>
            </Flex>
            <Box>
              <Text fontWeight={'600'} fontSize={'27px'}>Influencer Search</Text>
              <Text>Find your perfect influencers in minutes.</Text>
            </Box>
          </Flex>
          <Flex gap={'30px'} mt={'20px'}>
            <Flex>
            <Image src='https://d1ks0pavw8unez.cloudfront.net/p/images/powerful-tools/creator-search.svg'/>
            </Flex>
            <Box>
              <Text fontWeight={'600'} fontSize={'27px'}>Influencer Search</Text>
              <Text>Find your perfect influencers in minutes.</Text>
            </Box>
          </Flex>
        </Box>
        <Flex justifyContent={'center'} mt={'40px'}>
          <Image w={'70%'} src='https://d1ks0pavw8unez.cloudfront.net/p/images/powerful-tools/creators-outreach.png'/>  
        </Flex> 
      </Flex>
    </Box>
    </>
  )
}

export default Home