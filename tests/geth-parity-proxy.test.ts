import { config } from 'dotenv';

import { BlockExplorerCommon, Chain } from '../src';

config();

const TEST_TIMEOUT = 60000;
const { ROUTESCAN_API_KEY } = process.env;
const blockExplorer = BlockExplorerCommon.build({ chain: Chain.AvalancheCChainFuji, apiKey: ROUTESCAN_API_KEY! });

describe('Check Geth/Parity/Proxy functions', () => {
  test(
    'Get number of most recent block',
    async () => {
      const blockNumber = await blockExplorer.eth_blockNumber();
      expect(typeof blockNumber).toEqual('string');
    },
    TEST_TIMEOUT
  );

  test(
    'Get information about a block by block number',
    async () => {
      const block = await blockExplorer.eth_getBlockByNumber({
        boolean: true,
        tag: '0x10d4f'
      });
      expect(block.hash).toEqual('0x963db5b269ac9c1cf315710700d62fbebdea075a5c6cc34d5af63bf8a462fee0');
    },
    TEST_TIMEOUT
  );
});
