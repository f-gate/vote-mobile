import React, {useState, useEffect}  from 'react';
import { Box, Heading, VStack, Button, Text, Input} from "native-base";
import Lottie from 'lottie-react-native';
import { Keyring } from '@polkadot/keyring';
import * as keychain from '../../storage/keychain';
import { KeyringPair } from '@polkadot/keyring/types';

interface HomeProps {
    setStep:  React.Dispatch<React.SetStateAction<number>>;
    chain: string;
}
export default function ImportAccount (props: HomeProps) {
    const [loading, setLoading] = useState(false);
    const [imported, setImported] = useState(false);
    const [mnemonic, setMnemonic] = useState("");
    const [error, setError] = useState("");
    const [pair, setPair] = useState<KeyringPair>({} as KeyringPair);
    
    const createAccount = async () => {
      setLoading(true);
      try {
        const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
        const pair = keyring.createFromUri(mnemonic);
        setPair(pair);
        setLoading(false);
        setImported(true);
      }
      catch(error){
        setError("Error with the mnemonic word");
        setLoading(false);
      }

  }
    const continueToApp = async () => {
        await keychain.storeKeys(props.chain, JSON.stringify(pair));
        props.setStep(3);
    }
  return (
        <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          Import your Account
        </Heading>

        <VStack space={3} mt="5">
            { loading &&
                <Lottie source={require('../../assets/loading.json')} autoPlay loop />
            }
            {(!loading && imported) &&
                <VStack>
                     <Text color="black" fontSize="20" fontWeight="bold">
                        Account created: {pair.address}
                    </Text>
                    <Button mt="2" colorScheme="indigo" onPress={continueToApp}>
                        Continue
                    </Button>
                </VStack>
            }
            {(!loading && !imported) &&
                <VStack>
                     <Text color="black" fontSize="20" fontWeight="bold">
                        {error ? error : "Add your Mnemonic phrase"}
                     </Text>
                    <Box alignItems="center">
                      <Input size="2xl" placeholder="2xl Input" 
                        onChangeText={(text)=> setMnemonic(text)}/>
                      <Button mt="2" colorScheme="indigo" onPress={createAccount}>
                        Continue
                      </Button>
                    </Box>

                </VStack>
            }
        </VStack>
        </Box>
  );
}
