import { config } from 'dotenv';

import { BlockExplorerCommon, Chain } from '../src';

config();

const TEST_TIMEOUT = 60000;
const { ETHEREUM_API_KEY } = process.env;
const blockExplorer = BlockExplorerCommon.build({ chain: Chain.Ethereum, apiKey: ETHEREUM_API_KEY! });

describe('Check Transactions functions', () => {
  test(
    'Check Contract Execution Status',
    async () => {
      const txStatus = await blockExplorer.getContractExecutionStatus({
        txhash: '0x15f8e5ea1079d9a0bb04a4c58ae5fe7654b5b2b4463375ff7ffb490aa0032f3a'
      });
      expect(txStatus.isError).toEqual('1');
    },
    TEST_TIMEOUT
  );
});
