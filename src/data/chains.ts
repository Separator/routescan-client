import { Chain } from '../types/chains';
import { ChainType } from '../types/routescan';
import { BlockExplorerType } from '../interfaces/BlockExplorer';

interface ChainItem {
  id: Chain;
  type: ChainType;
  blockExplorerType: BlockExplorerType;
}

export const chains: ChainItem[] = [
  {
    id: Chain.Ethereum,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Routescan
  },
  {
    id: Chain.EthereumGoerli,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Routescan
  },
  {
    id: Chain.EthereumSepolia,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Routescan
  },

  {
    id: Chain.Optimism,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },
  {
    id: Chain.OptimismSepolia,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },

  {
    id: Chain.BinanceSmartChain,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },
  {
    id: Chain.BinanceSmartChainTestnet,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },

  {
    id: Chain.Polygon,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },
  {
    id: Chain.PolygonMumbai,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },

  {
    id: Chain.Base,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Routescan
  },
  {
    id: Chain.BaseGoerli,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },
  {
    id: Chain.BaseSepolia,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },

  {
    id: Chain.Arbitrum,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },
  {
    id: Chain.ArbitrumGoerli,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },
  {
    id: Chain.ArbitrumSepolia,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },

  {
    id: Chain.AvalancheCChain,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Routescan
  },
  {
    id: Chain.AvalancheCChainFuji,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Routescan
  },

  {
    id: Chain.Celo,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },
  {
    id: Chain.CeloAlfajores,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },

  {
    id: Chain.Linea,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },
  {
    id: Chain.LineaGoerli,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Ethereum
  },

  {
    id: Chain.Palm,
    type: ChainType.MainNet,
    blockExplorerType: BlockExplorerType.Chainlens
  },
  {
    id: Chain.PalmTestnet,
    type: ChainType.TestNet,
    blockExplorerType: BlockExplorerType.Chainlens
  }
];
