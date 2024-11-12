import { config } from 'dotenv';

import { BlockExplorerCommon, BlockExplorerTag, Chain } from '../src';

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
      expect(typeof blockNumber).toEqual('bigint');
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
    'Get information about a uncle by block number',
    async () => {
      const block = await blockExplorerEth.eth_getUncleByBlockNumberAndIndex({
        tag: '0xC63276',
        index: '0x0'
      });
      expect(block.hash).toEqual('0x1da88e3581315d009f1cb600bf06f509cd27a68cb3d6437bda8698d04089f14a');
    },
    TEST_TIMEOUT
  );

  test(
    'Get the number of transactions in a block',
    async () => {
      const txCount = await blockExplorerEth.eth_getBlockTransactionCountByNumber({
        tag: '0x10FB78'
      });
      expect(txCount.toString()).toEqual('3');
    },
    TEST_TIMEOUT
  );

  test(
    'Get the information about a transaction requested by transaction hash',
    async () => {
      const tx = await blockExplorerEth.eth_getTransactionByHash({
        txhash: '0xbc78ab8a9e9a0bca7d0321a27b2c03addeae08ba81ea98b03cd3dd237eabed44'
      });
      expect(tx.hash).toEqual('0xbc78ab8a9e9a0bca7d0321a27b2c03addeae08ba81ea98b03cd3dd237eabed44');
    },
    TEST_TIMEOUT
  );

  test(
    'Get information about a transaction by block number and transaction index position',
    async () => {
      const tx = await blockExplorerEth.eth_getTransactionByBlockNumberAndIndex({
        tag: '0xC6331D',
        index: '0x11A'
      });
      expect(tx.hash).toEqual('0xc7ef51f0bfe85eefbb1d4d88f5a39e82fbfc94987d8cbcb515f74d80b6e44902');
    },
    TEST_TIMEOUT
  );

  test(
    'Get the number of transactions performed by an address',
    async () => {
      const txCount = await blockExplorerEth.eth_getTransactionCount({
        address: '0x4bd5900Cb274ef15b153066D736bf3e83A9ba44e'
      });
      expect(txCount.toString()).toEqual('115');
    },
    TEST_TIMEOUT
  );

  test(
    'Get the receipt of a transaction by transaction hash',
    async () => {
      const txReceipt = await blockExplorerEth.eth_getTransactionReceipt({
        txhash: '0xadb8aec59e80db99811ac4a0235efa3e45da32928bcff557998552250fa672eb'
      });
      expect(txReceipt.blockHash).toEqual('0x07c17710dbb7514e92341c9f83b4aab700c5dba7c4fb98caadd7926a32e47799');
    },
    TEST_TIMEOUT
  );

  test(
    'Executes a new message call immediately without creating a transaction on the block chain',
    async () => {
      const result = await blockExplorerEth.eth_call({
        to: '0xAEEF46DB4855E25702F8237E8f403FddcaF931C0',
        data: '0x70a08231000000000000000000000000e16359506c028e51f16be38986ec5746251e9724',
        tag: BlockExplorerTag.Latest
      });
      expect(typeof result).toEqual('string');
    },
    TEST_TIMEOUT
  );

  test(
    'Returns code at a given address',
    async () => {
      const codeInHex = await blockExplorerEth.eth_getCode({
        address: '0xf75e354c5edc8efed9b59ee9f67a80845ade7d0c',
        tag: BlockExplorerTag.Latest
      });
      expect(codeInHex).toEqual(
        '0x3660008037602060003660003473273930d21e01ee25e4c219b63259d214872220a261235a5a03f21560015760206000f3'
      );
    },
    TEST_TIMEOUT
  );
});
