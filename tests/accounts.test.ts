import { config } from 'dotenv';

import { BlockExplorerCommon, BlockExplorerTag, Chain } from '../src';

config();

const TEST_TIMEOUT = 60000;
const { WALLET = '', ROUTESCAN_API_KEY, CONTRACT = '' } = process.env;
const blockExplorer = BlockExplorerCommon.build({ chain: Chain.AvalancheCChainFuji, apiKey: ROUTESCAN_API_KEY! });

describe('Check functions from Accounts block', () => {
  test(
    'Get Ether Balance for a Single Address',
    async () => {
      const balance = await blockExplorer.getAccountBalance({ address: WALLET, tag: BlockExplorerTag.Latest });
      expect(balance).toBe(100_000_000_000_000_000n);
    },
    TEST_TIMEOUT
  );

  test(
    'Get Ether Balance for Multiple Addresses in a Single Call',
    async () => {
      const balances = await blockExplorer.getAccountsBalances({ address: WALLET, tag: BlockExplorerTag.Latest });
      expect(balances).toEqual([
        {
          account: WALLET,
          balance: 100_000_000_000_000_000n
        }
      ]);
    },
    TEST_TIMEOUT
  );

  test(
    "Get a list of 'Normal' Transactions By Address",
    async () => {
      const txs = await blockExplorer.getNormalTxListByAddress({
        address: WALLET,
        startblock: 30471342,
        endblock: 30471342
      });
      expect(txs.length).toBe(1);
    },
    TEST_TIMEOUT
  );

  test(
    "Get a list of 'Internal' Transactions by Address",
    async () => {
      const txs = await blockExplorer.getInternalTxListByAddress({
        address: CONTRACT,
        startblock: 30383613,
        endblock: 30383613
      });
      console.log(txs);
      expect(txs.length).toBe(1);
    },
    TEST_TIMEOUT
  );
});
