import { Box, Flex, Text } from '@chakra-ui/layout'
import React from 'react'
// import UpscallerLogo from '../../Assets/Images/UpscallerLogo.jpg'
import { Image } from '@chakra-ui/image'
import { FaFacebook } from "react-icons/fa";
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';



const Footer = () => {



return(
    <Box pt={'40px'} background={'black'} color={'white'} pb={'10px'}> 
    <Flex justifyContent={'space-around'} w='90%' m={'auto'} pb={'20px'}>
        <Box w={'24%'}>
            <Image w={'150px'} src={''}/>
            <Text lineHeight={'2rem'}>Empowering companies to become more organised, compliant and enterprise ready</Text>
            <Flex w={'50%'} pt={'15px'} fontSize={'24px'} justifyContent={'space-around'}>
            <FaFacebook />
            <FaFacebook />
            <FaFacebook />
            <FaFacebook />
            </Flex>
        </Box>
        <Box lineHeight={'2rem'}>
            <Text fontWeight={'600'} pb={'10px'} fontSize={'20px'}>Important Links</Text>
            <Text>Home</Text>
            <Text>About us</Text>
            <Text>Services</Text>
            <Text>Contact us</Text>
        </Box>
        <Box lineHeight={'2rem'}  >
            <Text fontWeight={'600'} pb={'10px'} fontSize={'20px'}>Contact Us</Text>
            <Text>A-713 GDITL North-x Tower</Text>
            <Text>Netaji Subhash Place Delhi 110036</Text>
            <Text>+91 9306454204</Text>
        </Box>
        <Box w={'24%'}>
            <Text fontWeight={'600'} pb={'10px'} fontSize={'20px'}>Subscribe</Text>
            <Input borderRadius={'10px'} p={'10px'} placeholder='Enter email'/>
            <Button mt={'7px'}> Submit</Button>
            <Text pt={'10px'}>Subscribe for trends and tips! Get fresh insights and success strategies.</Text>
        </Box>
    </Flex>
    <hr />
    </Box>
  )
}

export default Footer