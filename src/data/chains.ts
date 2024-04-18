import { ChainType } from '../types/routescan';
import { Chain, ChainItem } from '../types/chains';
import { BlockExplorerType } from '../interfaces/BlockExplorer';

export const chains: ChainItem[] = [
  {
    id: Chain.Ethereum,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.etherscan.io/api'
  },
  {
    id: Chain.EthereumGoerli,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-goerli.etherscan.io/api'
  },
  {
    id: Chain.EthereumSepolia,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-sepolia.etherscan.io/api'
  },

  {
    id: Chain.Optimism,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-optimistic.etherscan.io/api'
  },
  {
    id: Chain.OptimismGoerli,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-goerli-optimistic.etherscan.io/api'
  },
  {
    id: Chain.OptimismSepolia,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-sepolia-optimistic.etherscan.io/api'
  },

  {
    id: Chain.BinanceSmartChain,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.bscscan.com/api'
  },
  {
    id: Chain.BinanceSmartChainTestnet,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-testnet.bscscan.com/api'
  },

  {
    id: Chain.Polygon,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.polygonscan.com/api'
  },
  {
    id: Chain.PolygonMumbai,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-testnet.polygonscan.com/api'
  },
  {
    id: Chain.PolygonAmoy,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-amoy.polygonscan.com/api'
  },

  {
    id: Chain.Base,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.basescan.org/api'
  },
  {
    id: Chain.BaseSepolia,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-sepolia.basescan.org/api'
  },

  {
    id: Chain.Arbitrum,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.arbiscan.io/api'
  },
  {
    id: Chain.ArbitrumNova,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-nova.arbiscan.io/api'
  },
  {
    id: Chain.ArbitrumSepolia,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-sepolia.arbiscan.io/api'
  },

  {
    id: Chain.AvalancheCChain,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Routescan,
    blockExplorerUrl: 'https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan/api'
  },
  {
    id: Chain.AvalancheCChainFuji,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Routescan,
    blockExplorerUrl: 'https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/api'
  },

  {
    id: Chain.Celo,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.celoscan.io/api'
  },
  {
    id: Chain.CeloAlfajores,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-alfajores.celoscan.io/api'
  },

  {
    id: Chain.Linea,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api.lineascan.build/api'
  },
  {
    id: Chain.LineaGoerli,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum,
    blockExplorerUrl: 'https://api-testnet.lineascan.build/api'
  }
];
