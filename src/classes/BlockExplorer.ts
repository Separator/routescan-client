import { Chain } from '../types/chains';

export interface BlockExplorer {
  getBlockId: () => Promise<number>;
}

export interface BlockExplorerOptions {
  /**
   * @description Chain id
   */
  chain?: Chain;
  /**
   * @description API key to work with blockchain explorer
   */
  apiKey: string;
}

class BlockExplorerRoutescan {
  constructor(options: BlockExplorerOptions) {}
}
