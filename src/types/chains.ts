export enum Chain {
  // Already supported
  Arbitrum = 42161, // (no tokens)
  ArbitrumNova = 42170, // (no tokens)

  AvalancheCChain = 43114,
  AvalancheCChainFuji = 43113,

  Base = 8453,
  BaseGoerli = 84531,
  BaseSepolia = 84532,

  BinanceSmartChain = 56,
  BinanceSmartChainTestnet = 97,
  BinanceSmartChainOpBnbL2 = 204,
  BinanceSmartChainOpBnbL2Testnet = 5611,

  Cronos = 25,
  CronosTestnet = 338,

  Ethereum = 1,
  EthereumGoerli = 5,
  EthereumSepolia = 11155111,

  Polygon = 137,
  PolygonMumbai = 80001,

  // Exists in Infura, but not supported for now
  Linea = 59144,
  LineaGoerli = 59140,

  Optimism = 10,
  OptimismGoerli = 420,
  OptimismSepolia = 11155420,

  Palm = 11297108109,
  PalmTestnet = 11297108099,

  Celo = 42220,
  CeloAlfajores = 44787,
}
