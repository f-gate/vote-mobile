import React,  { useEffect, useState }  from 'react';
import { StyleSheet} from 'react-native';
import { Text, Box, Stack, Heading, HStack } from "native-base";
import { ReferendumOnGoing } from '../types/referendum';
import colors from '../config/colors';

interface ReferendaProps {
    referendum: ReferendumOnGoing;
}
export default function ReferendaOngoing(props: ReferendaProps) {
  console.log(JSON.stringify(props.referendum));
  return (
    <Box alignItems="center">
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Referendum: {props.referendum.id}
            </Heading>
            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              {props.referendum.info.proposal.lookup.hash}
            </Text>
          </Stack>
            <Stack alignItems="center">
            <Heading size="xs" ml="-1">
              Voting Status - {props.referendum.info.threshold}
            </Heading>
            <Text fontWeight="400">
              Turnout: {props.referendum.info.tally.turnout}
            </Text>
            <Text fontWeight="400">
              Aye: {props.referendum.info.tally.ayes}
            </Text>
            <Text fontWeight="400">
              Nay: {props.referendum.info.tally.nays}
            </Text>
            </Stack>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="flex-start">
              <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="100">
                End: {props.referendum.info.end}
              </Text>
            </HStack>
            <HStack alignItems="flex-end">
              <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="100">
                Delay: {props.referendum.info.delay}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lime,
    margin: '2%'
  },
});
