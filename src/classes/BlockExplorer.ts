import {
  BlockExplorer,
  BlockExplorerType,
  GetAccountBalanceOptions,
  GetAccountTokenBalanceOptions,
  GetBlockNumberOptions
} from '../interfaces/BlockExplorer';
import { Chain, ChainItem } from '../types/chains';

import { chains } from '../data/chains';

export interface BlockExplorerOptions {
  /**
   * @description Chain id
   */
  chain?: Chain;
  /**
   * @description API key to work with blockchain explorer
   */
  apiKey?: string;
}

abstract class BlockExplorerCommon implements BlockExplorer {
  protected apiKey: string = '';
  protected chain: Chain = Chain.NotSpecified;

  constructor(options: BlockExplorerOptions) {
    const { apiKey, chain } = options;
    if (apiKey) {
      this.apiKey = apiKey;
    }
    if (chain) {
      this.chain = chain;
    }
  }

  public abstract getBlockNumber(options: GetBlockNumberOptions): Promise<number>;
  public abstract getAccountBalance(options: GetAccountBalanceOptions): Promise<bigint>;
  public abstract getAccountTokenBalance(options: GetAccountTokenBalanceOptions): Promise<bigint>;
  protected abstract getBlockExplorerUrl(chain: Chain): string;

  public static build(options: BlockExplorerOptions): BlockExplorer {
    const { chain } = options;
    const chainOptions = BlockExplorerCommon.getChainOptions(chain);

    const { blockExplorerType } = chainOptions;
    switch (blockExplorerType) {
      case BlockExplorerType.Ethereum:
        return new BlockExplorerEthereum(options);
      case BlockExplorerType.Routescan:
        return new BlockExplorerRoutescan(options);
      case BlockExplorerType.Chainlens:
        return new BlockExplorerChainlens(options);
    }
  }

  public static getChainOptions(chain?: Chain): ChainItem {
    if (!chain) {
      throw new Error(`Chain id not specified`);
    }

    const chainOptions = chains.find(({ id }) => id === chain);
    if (!chainOptions) {
      throw new Error(`Chain with id of ${chain} is not supported`);
    }

    return chainOptions;
  }
}

export class BlockExplorerRoutescan extends BlockExplorerCommon {
  constructor(options: BlockExplorerOptions) {
    super(options);
  }

  public async getBlockNumber(options: GetBlockNumberOptions) {
    return 1;
  }

  public async getAccountBalance(options: GetAccountBalanceOptions) {
    return 1n;
  }

  public async getAccountTokenBalance(options: GetAccountTokenBalanceOptions) {
    return 1n;
  }

  protected getBlockExplorerUrl(chain: Chain = this.chain): string {
    const chainOptions = BlockExplorerCommon.getChainOptions(chain);
    const { blockExplorerUrl, type } = chainOptions;
    return `${blockExplorerUrl}/${type}/evm/${chain}/etherscan/api`;
  }
}

export class BlockExplorerEthereum extends BlockExplorerRoutescan {
  protected getBlockExplorerUrl(chain: Chain = this.chain): string {
    const chainOptions = BlockExplorerCommon.getChainOptions(chain);
    const { blockExplorerUrl } = chainOptions;
    return blockExplorerUrl;
  }
}

export class BlockExplorerChainlens extends BlockExplorerRoutescan {}
