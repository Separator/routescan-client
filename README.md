# routescan-client

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

  // Get AVAX balance for a single address:
  const balance = await blockExplorer.getAccountBalance({
    address: WALLET,
    tag: BlockExplorerTag.Latest
  });

  // Get AVAX balance for multiple addresses in a single call:
  const WALLET_SECOND = '0xCD5B8Ea4a848b1c576125f20F9aDe5F58FDf4D4f';
  const balances = await blockExplorer.getAccountsBalances({
    address: [WALLET, WALLET_SECOND].join(','),
    tag: BlockExplorerTag.Latest
  });

  console.log(balances);
}

main();
```
