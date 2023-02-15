import React, {useState, useEffect}  from 'react';
import { Box, Heading, VStack, Button } from "native-base";

interface HomeProps {
    setStep:  React.Dispatch<React.SetStateAction<number>>;
}
export default function Welcome (props: HomeProps) {
  return (
        <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
          You need an account in order to vote
        </Heading>

        <VStack space={3} mt="5">
            <Button mt="2" colorScheme="indigo" onPress={() => props.setStep(1)}>
                Create an Account
            </Button>
            <Button mt="2" colorScheme="indigo" onPress={() => props.setStep(2)}>
                Import an Account
          </Button>
        </VStack>
        </Box>
  );
}
