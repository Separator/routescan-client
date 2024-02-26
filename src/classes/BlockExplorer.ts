import {
  BlockExplorer,
  GetAccountBalanceOptions,
  GetAccountTokenBalanceOptions,
  GetBlockNumberOptions
} from '../interfaces/BlockExplorer';
import { Chain } from '../types/chains';
import { ChainType } from '../types/routescan';

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

  abstract getBlockNumber: (options: GetBlockNumberOptions) => Promise<number>;
  abstract getAccountBalance: (options: GetAccountBalanceOptions) => Promise<bigint>;
  abstract getAccountTokenBalance: (options: GetAccountTokenBalanceOptions) => Promise<bigint>;
}

export class BlockExplorerRoutescan extends BlockExplorerCommon {
  constructor(options: BlockExplorerOptions) {
    super(options);
  }

  public getBlockNumber(options: GetBlockNumberOptions) {}

  public getAccountBalance(options: GetAccountBalanceOptions) {}

  public getAccountTokenBalance(options: GetAccountTokenBalanceOptions) {}

  public getBlockExplorerUrl(): string {
    const { chain, is_main_net } = this;
    const { url } = this.config;
    const chainType = is_main_net ? ChainType.MainNet : ChainType.TestNet;
    return `${url}/${chainType}/evm/${chain}/etherscan/api`;
  }
}
