import React,  { useEffect, useState }  from 'react';
import { StyleSheet} from 'react-native';
import { Box, Text, Avatar, HStack, VStack, Spacer, Divider } from "native-base";
import { ReferendumFinished } from '../types/referendum';
import colors from '../config/colors';
import HistoryReferendum from 'src/pages/HistoryReferendum';

interface ReferendaProps {
    referendum: ReferendumFinished;
}
export default function ReferendaFinished(props: ReferendaProps) {

  return (
    <Box pl="4" pr="5" py="2" style={{backgroundColor: props.referendum.info.approved ? colors.green : colors.red}}>
          <HStack alignItems="center" space={5}>
            <VStack>
              <Text color="coolGray.800" _dark={{
              color: 'warmGray.50'
            }} bold>
                ID del referendum: {props.referendum.id}
              </Text>
              <Text color="coolGray.600" _dark={{
              color: 'warmGray.200'
            }}>
                End in {props.referendum.info.end}
              </Text>
            </VStack>
            <Spacer />
            <Text fontSize="xs" color="coolGray.800" _dark={{
            color: 'warmGray.50'
          }} alignSelf="flex-end">
              {props.referendum.info.approved ? "Approved" : "Rejected"}
            </Text>
          </HStack>
          <Divider />
        </Box>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lime,
    margin: '2%'
  },
});
