# ![https://routescan.io/](https://raw.githubusercontent.com/Separator/routescan-client/112ae05e0885cc67d3c55ce68e394e93e826c5ea/img/logo.svg) Routescan client

Client for receiving blockchain data through block explorers (in particular, routescan).

```javascript
import { BlockExplorerCommon, BlockExplorerTag, Chain } from 'routescan-client';

const ROUTESCAN_API_KEY = 'YourApiKey';
const WALLET = '0x285f5F8Cd290Cff6596337C4eEC14e1a62235854';

async function main() {
  const blockExplorer = BlockExplorerCommon.build({
    chain: Chain.AvalancheCChainFuji,
    apiKey: ROUTESCAN_API_KEY
  });

  // Get block number:
  const blockNumber = await blockExplorer.getBlockNumber();
  console.log(`Current block number is ${blockNumber}`);

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

  // Get ERC20-Token Account Balance for TokenContractAddress:
  const tokenBalance = await blockExplorer.getAccountTokenBalance({
    contractAddress: '0x57d90b64a1a57749b0f932f1a3395792e12e7055',
    address: WALLET
  });
  console.log(`Balance of ${WALLET} is ${tokenBalance}`);
}

main();
```
