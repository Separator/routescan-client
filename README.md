# ![https://routescan.io/](https://raw.githubusercontent.com/Separator/routescan-client/main/img/logo.svg) Routescan/Etherscan client

[![routescan-client](https://snyk.io/advisor/npm-package/routescan-client/badge.svg)](https://snyk.io/advisor/npm-package/routescan-client)

Client for receiving blockchain data through block explorers (**etherscan**, **routescan**, etc.).  
At the moment, the number of available methods is limited to those indicated in the examples below:

## Donation

To support this project, you can send crypto to:

- **0x3F2f0098310e654040f7794AB7E44Ac48E0eaF7B**
- **TLPh66vQ2QMb64rG3WEBV5qnAhefh2kcdw**

## [Accounts section](https://routescan.io/documentation/etherscan-compatibility/accounts)

```javascript
import { BlockExplorerCommon, BlockExplorerTag, BlockExplorerTopicOperation, Chain, BlockExplorerSort } from 'routescan-client';

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
  const normalTxs = await blockExplorer.getNormalTxListByAddress({
    address: WALLET
  });
  console.log(normalTxs);

  // Get a list of 'internal' transactions by address:
  const internalTxs = await blockExplorer.getInternalTxListByAddress({
    address: WALLET
  });
  console.log(internalTxs);

  // Get 'internal transactions' by transaction hash
  const internalTxsByHash = await blockExplorer.getInternalTxListByTxHash({
    txhash: '0x40eb908387324f2b575b4879cd9d7188f69c8fc9d87c901b9e2daaea4b442170'
  });
  console.log(internalTxsByHash);

  // Get a list of 'ERC20 - token transfer events' by address:
  const tokenEvents = await blockExplorer.getErc20TokenTransferEventsList({
    address: '0x77134cbC06cB00b66F4c7e623D5fdBF6777635EC',
    contractaddress: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
    page: 1,
    offset: 100,
    startblock: 34372864,
    endblock: 34472864,
    sort: BlockExplorerSort.Asc
  });
  console.log(tokenEvents);

  // Get ERC20-Token Account Balance for TokenContractAddress:
  const tokenBalance = await blockExplorer.getAccountTokenBalance({
    contractAddress: '0x57d90b64a1a57749b0f932f1a3395792e12e7055',
    address: WALLET,
    tag: BlockExplorerTag.Latest
  });
  console.log(`Balance of ${WALLET} is ${tokenBalance}`);
}

main();
```

## [Contracts section](https://routescan.io/documentation/etherscan-compatibility/contracts)

```javascript
import { BlockExplorerCodeFormat, BlockExplorerCommon, Chain } from 'routescan-client';

const ROUTESCAN_API_KEY = 'YourApiKey';
const CONTRACT_ADDRESS = '0x2A1D1C87d18dd13d7a1e91A42C9fFEc486EB6433';
const CONTRACT_NAME = 'HelloWorld';
const CONTRACT_SOURCE_CODE = 'contract source code string...';
const COMPILER_VERSION = 'v0.8.10+commit.fc410830';

async function main() {
  const blockExplorer = BlockExplorerCommon.build({
    chain: Chain.AvalancheCChainFuji,
    apiKey: ROUTESCAN_API_KEY
  });

  // Verify Source Code:
  const verified = await blockExplorer.verifySoliditySourceCode({
    codeformat: BlockExplorerCodeFormat.SoliditySingleFile,
    sourceCode: CONTRACT_SOURCE_CODE,
    contractaddress: CONTRACT_ADDRESS,
    contractname: CONTRACT_NAME,
    compilerversion: COMPILER_VERSION
  });
  console.log(verified);
}
```

## [Blocks section](https://routescan.io/documentation/etherscan-compatibility/blocks)

```javascript
import { BlockExplorerClosest, BlockExplorerCommon, Chain } from 'routescan-client';

const ROUTESCAN_API_KEY = 'YourApiKey';

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

## [Geth/Parity Proxy section](https://routescan.io/documentation/etherscan-compatibility/geth-parity-proxy)

```javascript
import { BlockExplorerCommon, Chain } from 'routescan-client';

const ROUTESCAN_API_KEY = 'YourApiKey';

async function main() {
  const blockExplorer = BlockExplorerCommon.build({
    chain: Chain.AvalancheCChainFuji,
    apiKey: ROUTESCAN_API_KEY
  });

  // Get number of most recent block:
  const blockNumber = await blockExplorer.eth_blockNumber();
  console.log(blockNumber);

  // Get information about a block by block number:
  const block = await blockExplorer.eth_getBlockByNumber({
    boolean: true,
    tag: '0x10d4f'
  });
  console.log(block);

  // Get information about a uncle by block number:
  const uncleBlock = await blockExplorer.eth_getUncleByBlockNumberAndIndex({
    tag: '0xC63276',
    index: '0x0'
  });
  console.log(uncleBlock);

  // Get the number of transactions in a block:
  const blockTxCount = await blockExplorer.eth_getBlockTransactionCountByNumber({
    tag: '0x10FB78'
  });
  console.log(blockTxCount);

  // Get the information about a transaction requested by transaction hash:
  const tx = await blockExplorer.eth_getTransactionByHash({
    txhash: '0xbc78ab8a9e9a0bca7d0321a27b2c03addeae08ba81ea98b03cd3dd237eabed44'
  });
  console.log(tx);

  // Get information about a transaction by block number and transaction index position:
  const txSecond = await blockExplorer.eth_getTransactionByBlockNumberAndIndex({
    tag: '0xC6331D',
    index: '0x11A'
  });
  console.log(txSecond);

  // Get the number of transactions performed by an address:
  const txCount = await blockExplorer.eth_getTransactionCount({
    address: '0x4bd5900Cb274ef15b153066D736bf3e83A9ba44e'
  });
  console.log(txCount);

  // Submits a pre-signed transaction for broadcast to the Ethereum network:
  const txHash = await blockExplorer.eth_sendRawTransaction({
    hex: '0xf904808000831cfde080'
  });
  console.log(txHash);

  // Get the receipt of a transaction by transaction hash:
  const txReceipt = await blockExplorer.eth_getTransactionReceipt({
    txhash: '0xadb8aec59e80db99811ac4a0235efa3e45da32928bcff557998552250fa672eb'
  });
  console.log(txReceipt);

  // Executes a new message call immediately without creating a transaction on the block chain:
  const callResult = await blockExplorer.eth_call({
    to: '0xAEEF46DB4855E25702F8237E8f403FddcaF931C0',
    data: '0x70a08231000000000000000000000000e16359506c028e51f16be38986ec5746251e9724',
    tag: BlockExplorerTag.Latest
  });
  console.log(callResult);

  // Returns code at a given address:
  const codeInHex = await blockExplorer.eth_getCode({
    address: '0xf75e354c5edc8efed9b59ee9f67a80845ade7d0c',
    tag: BlockExplorerTag.Latest
  });
  console.log(codeIndex);

  // Returns the value from a storage position at a given address:
  const storageValue = await blockExplorer.eth_getStorageAt({
    address: '0x6e03d9cce9d60f3e9f2597e13cd4c54c55330cfd',
    position: '0x0',
    tag: BlockExplorerTag.Latest
  });
  console.log(storageValue);

  // Returns the current price per gas in wei:
  const gasPrice = await blockExplorer.eth_gasPrice();
  console.log(gasPrice);

  // Makes a call or transaction, which won't be added to the blockchain and returns the used gas:
  const gas = await blockExplorerEth.eth_estimateGas({
    data: '0x4e71d92d',
    to: '0xf0160428a8552ac9bb7e050d90eeade4ddd52843',
    value: '0xff22',
    gasPrice: '0x51da038cc',
    gas: '0x5f5e0ff'
  });
  console.log(gas);
}

main();
```

## [Logs section](https://routescan.io/documentation/etherscan-compatibility/logs)

```javascript
import { BlockExplorerCommon, BlockExplorerTopicOperation, Chain } from 'routescan-client';

const ROUTESCAN_API_KEY = 'YourApiKey';

async function main() {
  const blockExplorer = BlockExplorerCommon.build({
    chain: Chain.AvalancheCChainFuji,
    apiKey: ROUTESCAN_API_KEY
  });

  // Get event logs by address:
  const logs = await blockExplorer.getEventLogsByAddress({
    address: '0x9e66eba102b77fc75cd87b5e60141b85573bc8e8',
    fromBlock: 37000000,
    toBlock: 37200000,
    page: 1,
    offset: 1000
  });
  console.log(logs);

  // Get event logs by topics:
  const topicsLogs = await blockExplorer.getEventLogsByTopics({
    fromBlock: 37000000,
    toBlock: 37200000,
    topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    topic0_1_opr: BlockExplorerTopicOperation.And,
    topic1: '0x0000000000000000000000000000000000000000000000000000000000000000',
    page: 1,
    offset: 1000
  });
  console.log(topicsLogs.length);

  // Get Event Logs by Address filtered by Topics:
  const addressLogs = await blockExplorer.getEventLogsByAddressFiltered({
    address: '0x9e66eba102b77fc75cd87b5e60141b85573bc8e8',
    fromBlock: 37000000,
    toBlock: 37200000,
    topic0: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    topic0_1_opr: BlockExplorerTopicOperation.And,
    topic1: '0x0000000000000000000000000000000000000000000000000000000000000000',
    page: 1,
    offset: 1000
  });
  console.log(addressLogs.length);

  // Returns code at a given address:
  const codeInHex = await blockExplorer.eth_getCode({
    address: '0xf75e354c5edc8efed9b59ee9f67a80845ade7d0c',
    tag: BlockExplorerTag.Latest
  });
  console.log(codeInHex);
}

main();
```

## [Transactions section](https://routescan.io/documentation/etherscan-compatibility/transactions)

```javascript
import { BlockExplorerCommon, BlockExplorerTopicOperation, Chain } from 'routescan-client';

const ETHEREUM_API_KEY = 'YourApiKey';

async function main() {
  const blockExplorer = BlockExplorerCommon.build({
    chain: Chain.Ethereum,
    apiKey: ETHEREUM_API_KEY
  });

  // Check Contract Execution Status:
  const txStatus = await blockExplorer.getContractExecutionStatus({
    txhash: '0x15f8e5ea1079d9a0bb04a4c58ae5fe7654b5b2b4463375ff7ffb490aa0032f3a'
  });
  console.log(txStatus);

  // Check Transaction Receipt Status:
  const receiptStatus = await blockExplorer.checkTransactionReceiptStatus({
    txhash: '0x513c1ba0bebf66436b5fed86ab668452b7805593c05073eb2d51d3a52f480a76'
  });
  console.log(receiptStatus);
}

main();
```

## Supported networks table

### <span style="color:red;">Client also support other etherscan-compatible block explorers, but in this case you must provide custom **url** parameter.</span>

**You must use the API key of the corresponding block explorer!!!**  
Just register an account on corresponding site and generate an API key.

| **ID**   | **Name**                 | **Block explorer**              | Block explorer API url                                               |
| -------- | ------------------------ | ------------------------------- | -------------------------------------------------------------------- |
| 1        | Ethereum                 | https://etherscan.io            | https://api.etherscan.io/api                                         |
| 17000    | EthereumHolesky          | https://etherscan.io            | https://api-holesky.etherscan.io/api                                 |
| 11155111 | EthereumSepolia          | https://etherscan.io            | https://api-sepolia.etherscan.io/api                                 |
| 10       | Optimism                 | https://optimistic.etherscan.io | https://api-optimistic.etherscan.io/api                              |
| 11155420 | OptimismSepolia          | https://optimistic.etherscan.io | https://api-sepolia-optimistic.etherscan.io/api                      |
| 14       | FlareMainnet             | https://routescan.io            | https://api.routescan.io/v2/network/mainnet/evm/14/etherscan/api     |
| 114      | FlareTestnet             | https://routescan.io            | https://api.routescan.io/v2/network/testnet/evm/114/etherscan/api    |
| 56       | BinanceSmartChain        | https://bscscan.com             | https://api.bscscan.com/api                                          |
| 97       | BinanceSmartChainTestnet | https://bscscan.com             | https://api-testnet.bscscan.com/api                                  |
| 137      | Polygon                  | https://polygonscan.com         | https://api.polygonscan.com/api                                      |
| 80002    | PolygonAmoy              | https://polygonscan.com         | https://api-amoy.polygonscan.com/api                                 |
| 185      | Mint                     | https://routescan.io            | https://api.routescan.io/v2/network/mainnet/evm/185/etherscan/api    |
| 1687     | MintSepolia              | https://routescan.io            | https://api.routescan.io/v2/network/testnet/evm/1687/etherscan/api   |
| 204      | BinanceOpBnbMainnet      | https://opbnb.bscscan.com       | https://api-opbnb.bscscan.com/api                                    |
| 5611     | BinanceOpBnbTestnet      | https://opbnb.bscscan.com       | https://api-opbnb-testnet.bscscan.com/api                            |
| 250      | Fantom                   | https://ftmscan.com             | https://api.ftmscan.com/api                                          |
| 4002     | FantomTestnet            | https://ftmscan.com             | https://api-testnet.ftmscan.com/api                                  |
| 5000     | Mantle                   | https://mantlescan.xyz          | https://api.mantlescan.xyz/api                                       |
| 5003     | MantleSepolia            | https://mantlescan.xyz          | https://api-sepolia.mantlescan.xyz/api                               |
| 8453     | Base                     | https://basescan.org            | https://api.basescan.org/api                                         |
| 84532    | BaseSepolia              | https://basescan.org            | https://api-sepolia.basescan.org/api                                 |
| 42161    | Arbitrum                 | https://arbiscan.io             | https://api.arbiscan.io/api                                          |
| 42170    | ArbitrumNova             | https://arbiscan.io             | https://api-nova.arbiscan.io/api                                     |
| 421614   | ArbitrumSepolia          | https://arbiscan.io             | https://api-sepolia.arbiscan.io/api                                  |
| 43114    | AvalancheCChain          | https://routescan.io            | https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan/api  |
| 43113    | AvalancheCChainFuji      | https://routescan.io            | https://api.routescan.io/v2/network/testnet/evm/43113/etherscan/api  |
| 42220    | Celo                     | https://celoscan.io             | https://api.celoscan.io/api                                          |
| 44787    | CeloAlfajores            | https://celoscan.io             | https://api-alfajores.celoscan.io/api                                |
| 59144    | Linea                    | https://lineascan.build         | https://api.lineascan.build/api                                      |
| 59141    | LineaSepolia             | https://lineascan.build         | https://api-sepolia.lineascan.build/api                              |
| 167000   | Taiko                    | https://taikoscan.io            | https://api.taikoscan.io/api                                         |
| 167000   | TaikoHeklaL2             | https://taikoscan.io            | https://api-hekla.taikoscan.io/api                                   |
| 432204   | Dexalot                  | https://routescan.io            | https://api.routescan.io/v2/network/mainnet/evm/432204/etherscan/api |
| 432201   | DexalotTestnet           | https://routescan.io            | https://api.routescan.io/v2/network/testnet/evm/432201/etherscan/api |
