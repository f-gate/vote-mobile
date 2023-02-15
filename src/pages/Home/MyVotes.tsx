import React, {useEffect} from 'react';
import { Box, Heading, VStack, Text } from "native-base";
import { connect } from '../../substrate-lib'

interface HomeProps {
  address: string;
}
export default function MyVotes (props: HomeProps) {

  useEffect(() => {
    const getMyVotes = async () => {
       const api = await connect();
       const votes = await api.query.democracy.votingOf(props.address);
       console.log(votes);
    }
    getMyVotes()
      // make sure to catch any error
      .catch(console.error);
}, []);
  return (
        <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          My Votes
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
         See the list of your current votes
        </Heading>

        <VStack space={3} mt="5">
            <Text fontWeight="400">
              My Address: {props.address}
            </Text>
            {/* <Button mt="2" colorScheme="indigo" onPress={() => props.setStep(2)}>
                Import an Account
          </Button>  */}
        </VStack>
        </Box>
  );
}
