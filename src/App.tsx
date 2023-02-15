import "@polkadot/api-augment";
import React,  { useEffect, useState }  from 'react';
import { NativeBaseProvider } from "native-base";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect, getChain, getReferenda } from './substrate-lib'
import colors from './config/colors';
import ReferendaOnGoing from './components/ReferendaOngoing';
import ReferendaFinished from './components/ReferendaFinished';
import Header from './components/Header';
import OnGoingReferendum from './pages/OnGoingReferendum';
import HistoryReferendum from './pages/HistoryReferendum';
import Home from "./pages/Home";

export default function App() {
  //const { api } = useSubstrate();
  // console.log(api);
  const [chain, setChain] = useState("");
  const [referendumOnGoingComponent, setReferendumsOngoingComponent] = useState<JSX.Element[]>([]);
  const [referendumFinishedComponent, setReferendumsFinishedComponent] = useState<JSX.Element[]>([]);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'firstTab', title: 'Home' },
    { key: 'secondTab', title: 'Vote' },
    { key: 'thirdTab', title: 'History' },
  ]);


  useEffect(() => {
    const getVotes = async () => {
      const api = await connect();
      const chain = await getChain(api);
      setChain(chain);
      const referendums = await getReferenda(api);
      const referendumOnGoingComponent = referendums.referendumsOnGoing.map((referenda) =>
        <ReferendaOnGoing referendum={referenda}/>
      );
      setReferendumsOngoingComponent(referendumOnGoingComponent);
      const referendumFinishedComponent = referendums.referendumsFinished.map((referenda) =>
        <ReferendaFinished referendum={referenda}/>
      );
      setReferendumsFinishedComponent(referendumFinishedComponent);
    }
    getVotes()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.primary }}
      style={{ backgroundColor: colors.primary }}
    />
  );

  return (
    <NativeBaseProvider>
        <Header chain={chain} />
        <TabView
          navigationState={{ index, routes }}
          renderScene={SceneMap({
            firstTab: () => <Home chain={chain}/>,
            secondTab: () => <OnGoingReferendum referendumComponent={referendumOnGoingComponent} />,
            thirdTab: () => <HistoryReferendum referendumComponent={referendumFinishedComponent} />,
          })}
          onIndexChange={setIndex}
          tabBarPosition={'bottom'}
          renderTabBar={renderTabBar}
        />
    </NativeBaseProvider>
    
  );
}
