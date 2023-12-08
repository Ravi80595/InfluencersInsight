import { Box, Flex,Image,Text,Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const InfluencerDetail = ({detail}) => {
    const navigate=useNavigate()

    
const handleDeleteReport = async (reportId) => {
    console.log(reportId)
    try {
        const response = await fetch(`https://unusual-puce-mite.cyclic.app/influencer/${reportId}`, {
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


return(
    <>
    <Flex w={'80%'} m={'auto'} justifyContent={'space-around'}>
        <Box>
            <Image w={'300px'} src='https://careearthtrust.org/wp-content/uploads/2020/06/blank-profile-picture-973460_640.png'/>
        </Box>
        <Box lineHeight={'35px'}>
            <Text fontSize={'30px'}>{detail.name}</Text>
            <Text>Email : {detail.email}</Text>
            <Text>Phone : {detail.phone}</Text>
            <Text>Instagram : {detail.instagram}</Text>
            <Text>Youtube : {detail.youtube}</Text>
            <Text>Feedback : {detail.message}</Text>
            <Flex justifyContent={'space-around'}>
                <Button>Edit</Button>
                <Button onClick={() => handleDeleteReport(detail._id)}>Delete</Button>
            </Flex>
        </Box>
    </Flex>
    </>
  )
}

export default InfluencerDetail