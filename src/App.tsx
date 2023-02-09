import React,  { useEffect, useState }  from 'react';
import { StyleSheet} from 'react-native';
import { NativeBaseProvider, Box } from "native-base";

import { connect } from './substrate-lib'
import colors from './config/colors';

export default function App() {
  //const { api } = useSubstrate();
  // console.log(api);
  const [chain, setChain] = useState("");

  useEffect(() => {
    const getChain = async () => {
      const api = await connect();
      const chain = await api.rpc.system.chain();
      setChain(chain.toHuman());
    }
    getChain()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  return (
    <NativeBaseProvider>
      <Box style={styles.container}>Connected to {chain}</Box>
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
