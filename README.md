# routescan-client

Client for receiving blockchain data through block explorers (in particular, routescan).

```javascript
import { BlockExplorerCommon, BlockExplorerTag, Chain } from 'routescan-client';

const YOUR_API_KEY_FOR_ROUTESCAN = 'YourApiKey';

async function main() {
  const blockExplorer = BlockExplorerCommon.build({
    chain: Chain.AvalancheCChainFuji,
    apiKey: YOUR_API_KEY_FOR_ROUTESCAN
  });

  // Get Ether Balance for a Single Address:
  const YOUR_AVALANCHE_FUJI_WALLET_ADDRESS = '0x285f5F8Cd290Cff6596337C4eEC14e1a62235854';
  const balance = await blockExplorer.getAccountBalance({
    address: YOUR_AVALANCHE_FUJI_WALLET_ADDRESS,
    tag: BlockExplorerTag.Latest
  });
  console.log(`Your avax balance is ${balance.toString()}`);
}

main();
```
