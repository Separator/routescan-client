import { config } from 'dotenv';

import { BlockExplorerCommon, BlockExplorerTag, Chain } from '../../src';

config();

const { WALLET, ROUTESCAN_API_KEY } = process.env;

test('Get Ether Balance for Multiple Addresses in a Single Call (Ethereum network)', async () => {
  const blockExplorer = BlockExplorerCommon.build({ chain: Chain.Ethereum, apiKey: ROUTESCAN_API_KEY });
  const balances = await blockExplorer.getAccountsBalances({ address: WALLET!, tag: BlockExplorerTag.Latest });
  expect(balances[0].balance).toBe(1_000_000_000_000_000n);
});
