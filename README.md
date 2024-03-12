# ![https://routescan.io/](https://raw.githubusercontent.com/Separator/routescan-client/main/img/logo.svg) Routescan client

[![routescan-client](https://snyk.io/advisor/npm-package/routescan-client/badge.svg)](https://snyk.io/advisor/npm-package/routescan-client)

Client for receiving blockchain data through block explorers (in particular, routescan).  
At the moment, the number of available methods is limited to those indicated in the examples below:

## Accounts section

```javascript
import { BlockExplorerCommon, BlockExplorerTag, BlockExplorerTopicOperation, Chain } from 'routescan-client';

const ROUTESCAN_API_KEY = 'YourApiKey';
const WALLET = '0x285f5F8Cd290Cff6596337C4eEC14e1a62235854';

async function main() {
  const blockExplorer = BlockExplorerCommon.build({
    chain: Chain.AvalancheCChainFuji,
    apiKey: ROUTESCAN_API_KEY
  });

  // Get AVAX balance for a single address:
  const balance = await blockExplorer.getAccountBalance({
    address: WALLET,
    tag: BlockExplorerTag.Latest
  });
  console.log(`Balance of ${WALLET} is ${balance}`);

  // Get AVAX balance for multiple addresses in a single call:
  const WALLET_SECOND = '0xCD5B8Ea4a848b1c576125f20F9aDe5F58FDf4D4f';
  const balances = await blockExplorer.getAccountsBalances({
    address: [WALLET, WALLET_SECOND].join(','),
    tag: BlockExplorerTag.Latest
  });
  console.log(balances);

  // Get a list of 'Normal' Transactions By Address
  const normalTxs = await blockExplorer.GetNormalTxListByAddress({
    address: WALLET
  });
  console.log(normalTxs);

  const internalTxs = await blockExplorer.GetInternalTxListByAddress({
    address: WALLET
  });
  console.log(internalTxs);

  // Get ERC20-Token Account Balance for TokenContractAddress:
  const tokenBalance = await blockExplorer.getAccountTokenBalance({
    contractAddress: '0x57d90b64a1a57749b0f932f1a3395792e12e7055',
    address: WALLET,
    tag: BlockExplorerTag.Latest
  });
  console.log(`Balance of ${WALLET} is ${tokenBalance}`);

  // Get Event Logs by Address filtered by Topics:
  const logs = await blockExplorer.getEventLogsByAddressFiltered({
    fromBlock: 37000000,
    toBlock: 37200000,
    topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    topic0_1_opr: BlockExplorerTopicOperation.And,
    topic1: '0x0000000000000000000000000000000000000000000000000000000000000000',
    page: 1,
    offset: 1000,
    apiKey: 'YourApiKey'
  });
  console.log(logs.length);
}

main();
```

## Blocks section

```javascript
import { BlockExplorerClosest, BlockExplorerCommon, Chain } from 'routescan-client';

const ROUTESCAN_API_KEY = 'YourApiKey';
const WALLET = '0x285f5F8Cd290Cff6596337C4eEC14e1a62235854';

async function main() {
  const blockExplorer = BlockExplorerCommon.build({
    chain: Chain.AvalancheCChainFuji,
    apiKey: ROUTESCAN_API_KEY
  });

  // Get estimated block countdown time by blockNo:
  const blockCountdown = await blockExplorer.getBlockCountdownTime({
    blockno: 167015880000
  });
  console.log('Block countdown', blockCountdown);

  // Get block number by timestamp:
  const timestamp = 1619638524;
  const blockNumberByTimestamp = await blockExplorer.getBlockNumberByTimestamp({
    timestamp,
    closest: BlockExplorerClosest.After
  });
  console.log(`Block number after ${timestamp} is ${blockNumberByTimestamp}`);
}

main();
```

## Logs section

```javascript
import { BlockExplorerCommon, BlockExplorerTopicOperation, Chain } from 'routescan-client';

const ROUTESCAN_API_KEY = 'YourApiKey';
const WALLET = '0x285f5F8Cd290Cff6596337C4eEC14e1a62235854';

async function main() {
  const blockExplorer = BlockExplorerCommon.build({
    chain: Chain.AvalancheCChainFuji,
    apiKey: ROUTESCAN_API_KEY
  });

  // Get Event Logs by Address filtered by Topics:
  const logs = await blockExplorer.getEventLogsByAddressFiltered({
    fromBlock: 37000000,
    toBlock: 37200000,
    topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    topic0_1_opr: BlockExplorerTopicOperation.And,
    topic1: '0x0000000000000000000000000000000000000000000000000000000000000000',
    page: 1,
    offset: 1000,
    apiKey: 'YourApiKey'
  });
  console.log(logs.length);
}

main();
```

## Supported networks table

| **ID**   | **Name**                 |
| -------- | ------------------------ |
| 1        | Ethereum                 |
| 5        | EthereumGoerli           |
| 11155111 | EthereumSepolia          |
| 10       | Optimism                 |
| 420      | OptimismGoerli           |
| 56       | BinanceSmartChain        |
| 97       | BinanceSmartChainTestnet |
| 137      | Polygon                  |
| 80001    | PolygonMumbai            |
| 8453     | Base                     |
| 84531    | BaseGoerli               |
| 84532    | BaseSepolia              |
| 42161    | Arbitrum                 |
| 421613   | ArbitrumGoerli           |
| 421614   | ArbitrumSepolia          |
| 43114    | AvalancheCChain          |
| 43113    | AvalancheCChainFuji      |
| 42220    | Celo                     |
| 44787    | CeloAlfajores            |
| 59144    | Linea                    |
| 59140    | LineaGoerli              |
