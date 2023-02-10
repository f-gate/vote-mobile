import React from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api'
import * as config from '../config/config';
import { Referendum } from '../types/referendum';


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

const getReferenda = async (api: ApiPromise): Promise<Referendum[]> => {
  const referendums: Referendum[] = [];
  const allEntries = await api.query.democracy.referendumInfoOf.entries();
  allEntries.forEach(([{ args: [id] }, referendum]) => {
        referendums.push({id: id.toHuman(), info: JSON.stringify(referendum.toHuman())} as Referendum)
  });
  return referendums;
}

export {connect, getChain, getReferenda}

