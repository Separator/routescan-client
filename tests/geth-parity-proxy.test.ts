import { config } from 'dotenv';

import { BlockExplorerCommon, Chain } from '../src';

config();

const TEST_TIMEOUT = 60000;
const { ROUTESCAN_API_KEY, ETHEREUM_API_KEY } = process.env;
const blockExplorerAvax = BlockExplorerCommon.build({ chain: Chain.AvalancheCChainFuji, apiKey: ROUTESCAN_API_KEY! });
const blockExplorerEth = BlockExplorerCommon.build({ chain: Chain.Ethereum, apiKey: ETHEREUM_API_KEY! });

describe('Check Geth/Parity/Proxy functions', () => {
  test(
    'Get number of most recent block',
    async () => {
      const blockNumber = await blockExplorerAvax.eth_blockNumber();
      expect(typeof blockNumber).toEqual('string');
    },
    TEST_TIMEOUT
  );

  test(
    'Get information about a block by block number',
    async () => {
      const block = await blockExplorerAvax.eth_getBlockByNumber({
        boolean: true,
        tag: '0x10d4f'
      });
      expect(block.hash).toEqual('0x963db5b269ac9c1cf315710700d62fbebdea075a5c6cc34d5af63bf8a462fee0');
    },
    TEST_TIMEOUT
  );

  test(
    'Returns information about a uncle by block number',
    async () => {
      const block = await blockExplorerEth.eth_getUncleByBlockNumberAndIndex({
        tag: '0xC63276',
        index: '0x0'
      });
      expect(block.hash).toEqual('0x1da88e3581315d009f1cb600bf06f509cd27a68cb3d6437bda8698d04089f14a');
    },
    TEST_TIMEOUT
  );
});
