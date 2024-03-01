import { config } from 'dotenv';

import { BlockExplorerCommon, Chain } from '../../src';

config();

const { WALLET, ROUTESCAN_API_KEY } = process.env;

test('Get Ether Balance for a Single Address (Ethereum network)', async () => {
  const blockExplorer = BlockExplorerCommon.build({ chain: Chain.Ethereum, apiKey: ROUTESCAN_API_KEY });
  const txs = await blockExplorer.GetNormalTxListByAddress({
    address: WALLET!
  });
  expect(txs.length).toBe(1);
});
