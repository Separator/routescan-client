import { BlockExplorerType } from '../types/type';
import { Chain, ChainItem } from '../types/chains';

export const chains: ChainItem[] = [
  {
    id: Chain.Ethereum,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.etherscan.io/api'
  },
  {
    id: Chain.EthereumHolesky,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-holesky.etherscan.io/api'
  },
  {
    id: Chain.EthereumSepolia,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-sepolia.etherscan.io/api'
  },

  {
    id: Chain.Optimism,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-optimistic.etherscan.io/api'
  },
  {
    id: Chain.OptimismSepolia,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-sepolia-optimistic.etherscan.io/api'
  },

  {
    id: Chain.BinanceSmartChain,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.bscscan.com/api'
  },
  {
    id: Chain.BinanceSmartChainTestnet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-testnet.bscscan.com/api'
  },

  {
    id: Chain.BinanceOpBnbMainnet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-opbnb.bscscan.com/api'
  },
  {
    id: Chain.BinanceOpBnbTestnet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-opbnb-testnet.bscscan.com/api'
  },

  {
    id: Chain.Fantom,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.ftmscan.com/api'
  },
  {
    id: Chain.FantomTestnet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-testnet.ftmscan.com/api'
  },

  {
    id: Chain.Polygon,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.polygonscan.com/api'
  },
  {
    id: Chain.PolygonMumbai,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-testnet.polygonscan.com/api'
  },
  {
    id: Chain.PolygonAmoy,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-amoy.polygonscan.com/api'
  },

  {
    id: Chain.Base,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.basescan.org/api'
  },
  {
    id: Chain.BaseSepolia,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-sepolia.basescan.org/api'
  },

  {
    id: Chain.Arbitrum,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.arbiscan.io/api'
  },
  {
    id: Chain.ArbitrumNova,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-nova.arbiscan.io/api'
  },
  {
    id: Chain.ArbitrumSepolia,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-sepolia.arbiscan.io/api'
  },

  {
    id: Chain.AvalancheCChain,
    blockExplorerType: BlockExplorerType.Routescan,
    blockExplorerUrl: 'https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan/api'
  },
  {
    id: Chain.AvalancheCChainFuji,
    blockExplorerType: BlockExplorerType.Routescan,
    blockExplorerUrl: 'https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/api'
  },

  {
    id: Chain.Celo,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.celoscan.io/api'
  },
  {
    id: Chain.CeloAlfajores,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-alfajores.celoscan.io/api'
  },

  {
    id: Chain.Linea,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.lineascan.build/api'
  },
  {
    id: Chain.LineaSepolia,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-sepolia.lineascan.build/api'
  },

  {
    id: Chain.Taiko,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.taikoscan.io/api'
  },
  {
    id: Chain.TaikoHeklaL2,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-hekla.taikoscan.io/api'
  },

  {
    id: Chain.Dexalot,
    blockExplorerType: BlockExplorerType.Routescan,
    blockExplorerUrl: 'https://api.routescan.io/v2/network/mainnet/evm/432204/etherscan/api'
  },
  {
    id: Chain.DexalotTestnet,
    blockExplorerType: BlockExplorerType.Routescan,
    blockExplorerUrl: 'https://api.routescan.io/v2/network/testnet/evm/432201/etherscan/api'
  }
];
