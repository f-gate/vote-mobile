import React from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api'
import * as config from '../config/config';


///
// Connecting to the Substrate node
//
export const connect = async () => {
  const wsProvider = new WsProvider(config.POLKADOT_WS);
  const api = ApiPromise.create({ provider: wsProvider });
  return api;
}

