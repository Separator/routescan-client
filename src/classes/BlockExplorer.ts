import axios, { AxiosRequestConfig } from 'axios';

import {
  BlockCountdownTime,
  BlockExplorerAction,
  BlockExplorerBlockCountdownTimeResponse,
  BlockExplorerBlockIdResponse,
  BlockExplorerClosest,
  BlockExplorerErc20TokenTransferEvent,
  BlockExplorerInternalTxListResponse,
  BlockExplorerModule,
  BlockExplorerStatus,
  BlockExplorerTag,
  BlockExplorerTransaction,
  BlockExplorerTxInternal,
  BlockExplorerTxListResponse,
  EventLog,
  GetAccountBalanceResponse,
  GetAccountTokenBalanceResponse,
  GetAccountsBalanceResponse,
  GetErc20TokenTransferEventsListResponse,
  GetEventLogsByAddressFilteredResponse,
  GetEventLogsByAddressResponse,
  GetEventLogsByTopicsResponse
} from '../types/block-explorer';
import {
  BlockExplorer,
  BlockExplorerType,
  GetAccountBalanceOptions,
  GetAccountTokenBalanceOptions,
  GetAccountsBalanceOptions,
  GetBlockCountdownTimeOptions,
  GetBlockNumberByTimestampOptions,
  GetInternalTxListByAddressOptions,
  GetNormalTxListByAddressOptions,
  GetEventLogsByAddressFilteredOptions,
  GetEventLogsByTopicsOptions,
  GetEventLogsByAddressOptions,
  GetErc20TokenTransferEventsListOptions
} from '../interfaces/BlockExplorer';
import { Chain, ChainItem } from '../types/chains';

import { chains } from '../data/chains';

const TX_NO_FOUND_MESSAGE = 'No transactions found';

export interface BlockExplorerOptions {
  /**
   * @description Chain id
   */
  chain: Chain;
  /**
   * @description API key to work with blockchain explorer
   */
  apiKey?: string;
  /**
   * @description Custom block explorer url
   */
  url?: string;
  /**
   * Axios request config
   */
  axiosOptions?: AxiosRequestConfig;
}

export abstract class BlockExplorerCommon implements BlockExplorer {
  protected url: string = '';
  protected apikey: string = '';
  protected chain: Chain = Chain.NotSpecified;
  protected axiosOptions: AxiosRequestConfig = {};

  constructor(options: BlockExplorerOptions) {
    const { apiKey = '', chain, url = '', axiosOptions = {} } = options;
    this.apikey = apiKey;
    this.chain = chain;
    this.axiosOptions = axiosOptions;

    if (url) {
      this.url = url;
    } else {
      this.url = this.getBlockExplorerUrl(chain);
    }
  }

  public abstract getBlockCountdownTime(options: GetBlockCountdownTimeOptions): Promise<BlockCountdownTime>;
  public abstract getBlockNumberByTimestamp(options: GetBlockNumberByTimestampOptions): Promise<number>;
  public abstract getAccountBalance(options: GetAccountBalanceOptions): Promise<bigint>;
  public abstract getAccountTokenBalance(options: GetAccountTokenBalanceOptions): Promise<bigint>;
  public abstract getAccountsBalances(options: GetAccountsBalanceOptions): Promise<{ account: string; balance: BigInt }[]>;
  public abstract getNormalTxListByAddress(options: GetNormalTxListByAddressOptions): Promise<BlockExplorerTransaction[]>;
  public abstract getInternalTxListByAddress(options: GetInternalTxListByAddressOptions): Promise<BlockExplorerTxInternal[]>;
  public abstract getErc20TokenTransferEventsList(
    options: GetErc20TokenTransferEventsListOptions
  ): Promise<BlockExplorerErc20TokenTransferEvent[]>;
  public abstract getEventLogsByAddress(options: GetEventLogsByAddressOptions): Promise<EventLog[]>;
  public abstract getEventLogsByTopics(options: GetEventLogsByTopicsOptions): Promise<EventLog[]>;
  public abstract getEventLogsByAddressFiltered(options: GetEventLogsByAddressFilteredOptions): Promise<EventLog[]>;

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

  public getChain(): Chain {
    return this.chain;
  }

  public getApiKey(): string {
    return this.apikey;
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

  getAxiosRequestConfig(params: any): AxiosRequestConfig {
    const { apikey, axiosOptions } = this;

    return {
      ...axiosOptions,
      headers: {
        'User-Agent': ''
      },
      params: {
        apikey,
        ...params
      }
    };
  }
}

export class BlockExplorerEthereum extends BlockExplorerCommon {
  constructor(options: BlockExplorerOptions) {
    super(options);
  }

  public async getBlockCountdownTime(options: GetBlockCountdownTimeOptions): Promise<BlockCountdownTime> {
    const response = await axios.get<BlockExplorerBlockCountdownTimeResponse>(
      this.url,
      this.getAxiosRequestConfig({
        ...options,
        module: BlockExplorerModule.Block,
        action: BlockExplorerAction.GetBlockCountdown
      })
    );

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(JSON.stringify(response.data));
    }

    return response.data.result;
  }

  public async getBlockNumberByTimestamp(options: GetBlockNumberByTimestampOptions) {
    const { closest = BlockExplorerClosest.After, timestamp } = options;

    const response = await axios.get<BlockExplorerBlockIdResponse>(
      this.url,
      this.getAxiosRequestConfig({
        module: BlockExplorerModule.Block,
        action: BlockExplorerAction.GetBlockByTime,
        closest,
        timestamp
      })
    );

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(JSON.stringify(response.data));
    }

    return Number(response.data.result);
  }

  public async getAccountBalance(options: GetAccountBalanceOptions) {
    const { address, tag = BlockExplorerTag.Latest } = options;

    const response = await axios.get<GetAccountBalanceResponse>(
      this.url,
      this.getAxiosRequestConfig({
        module: BlockExplorerModule.Account,
        action: BlockExplorerAction.Balance,
        address,
        tag
      })
    );

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(JSON.stringify(response.data));
    }

    return BigInt(response.data.result);
  }

  public async getAccountsBalances(options: GetAccountsBalanceOptions) {
    const { address, tag = BlockExplorerTag.Latest } = options;

    const response = await axios.get<GetAccountsBalanceResponse>(
      this.url,
      this.getAxiosRequestConfig({
        module: BlockExplorerModule.Account,
        action: BlockExplorerAction.BalanceMulti,
        address,
        tag
      })
    );

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(JSON.stringify(response.data));
    }

    return response.data.result.map(({ account, balance }) => ({
      account,
      balance: BigInt(balance)
    }));
  }

  public async getNormalTxListByAddress(options: GetNormalTxListByAddressOptions) {
    const response = await axios.get<BlockExplorerTxListResponse>(
      this.url,
      this.getAxiosRequestConfig({
        ...options,
        module: BlockExplorerModule.Account,
        action: BlockExplorerAction.TxList
      })
    );

    if (response.data.status !== BlockExplorerStatus.Success) {
      if (response.data.message === TX_NO_FOUND_MESSAGE) {
        return [];
      }
      throw new Error(JSON.stringify(response.data));
    }

    return response.data.result;
  }

  public async getInternalTxListByAddress(options: GetNormalTxListByAddressOptions): Promise<BlockExplorerTxInternal[]> {
    const response = await axios.get<BlockExplorerInternalTxListResponse>(
      this.url,
      this.getAxiosRequestConfig({
        ...options,
        module: BlockExplorerModule.Account,
        action: BlockExplorerAction.TxListInternal
      })
    );

    if (response.data.status !== BlockExplorerStatus.Success) {
      if (response.data.message === TX_NO_FOUND_MESSAGE) {
        return [];
      }
      throw new Error(JSON.stringify(response.data));
    }

    return response.data.result;
  }

  public async getErc20TokenTransferEventsList(
    options: GetErc20TokenTransferEventsListOptions
  ): Promise<BlockExplorerErc20TokenTransferEvent[]> {
    const response = await axios.get<GetErc20TokenTransferEventsListResponse>(
      this.url,
      this.getAxiosRequestConfig({
        ...options,
        module: BlockExplorerModule.Account,
        action: BlockExplorerAction.TokenTxList
      })
    );

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(JSON.stringify(response.data));
    }

    return response.data.result;
  }

  public async getAccountTokenBalance(options: GetAccountTokenBalanceOptions) {
    const { address, contractAddress, tag = BlockExplorerTag.Latest } = options;

    const response = await axios.get<GetAccountTokenBalanceResponse>(
      this.url,
      this.getAxiosRequestConfig({
        module: BlockExplorerModule.Account,
        action: BlockExplorerAction.TokenBalance,
        address,
        contractaddress: contractAddress,
        tag
      })
    );

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(JSON.stringify(response.data));
    }

    return BigInt(response.data.result);
  }

  public async getEventLogsByAddress(options: GetEventLogsByAddressOptions): Promise<EventLog[]> {
    const response = await axios.get<GetEventLogsByAddressResponse>(
      this.url,
      this.getAxiosRequestConfig({
        ...options,
        module: BlockExplorerModule.Logs,
        action: BlockExplorerAction.GetLogs
      })
    );

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(JSON.stringify(response.data));
    }

    return response.data.result;
  }

  public async getEventLogsByTopics(options: GetEventLogsByTopicsOptions) {
    const response = await axios.get<GetEventLogsByTopicsResponse>(
      this.url,
      this.getAxiosRequestConfig({
        ...options,
        module: BlockExplorerModule.Logs,
        action: BlockExplorerAction.GetLogs
      })
    );

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(JSON.stringify(response.data));
    }

    return response.data.result;
  }

  public async getEventLogsByAddressFiltered(options: GetEventLogsByAddressFilteredOptions) {
    const response = await axios.get<GetEventLogsByAddressFilteredResponse>(
      this.url,
      this.getAxiosRequestConfig({
        ...options,
        module: BlockExplorerModule.Logs,
        action: BlockExplorerAction.GetLogs
      })
    );

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(JSON.stringify(response.data));
    }

    return response.data.result;
  }

  protected getBlockExplorerUrl(chain: Chain = this.chain): string {
    const chainOptions = BlockExplorerCommon.getChainOptions(chain);
    const { blockExplorerUrl } = chainOptions;
    return blockExplorerUrl;
  }
}

export class BlockExplorerRoutescan extends BlockExplorerEthereum {}

export class BlockExplorerChainlens extends BlockExplorerRoutescan {}
