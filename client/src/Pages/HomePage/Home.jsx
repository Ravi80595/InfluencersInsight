import React from 'react'
import Navbar from '../../Components/Navbar'
import { Box, Image,Flex,Button,Text } from '@chakra-ui/react'
import Homes from '../../Images/Homes.png'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };


return (
    <>
     <Box w="100%" boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' backgroundColor="white" position={'fixed'} zIndex={999999}>
    <Flex justifyContent='space-between' w='100%' h={20}>
      <Flex  w={["40%","40%",'50%']} p={5} gap={'30px'}>
        <Image display={["none","none","block"]} src="https://www.laudco.com/wp-content/uploads/2021/10/cropped-NkqJmjVfVYE9cegFgw0V-2.png"/>
      </Flex>
      <Flex w={["70%","40%",'30%']} p={5} justifyContent="space-evenly" fontSize='20px' fontWeight={'500'}>
        <Text>Home</Text>
        <Text>About</Text>
        <Link to='/login'>
        <Text>Login</Text>
        </Link>
      </Flex>
    </Flex>
    </Box>




    <Box pt={'90px'} backgroundColor={'black'} h={'90vh'}> 
 <Flex justifyContent={'space-around'}>
      <Box w={'50%'} mt={'10px'} backgroundImage={Homes} backgroundSize={'cover'} backgroundPosition={'center'} backgroundRepeat={'no-repeat'}>

      </Box>
      <Box mt={'90px'} w={'40%'} color={'white'}>
        <Text fontSize={'42px'} mt={'54px'} fontWeight={'600'} color={'white'}>   
        Influencer Marketing, Collabs, Insights, & More
        </Text>
        <Text fontSize={'25px'} mt={'10px'}>
        Effortless Performance Tracking:
        Monitor and optimize campaigns seamlessly.        
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
    </Flex>



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



    <Box p={4} w='80%' m='auto' mt={'10px'} mb={'30px'}>
      <Text mb={'75px'} mt={'50px'} textAlign={'center'} fontSize={'26px'}>Choose What Describes You Best</Text>
    <Flex direction={['column','column','row','row']} gap={20} justifyContent={'space-around'}>
      <Box _hover={{transform:'translateY(-15px)',transition:'transform 0.5s'}} background={'white'} borderRadius={10} border={'2px solid grey'} p='15px'>
         <Image src={'https://www.laudco.com/wp-content/uploads/elementor/thumbs/chat-pesjux0tqn62pjldifk87lymo9yznytqanritam6oo.png'}/>
      <Text pb={2} fontWeight={600} fontSize={'24px'} pt={'25px'}>For Influencers</Text>
        <li>Unlimited Campaign Opportunities</li>
        <li>Work with Multiple Brands</li>
        <li>Earn What You Deserve</li>
    </Box>
    <Box _hover={{transform:'translateY(-15px)',transition:'transform 0.5s'}} background={'white'} borderRadius={10} border={'2px solid grey'} p='15px'>
         <Image src={'https://www.laudco.com/wp-content/uploads/elementor/thumbs/target-2-peskhh5dri1tcmtps6lw1x0vx6s4egdtebf1gd61co.png'}/>
      <Text pb={2} fontWeight={600} fontSize={'24px'} pt={'25px'}>For Businesses</Text>
        <li>Engage with UNLIMITED Influencers</li>
        <li>EAuthentic Influencer Insights</li>
        <li>Generate REAL-TIME Campaign Analytics</li>
    </Box>
    <Box _hover={{transform:'translateY(-15px)',transition:'transform 0.5s'}} background={'white'} borderRadius={10} border={'2px solid grey'} p='15px'>
         <Image src={'https://www.laudco.com/wp-content/uploads/elementor/thumbs/transparency-peskblnp1s0asdcx356tywe69hqjak27l8msh3vm8o.png'}/>
         
      <Text pb={2} fontWeight={600} fontSize={'24px'} pt={'25px'}>For Agency</Text>
        <li>Streamlined Influencer Marketing Tool</li>
        <li>Comprehensive Collaboration</li>
        <li>Enhanced Reporting and Analytics</li>
    </Box>
    </Flex>
    </Box>
      <Footer/>
    </>
  )
}

export default Home