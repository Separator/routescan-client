import {
  BlockExplorer,
  BlockExplorerType,
  GetAccountBalanceOptions,
  GetAccountTokenBalanceOptions,
  GetBlockNumberOptions
} from '../interfaces/BlockExplorer';
import { Chain } from '../types/chains';
import { ChainType } from '../types/routescan';

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

  abstract getBlockNumber(options: GetBlockNumberOptions): Promise<number>;
  abstract getAccountBalance(options: GetAccountBalanceOptions): Promise<bigint>;
  abstract getAccountTokenBalance(options: GetAccountTokenBalanceOptions): Promise<bigint>;

  public static build(options: BlockExplorerOptions): BlockExplorer {
    const { chain } = options;
    if (!chain) {
      throw new Error('Please specify the chain id');
    }

    const chainOptions = chains.find(({ id }) => id === chain);
    if (!chainOptions) {
      throw new Error(`Chain with id of ${chain} is not supported`);
    }

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

  private getBlockExplorerUrl(chain: Chain = this.chain): string {
    if (!chain) {
      throw new Error(`Chain id not specified`);
    }

    const chainOptions = chains.find(({ id }) => id === chain);
    if (!chainOptions) {
      throw new Error(`Chain with id of ${chain} is not supported`);
    }

    const { type } = chainOptions;

    const { url } = this.config;
    const chainType = is_main_net ? ChainType.MainNet : ChainType.TestNet;
    return `${url}/${chainType}/evm/${chain}/etherscan/api`;
  }
}

export class BlockExplorerEthereum extends BlockExplorerRoutescan {}

export class BlockExplorerChainlens extends BlockExplorerRoutescan {}
