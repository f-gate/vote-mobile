import React,  { useEffect, useState }  from 'react';
import { StyleSheet} from 'react-native';
import { NativeBaseProvider, ScrollView, Center, Heading, VStack } from "native-base";

import { connect, getChain, getReferenda } from './substrate-lib'
import colors from './config/colors';
import { Referendum } from './types/referendum';

export default function App() {
  //const { api } = useSubstrate();
  // console.log(api);
  const [chain, setChain] = useState("");
  const [referendumComponent, setReferendumsComponent] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const getVotes = async () => {
      const api = await connect();
      const chain = await getChain(api);
      setChain(chain);
      const referendums = await getReferenda(api);
      const referendumsComponent = referendums.map((referenda) =>
        <Center py="4" bg={colors.white}>
            {referenda.info}
        </Center>
      );
      setReferendumsComponent(referendumsComponent);
    }
    getVotes()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  return (
    <NativeBaseProvider>
      <Center mt="3" mb="4" style={styles.container}>
        <Heading fontSize="xl">Connected to {chain}</Heading>
      </Center>
      <ScrollView h="80">
      <VStack flex="1">
        {referendumComponent}
      </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
