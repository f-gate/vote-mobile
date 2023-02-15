import React, {useState, useEffect}  from 'react';
import { StyleSheet} from 'react-native';
import { Center, Box, Heading, VStack, Button } from "native-base";
import * as keychain from '../storage/keychain';
import Welcome from './Home/Welcome';
import CreateAccount from './Home/CreateAccount';
import ImportAccount from './Home/ImportAccount';
import MyVotes from './Home/MyVotes';

interface HomeProps {
    chain: string;
}

interface HomeProps {
  chain: string;
}
export default function Home (props: HomeProps) {
    //Different steps (create keys page, creating keys, importing keys, keys created)
    const [step, setStep] = useState(0);
    const [address, setAddress] = useState("");

    useEffect(() => {
        const hasKeys = async () => {
          const hasKeys = await keychain.hasKeys(props.chain);
          if(hasKeys) {
            const address =  await keychain.getAddress(props.chain);
            setAddress(address);
            setStep(3);
          }
        }
        hasKeys()
          // make sure to catch any error
          .catch(console.error);
      }, [])

    const Screen = () => {
        if (step == 1) {
            return <CreateAccount setStep={setStep} chain={props.chain}/>
        }
        if (step == 2) {
            return <ImportAccount setStep={setStep} chain={props.chain}/>
        }
        if (step == 3) {
            return <MyVotes  address={address}/>
        }
        return  <Welcome setStep={setStep} />;
      }

  return (
    <Center w="100%">
        <Screen />
    </Center>
  );
}
