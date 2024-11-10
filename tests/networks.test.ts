import { config } from 'dotenv';

import { BlockExplorerClosest, BlockExplorerCommon, Chain } from '../src';

config();

const {
  ETHEREUM_API_KEY = '',
  OPTIMISM_API_KEY = '',
  BSC_API_KEY = '',
  BSC_OPBNB_API_KEY = '',
  POLYGON_API_KEY = '',
  BASE_API_KEY = '',
  ARBITRUM_API_KEY = '',
  ROUTESCAN_API_KEY = '',
  CELO_API_KEY = '',
  LINEA_API_KEY = '',
  FTM_SCAN_API_KEY = '',
  TAIKO_API_KEY = '',
  MANTLE_API_KEY = ''
} = process.env;
const TEST_TIMEOUT = 60000;

const getLastBlockchainBlock = async (chain: Chain, apiKey: string): Promise<number> => {
  const blockExplorer = BlockExplorerCommon.build({
    chain,
    apiKey
  });

  const params = {
    timestamp: Math.floor(Date.now() / 1000),
    closest: BlockExplorerClosest.Before
  };

  const blockId = await blockExplorer.getBlockNumberByTimestamp(params);
  return blockId;
};

describe('Checking access to blockchains', () => {
  describe('Ethereum', () => {
    test(
      'Ethereum (1)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.Ethereum, ETHEREUM_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test('EthereumHolesky (5)', async () => {
      const blockId = await getLastBlockchainBlock(Chain.EthereumHolesky, ETHEREUM_API_KEY);
      expect(typeof blockId).toBe('number');
    });

    test('EthereumSepolia (11155111)', async () => {
      const blockId = await getLastBlockchainBlock(Chain.EthereumSepolia, ETHEREUM_API_KEY);
      expect(typeof blockId).toBe('number');
    });
  });

  describe('Optimism', () => {
    test(
      'Optimism (10)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.Optimism, OPTIMISM_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'OptimismSepolia (11155420)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.OptimismSepolia, OPTIMISM_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('BinanceSmartChain', () => {
    test(
      'BinanceSmartChain (56)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.BinanceSmartChain, BSC_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'BinanceSmartChainTestnet (97)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.BinanceSmartChainTestnet, BSC_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('BinanceSmartChain OPBNB', () => {
    test(
      'BinanceOpBnbMainnet (204)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.BinanceOpBnbMainnet, BSC_OPBNB_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'BinanceOpBnbTestnet (5611)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.BinanceOpBnbTestnet, BSC_OPBNB_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('Polygon', () => {
    test(
      'Polygon (137)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.Polygon, POLYGON_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'PolygonAmoy (80002)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.PolygonAmoy, POLYGON_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('Fantom', () => {
    test(
      'Fantom (250)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.Fantom, FTM_SCAN_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'FantomTestnet (4002)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.FantomTestnet, FTM_SCAN_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('Base', () => {
    test(
      'Base (8453)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.Base, BASE_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'BaseSepolia (84532)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.BaseSepolia, BASE_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('Arbitrum', () => {
    test(
      'Arbitrum (42161)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.Arbitrum, ARBITRUM_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'ArbitrumNova (42170)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.ArbitrumNova, ARBITRUM_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'ArbitrumSepolia (421614)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.ArbitrumSepolia, ARBITRUM_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('AvalancheCChain', () => {
    test(
      'AvalancheCChain (43114)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.AvalancheCChain, ROUTESCAN_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'AvalancheCChainFuji (43113)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.AvalancheCChainFuji, ROUTESCAN_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('Celo', () => {
    test(
      'Celo (42220)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.Celo, CELO_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'CeloAlfajores (44787)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.CeloAlfajores, CELO_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('Linea', () => {
    test(
      'Linea (59144)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.Linea, LINEA_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'LineaSepolia (59141)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.LineaSepolia, LINEA_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('Taiko', () => {
    test(
      'Taiko (167000)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.Taiko, TAIKO_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'Taiko Hekla L2 (167009)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.TaikoHeklaL2, TAIKO_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('Dexalot', () => {
    test(
      'Dexalot (432204)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.Dexalot, ROUTESCAN_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'DexalotTestnet (432201)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.DexalotTestnet, ROUTESCAN_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('Flare', () => {
    test(
      'FlareMainnet (14)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.FlareMainnet, ROUTESCAN_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'FlareTestnet (114)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.FlareTestnet, ROUTESCAN_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('Mantle', () => {
    test(
      'Mantle (5000)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.Mantle, MANTLE_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'MantleSepolia (5003)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.MantleSepolia, MANTLE_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });

  describe('Mint', () => {
    test(
      'Mint (185)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.Mint, ROUTESCAN_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );

    test(
      'MintSepolia (1687)',
      async () => {
        const blockId = await getLastBlockchainBlock(Chain.MintSepolia, ROUTESCAN_API_KEY);
        expect(typeof blockId).toBe('number');
      },
      TEST_TIMEOUT
    );
  });
});
