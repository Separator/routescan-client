import { config } from 'dotenv';

import { BlockExplorerCommon, BlockExplorerTag, Chain } from '../src';

config();

const { WALLET = '', ROUTESCAN_API_KEY } = process.env;
const blockExplorer = BlockExplorerCommon.build({ chain: Chain.AvalancheCChainFuji, apiKey: ROUTESCAN_API_KEY });

describe('Check functions from Accounts block', () => {
  test('Get Ether Balance for a Single Address', async () => {
    const balance = await blockExplorer.getAccountBalance({ address: WALLET, tag: BlockExplorerTag.Latest });
    expect(balance).toBe(100_000_000_000_000_000n);
  }, 60000);

  test('Get Ether Balance for Multiple Addresses in a Single Call', async () => {
    const balances = await blockExplorer.getAccountsBalances({ address: WALLET, tag: BlockExplorerTag.Latest });
    expect(balances).toEqual([
      {
        account: WALLET,
        balance: 100_000_000_000_000_000n
      }
    ]);
  }, 60000);

  test("Get a list of 'Normal' Transactions By Address", async () => {
    const txs = await blockExplorer.GetNormalTxListByAddress({
      address: WALLET
    });
    console.log(txs);
    expect(txs.length).toBe(1);
  }, 60000);
});
