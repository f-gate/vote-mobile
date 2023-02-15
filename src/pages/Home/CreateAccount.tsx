import React, {useState, useEffect}  from 'react';
import { Box, Heading, VStack, Button, Text} from "native-base";
import Lottie from 'lottie-react-native';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
import * as keychain from '../../storage/keychain';
import { KeyringPair } from '@polkadot/keyring/types';

interface HomeProps {
    setStep:  React.Dispatch<React.SetStateAction<number>>;
    chain: string;
}
export default function CreateAccount (props: HomeProps) {
    const [loading, setLoading] = useState(true);
    const [pair, setPair] = useState<KeyringPair>({} as KeyringPair);
    const [mnemonic, setMnemonic] = useState("");
    
    useEffect(() => {
        const createAccount = async () => {
            const mnemonic = mnemonicGenerate(12);
            setMnemonic(mnemonic);

            const keyring = new Keyring({ type: 'sr25519', ss58Format: 2 });
            const pair = keyring.createFromUri(mnemonic);
           
            setLoading(false);
            setPair(pair);
        }
        createAccount()
          // make sure to catch any error
          .catch(console.error);
    }, []);

    const continueToApp = async () => {
        await keychain.storeKeys(props.chain, JSON.stringify(pair));
        props.setStep(3);
    }
  return (
        <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }}>
          {loading ? "Creating your Account" : "Account created" }
        </Heading>
        <Heading mt="1" _dark={{
        color: "warmGray.200"
      }} color="coolGray.600" fontWeight="medium" size="xs">
             {loading ? "It can take a few minutes" : "Store your mnemonic phrase" }
        </Heading>

        <VStack space={3} mt="5">
            { loading &&
                <Lottie source={require('../../assets/loading.json')} autoPlay loop />
            }
            {!loading &&
                <VStack>
                     <Text color="black" fontSize="20" fontWeight="bold">
                        {mnemonic}
                    </Text>
                    <Button mt="2" colorScheme="indigo" onPress={continueToApp}>
                        Continue
                    </Button>
                </VStack>
            }
        </VStack>
        </Box>
  );
}
