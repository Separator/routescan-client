import { config } from 'dotenv';

import { BlockExplorerCommon, BlockExplorerTag, Chain } from '../src';

config();

const TEST_TIMEOUT = 60000;
const { WALLET = '', ROUTESCAN_API_KEY, CONTRACT = '', TOKEN_ADDRESS = '' } = process.env;
const blockExplorer = BlockExplorerCommon.build({ chain: Chain.AvalancheCChainFuji, apiKey: ROUTESCAN_API_KEY! });

describe('Check functions from Accounts block', () => {
  test(
    'Get ether balance for a single address',
    async () => {
      const balance = await blockExplorer.getAccountBalance({ address: WALLET, tag: BlockExplorerTag.Latest });
      expect(balance).toBe(100_000_000_000_000_000n);
    },
    TEST_TIMEOUT
  );

  test(
    'Get ether balance for multiple addresses in a single call',
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
    "Get a list of 'normal' transactions by address",
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
    "Get a list of 'internal' transactions by address",
    async () => {
      const txs = await blockExplorer.getInternalTxListByAddress({
        address: CONTRACT,
        startblock: 30383613,
        endblock: 30383613
      });
      expect(txs.length).toBe(1);
    },
    TEST_TIMEOUT
  );

  test("Get 'Internal Transactions' by Transaction Hash", async () => {
    const txs = await blockExplorer.getInternalTxListByTxHash({
      txhash: '0x1a63740bae28ec284f1dd78f86faec72462871d25926a31ea74a498090670e83'
    });
    expect(txs.length).toBe(1);
  });

  test(`Get a list of 'ERC20 - token transfer events' by address`, async () => {
    const transferEvents = await blockExplorer.getErc20TokenTransferEventsList({
      address: WALLET,
      contractaddress: TOKEN_ADDRESS,
      startblock: 31131459,
      endblock: 31131459
    });
    expect(transferEvents.length).toBe(1);
  });
});
