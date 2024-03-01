import { config } from 'dotenv';

import { BlockExplorerCommon, BlockExplorerTag, Chain } from '../../src';

config();

const { WALLET, ROUTESCAN_API_KEY } = process.env;

test('Get Ether Balance for a Single Address (Ethereum network)', async () => {
  const blockExplorer = BlockExplorerCommon.build({ chain: Chain.Ethereum, apiKey: ROUTESCAN_API_KEY });
  const balance = await blockExplorer.getAccountBalance({ address: WALLET!, tag: BlockExplorerTag.Latest });
  expect(balance).toBe(1_000_000_000_000_000n);
});
