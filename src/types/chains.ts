import { ChainType } from './routescan';
import { BlockExplorerType } from '../interfaces/BlockExplorer';

export enum Chain {
  NotSpecified = 0,

  Ethereum = 1,
  EthereumGoerli = 5,
  EthereumSepolia = 11155111,

  Optimism = 10,
  OptimismGoerli = 420,
  OptimismSepolia = 11155420,

  Cronos = 25,
  CronosTestnet = 338,

  BinanceSmartChain = 56,
  BinanceSmartChainTestnet = 97,
  BinanceSmartChainOpBnbL2 = 204,
  BinanceSmartChainOpBnbL2Testnet = 5611,

  Polygon = 137,
  PolygonMumbai = 80001,

  Base = 8453,
  BaseGoerli = 84531,
  BaseSepolia = 84532,

  Arbitrum = 42161,
  ArbitrumGoerli = 421613,
  ArbitrumSepolia = 421614,

  AvalancheCChain = 43114,
  AvalancheCChainFuji = 43113,

  Celo = 42220,
  CeloAlfajores = 44787,

  Linea = 59144,
  LineaGoerli = 59140,

  Palm = 11297108109,
  PalmTestnet = 11297108099
}

export interface ChainItem {
  id: Chain;
  type: ChainType;
  blockExplorerType: BlockExplorerType;
  blockExplorerUrl: string;
}
