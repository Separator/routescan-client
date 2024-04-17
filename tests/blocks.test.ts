import { config } from 'dotenv';

import { BlockExplorerCommon, Chain } from '../src';

config();

const TEST_TIMEOUT = 60000;
const { ROUTESCAN_API_KEY } = process.env;
const blockExplorer = BlockExplorerCommon.build({ chain: Chain.AvalancheCChainFuji, apiKey: ROUTESCAN_API_KEY! });

describe('Check functions from Accounts block', () => {
  test(
    'Get estimated block countdown time by BlockNo',
    async () => {
      const countdown = await blockExplorer.getBlockCountdownTime({
        blockno: Number.MAX_SAFE_INTEGER
      });
      expect(countdown).toHaveProperty('CountdownBlock');
      expect(countdown).toHaveProperty('CurrentBlock');
      expect(countdown).toHaveProperty('EstimateTimeInSec');
      expect(countdown).toHaveProperty('RemainingBlock');
    },
    TEST_TIMEOUT
  );
});
