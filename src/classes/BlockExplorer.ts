import axios from 'axios';

import {
  BlockExplorerAction,
  BlockExplorerBlockIdResponse,
  BlockExplorerClosest,
  BlockExplorerModule,
  BlockExplorerStatus,
  BlockExplorerTag,
  GetAccountBalanceResponse,
  GetAccountTokenBalanceResponse
} from '../types/block-explorer';
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
    const { apiKey = this.apiKey, chain = this.chain, closest = BlockExplorerClosest.After, timestamp } = options;
    const url = this.getBlockExplorerUrl(chain);

    const response = await axios.get<BlockExplorerBlockIdResponse>(url, {
      params: {
        action: BlockExplorerAction.GetBlockByTime,
        apiKey,
        closest,
        module: BlockExplorerModule.Block,
        timestamp
      }
    });

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(response.data.message);
    }

    return Number(response.data.result);
  }

  public async getAccountBalance(options: GetAccountBalanceOptions) {
    const { address, apiKey = this.apiKey, chain = this.chain, tag = BlockExplorerTag.Latest } = options;
    const url = this.getBlockExplorerUrl(chain);

    const response = await axios.get<GetAccountBalanceResponse>(url, {
      params: {
        action: BlockExplorerAction.Balance,
        address,
        apiKey,
        module: BlockExplorerModule.Account,
        tag
      }
    });

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(response.data.message);
    }

    return BigInt(response.data.result);
  }

  public async getAccountTokenBalance(options: GetAccountTokenBalanceOptions) {
    const { address, apiKey = this.apiKey, chain = this.chain, contractAddress, tag = BlockExplorerTag.Latest } = options;
    const url = this.getBlockExplorerUrl(chain);

    const response = await axios.get<GetAccountTokenBalanceResponse>(url, {
      params: {
        action: BlockExplorerAction.TokenBalance,
        address,
        apiKey,
        contractaddress: contractAddress,
        module: BlockExplorerModule.Account,
        tag
      }
    });

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(response.data.message);
    }

    return BigInt(response.data.result);
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
