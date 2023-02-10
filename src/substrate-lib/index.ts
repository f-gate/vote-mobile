import React from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api'
import * as types from '@polkadot/types';
import * as config from '../config/config';
import { Finished, OnGoing, ReferendumOnGoing, ReferendumFinished , Referendums} from '../types/referendum';


///
// Connecting to the Substrate node
//
const connect = async () => {
  const wsProvider = new WsProvider(config.POLKADOT_WS);
  const api = ApiPromise.create({ provider: wsProvider });
  return api;
}

const getChain = async (api: ApiPromise): Promise<string> => {
  const chain = await api.rpc.system.chain();
  return chain.toHuman();
}

const getReferenda = async (api: ApiPromise): Promise<Referendums> => {
  const referendumsOnGoing: ReferendumOnGoing[] = [];
  const referendumsFinished: ReferendumFinished[] = [];
  const allEntries = await api.query.democracy.referendumInfoOf.entries();
  allEntries.forEach(([{ args: [id] }, referendum]) => {
    const object = JSON.parse(referendum.toString());
    if (object.finished){
      referendumsFinished.push({id: id.toNumber(), info: object.finished as Finished});
    }
    if(object.ongoing){
      referendumsOnGoing.push({id: id.toNumber(), info: object.ongoing as OnGoing});
    }
  });
  return {referendumsOnGoing, referendumsFinished};
}

export {connect, getChain, getReferenda}

