import React  from 'react';
import { StyleSheet} from 'react-native';
import { ScrollView, VStack } from "native-base";
import colors from '../config/colors';

interface OnGoingReferendumProps {
    referendumComponent: JSX.Element[];
}
export default function OnGoingReferendum(props: OnGoingReferendumProps) {

  return (
    <ScrollView h="80" flex="1">
        {props.referendumComponent}
    </ScrollView>
  );
}
