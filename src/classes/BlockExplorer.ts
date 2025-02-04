import { AxiosRequestConfig } from 'axios';

import { chains } from '../data/chains';
import { BlockExplorerType } from '../types/type';
import { Chain, ChainItem } from '../types/chains';
import { AxiosTransport, Transport } from './Transport';
import { BlockExplorer } from '../interfaces/BlockExplorer';
import { BlockExplorerBlockItem, BlockExplorerBlockUncleItem, BlockCountdownTime } from '../types/block';
import {
  BlockExplorerAction,
  BlockExplorerClosest,
  BlockExplorerModule,
  BlockExplorerStatus,
  BlockExplorerTag
} from '../types/params';
import {
  BlockExplorerErc20TokenTransferEvent,
  BlockExplorerReceiptStatus,
  BlockExplorerTransaction,
  BlockExplorerTxInternal,
  BlockExplorerTxInternalByTxHash,
  BlockExplorerTxReceipt,
  BlockExplorerTxRpc,
  BlockExplorerTxStatus
} from '../types/transaction';
import {
  BlockExplorerBlockCountdownTimeResponse,
  BlockExplorerBlockIdResponse,
  BlockExplorerContractExecutionStatusResponse,
  BlockExplorerEthBlockByNumberResponse,
  BlockExplorerEthBlockNumberResponse,
  BlockExplorerEthBlockTransactionCountByNumberResponse,
  BlockExplorerEthCallResponse,
  BlockExplorerEthEstimateGasResponse,
  BlockExplorerEthGasPriceResponse,
  BlockExplorerEthGetCodeResponse,
  BlockExplorerEthGetStorageAtResponse,
  BlockExplorerEthGetTransactionReceiptResponse,
  BlockExplorerEthSendRawTransactionResponse,
  BlockExplorerEthTransactionByBlockNumberAndIndexResponse,
  BlockExplorerEthTransactionByHashResponse,
  BlockExplorerEthTransactionCountResponse,
  BlockExplorerEthUncleByBlockNumberAndIndexResponse,
  BlockExplorerInternalTxListByHashResponse,
  BlockExplorerInternalTxListResponse,
  BlockExplorerTransactionReceiptStatusResponse,
  BlockExplorerTxListResponse,
  BlockExplorerVerifySoliditySourceCodeResponse,
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
  GetErc20TokenTransferEventsListOptions,
  GetInternalTxListByTxHashOptions,
  GetEthBlockByNumberOptions,
  GetEthUncleByBlockNumberAndIndexOptions,
  GetEthBlockTransactionCountByNumberOptions,
  GetEthTransactionByHashOptions,
  GetEthTransactionByBlockNumberAndIndexOptions,
  GetEthTransactionCountOptions,
  GetEthSendRawTransactionOptions,
  GetEthTransactionReceiptOptions,
  GetEthCallOptions,
  GetEthCodeOptions,
  GetEthStorageAtOptions,
  GetEthEstimateGasOptions,
  GetContractExecutionStatusOptions,
  VerifySoliditySourceCodeOptions
} from '../types/options';

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
  protected chain: Chain = Chain.NotSpecified;
  protected transport: Transport;

  constructor(options: BlockExplorerOptions) {
    const { apiKey = '', chain, url = '', axiosOptions = {} } = options;

    this.chain = chain;
    const transportUrl = url || this.getBlockExplorerUrl(chain);
    this.transport = new AxiosTransport(transportUrl, apiKey, axiosOptions);
  }

  public abstract getBlockCountdownTime(options: GetBlockCountdownTimeOptions): Promise<BlockCountdownTime>;
  public abstract getBlockNumberByTimestamp(options: GetBlockNumberByTimestampOptions): Promise<number>;
  public abstract getAccountBalance(options: GetAccountBalanceOptions): Promise<bigint>;
  public abstract getAccountTokenBalance(options: GetAccountTokenBalanceOptions): Promise<bigint>;
  public abstract getAccountsBalances(options: GetAccountsBalanceOptions): Promise<{ account: string; balance: BigInt }[]>;
  public abstract getNormalTxListByAddress(options: GetNormalTxListByAddressOptions): Promise<BlockExplorerTransaction[]>;
  public abstract getInternalTxListByAddress(options: GetInternalTxListByAddressOptions): Promise<BlockExplorerTxInternal[]>;
  public abstract getInternalTxListByTxHash(
    options: GetInternalTxListByTxHashOptions
  ): Promise<BlockExplorerTxInternalByTxHash[]>;
  public abstract getErc20TokenTransferEventsList(
    options: GetErc20TokenTransferEventsListOptions
  ): Promise<BlockExplorerErc20TokenTransferEvent[]>;
  public abstract getEventLogsByAddress(options: GetEventLogsByAddressOptions): Promise<EventLog[]>;
  public abstract getEventLogsByTopics(options: GetEventLogsByTopicsOptions): Promise<EventLog[]>;
  public abstract getEventLogsByAddressFiltered(options: GetEventLogsByAddressFilteredOptions): Promise<EventLog[]>;
  public abstract eth_blockNumber(): Promise<bigint>;
  public abstract eth_getBlockByNumber(options: GetEthBlockByNumberOptions): Promise<BlockExplorerBlockItem>;
  public abstract eth_getUncleByBlockNumberAndIndex(
    options: GetEthUncleByBlockNumberAndIndexOptions
  ): Promise<BlockExplorerBlockUncleItem>;
  public abstract eth_getBlockTransactionCountByNumber(options: GetEthBlockTransactionCountByNumberOptions): Promise<bigint>;
  public abstract eth_getTransactionByHash(options: GetEthTransactionByHashOptions): Promise<BlockExplorerTxRpc>;
  public abstract eth_getTransactionByBlockNumberAndIndex(
    options: GetEthTransactionByBlockNumberAndIndexOptions
  ): Promise<BlockExplorerTxRpc>;
  public abstract eth_getTransactionCount(options: GetEthTransactionCountOptions): Promise<bigint>;
  public abstract eth_sendRawTransaction(options: GetEthSendRawTransactionOptions): Promise<string>;
  public abstract eth_getTransactionReceipt(options: GetEthTransactionReceiptOptions): Promise<BlockExplorerTxReceipt>;
  public abstract eth_call(options: GetEthCallOptions): Promise<string>;
  public abstract eth_getCode(options: GetEthCodeOptions): Promise<string>;
  public abstract eth_getStorageAt(options: GetEthStorageAtOptions): Promise<string>;
  public abstract eth_gasPrice(): Promise<string>;
  public abstract eth_estimateGas(options: GetEthEstimateGasOptions): Promise<string>;
  public abstract getContractExecutionStatus(options: GetContractExecutionStatusOptions): Promise<BlockExplorerTxStatus>;
  public abstract checkTransactionReceiptStatus(options: GetContractExecutionStatusOptions): Promise<BlockExplorerReceiptStatus>;
  public abstract verifySoliditySourceCode(options: VerifySoliditySourceCodeOptions): Promise<string>;

  protected abstract getBlockExplorerUrl(chain: Chain): string;

  public static build(options: BlockExplorerOptions): BlockExplorer {
    try {
      const { chain } = options;
      const chainOptions = BlockExplorerCommon.getChainOptions(chain);

      const { blockExplorerType } = chainOptions;
      switch (blockExplorerType) {
        case BlockExplorerType.Ethereum:
          return new BlockExplorerEthereum(options);
        case BlockExplorerType.Routescan:
          return new BlockExplorerRoutescan(options);
      }
    } catch (e) {
      return new BlockExplorerEthereum(options);
    }
  }

  public getChain(): Chain {
    return this.chain;
  }

  public getApiKey(): string {
    return this.transport.getApiKey();
  }

  public getUrl(): string {
    return this.transport.getUrl();
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

export class BlockExplorerEthereum extends BlockExplorerCommon {
  private checkResponseStatus(response: any) {
    if (response.data.status && response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(JSON.stringify(response.data));
    }

    if (response.data?.error?.message) {
      throw new Error(JSON.stringify(response.data));
    }
  }

  public async getBlockCountdownTime(options: GetBlockCountdownTimeOptions): Promise<BlockCountdownTime> {
    const response = await this.transport.get<BlockExplorerBlockCountdownTimeResponse>({
      ...options,
      module: BlockExplorerModule.Block,
      action: BlockExplorerAction.GetBlockCountdown
    });

    this.checkResponseStatus(response);
    return response.data.result;
  }

  public async getBlockNumberByTimestamp(options: GetBlockNumberByTimestampOptions) {
    const { closest = BlockExplorerClosest.After, timestamp } = options;

    const response = await this.transport.get<BlockExplorerBlockIdResponse>({
      module: BlockExplorerModule.Block,
      action: BlockExplorerAction.GetBlockByTime,
      closest,
      timestamp
    });

    this.checkResponseStatus(response);
    return Number(response.data.result);
  }

  public async getAccountBalance(options: GetAccountBalanceOptions) {
    const { address, tag = BlockExplorerTag.Latest } = options;

    const response = await this.transport.get<GetAccountBalanceResponse>({
      module: BlockExplorerModule.Account,
      action: BlockExplorerAction.Balance,
      address,
      tag
    });

    this.checkResponseStatus(response);
    return BigInt(response.data.result);
  }

  public async getAccountsBalances(options: GetAccountsBalanceOptions) {
    const { address, tag = BlockExplorerTag.Latest } = options;

    const response = await this.transport.get<GetAccountsBalanceResponse>({
      module: BlockExplorerModule.Account,
      action: BlockExplorerAction.BalanceMulti,
      address,
      tag
    });

    this.checkResponseStatus(response);

    return response.data.result.map(({ account, balance }) => ({
      account,
      balance: BigInt(balance)
    }));
  }

  public async getNormalTxListByAddress(options: GetNormalTxListByAddressOptions) {
    const response = await this.transport.get<BlockExplorerTxListResponse>({
      ...options,
      module: BlockExplorerModule.Account,
      action: BlockExplorerAction.TxList
    });

    if (response.data.message === TX_NO_FOUND_MESSAGE) {
      return [];
    }

    this.checkResponseStatus(response);
    return response.data.result;
  }

  public async getInternalTxListByAddress(options: GetNormalTxListByAddressOptions): Promise<BlockExplorerTxInternal[]> {
    const response = await this.transport.get<BlockExplorerInternalTxListResponse>({
      ...options,
      module: BlockExplorerModule.Account,
      action: BlockExplorerAction.TxListInternal
    });

    if (response.data.message === TX_NO_FOUND_MESSAGE) {
      return [];
    }
    this.checkResponseStatus(response);
    return response.data.result;
  }

  public async getInternalTxListByTxHash(options: GetInternalTxListByTxHashOptions): Promise<BlockExplorerTxInternalByTxHash[]> {
    const response = await this.transport.get<BlockExplorerInternalTxListByHashResponse>({
      ...options,
      module: BlockExplorerModule.Account,
      action: BlockExplorerAction.TxListInternal
    });

    if (response.data.message === TX_NO_FOUND_MESSAGE) {
      return [];
    }
    this.checkResponseStatus(response);
    return response.data.result;
  }

  public async getErc20TokenTransferEventsList(
    options: GetErc20TokenTransferEventsListOptions
  ): Promise<BlockExplorerErc20TokenTransferEvent[]> {
    const response = await this.transport.get<GetErc20TokenTransferEventsListResponse>({
      ...options,
      module: BlockExplorerModule.Account,
      action: BlockExplorerAction.TokenTxList
    });

    this.checkResponseStatus(response);
    return response.data.result;
  }

  public async getAccountTokenBalance(options: GetAccountTokenBalanceOptions) {
    const { address, contractAddress, tag = BlockExplorerTag.Latest } = options;

    const response = await this.transport.get<GetAccountTokenBalanceResponse>({
      module: BlockExplorerModule.Account,
      action: BlockExplorerAction.TokenBalance,
      address,
      contractaddress: contractAddress,
      tag
    });

    this.checkResponseStatus(response);
    return BigInt(response.data.result);
  }

  public async getEventLogsByAddress(options: GetEventLogsByAddressOptions): Promise<EventLog[]> {
    const response = await this.transport.get<GetEventLogsByAddressResponse>({
      ...options,
      module: BlockExplorerModule.Logs,
      action: BlockExplorerAction.GetLogs
    });

    this.checkResponseStatus(response);
    return response.data.result;
  }

  public async getEventLogsByTopics(options: GetEventLogsByTopicsOptions) {
    const response = await this.transport.get<GetEventLogsByTopicsResponse>({
      ...options,
      module: BlockExplorerModule.Logs,
      action: BlockExplorerAction.GetLogs
    });

    this.checkResponseStatus(response);
    return response.data.result;
  }

  public async getEventLogsByAddressFiltered(options: GetEventLogsByAddressFilteredOptions) {
    const response = await this.transport.get<GetEventLogsByAddressFilteredResponse>({
      ...options,
      module: BlockExplorerModule.Logs,
      action: BlockExplorerAction.GetLogs
    });

    this.checkResponseStatus(response);
    return response.data.result;
  }

  protected getBlockExplorerUrl(chain: Chain = this.chain): string {
    const chainOptions = BlockExplorerCommon.getChainOptions(chain);
    const { blockExplorerUrl } = chainOptions;
    return blockExplorerUrl;
  }

  /**
   * Contracts
   * https://routescan.io/documentation/etherscan-compatibility/contracts
   */

  public async verifySoliditySourceCode(options: VerifySoliditySourceCodeOptions): Promise<string> {
    const response = await this.transport.post<BlockExplorerVerifySoliditySourceCodeResponse>(
      {
        ...options
      },
      {
        module: BlockExplorerModule.Contract,
        action: BlockExplorerAction.VerifySourceCode
      }
    );

    this.checkResponseStatus(response);
    return response.data.result;
  }

  /**
   * Geth/Parity Proxy
   * https://docs.etherscan.io/api-endpoints/geth-parity-proxy
   */

  public async eth_blockNumber(): Promise<bigint> {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthBlockNumberResponse>({
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_blockNumber
    });

    this.checkResponseStatus(response);
    return BigInt(response.data.result as string);
  }

  public async eth_getBlockByNumber(options: GetEthBlockByNumberOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthBlockByNumberResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_getBlockByNumber
    });

    this.checkResponseStatus(response);
    return response.data.result as BlockExplorerBlockItem;
  }

  public async eth_getUncleByBlockNumberAndIndex(options: GetEthUncleByBlockNumberAndIndexOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthUncleByBlockNumberAndIndexResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_getUncleByBlockNumberAndIndex
    });

    this.checkResponseStatus(response);
    return response.data.result as BlockExplorerBlockUncleItem;
  }

  public async eth_getBlockTransactionCountByNumber(options: GetEthBlockTransactionCountByNumberOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthBlockTransactionCountByNumberResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_getBlockTransactionCountByNumber
    });

    this.checkResponseStatus(response);
    return BigInt(response.data.result as string);
  }

  public async eth_getTransactionByHash(options: GetEthTransactionByHashOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthTransactionByHashResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_getTransactionByHash
    });

    this.checkResponseStatus(response);
    return response.data.result as BlockExplorerTxRpc;
  }

  public async eth_getTransactionByBlockNumberAndIndex(options: GetEthTransactionByBlockNumberAndIndexOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthTransactionByBlockNumberAndIndexResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_getTransactionByBlockNumberAndIndex
    });

    this.checkResponseStatus(response);
    return response.data.result as BlockExplorerTxRpc;
  }

  public async eth_getTransactionCount(options: GetEthTransactionCountOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthTransactionCountResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_getTransactionCount
    });

    this.checkResponseStatus(response);
    return BigInt(response.data.result as string);
  }

  public async eth_sendRawTransaction(options: GetEthSendRawTransactionOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthSendRawTransactionResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_sendRawTransaction
    });

    this.checkResponseStatus(response);
    return response.data.result as string;
  }

  public async eth_getTransactionReceipt(options: GetEthTransactionReceiptOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthGetTransactionReceiptResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_getTransactionReceipt
    });

    this.checkResponseStatus(response);
    return response.data.result as BlockExplorerTxReceipt;
  }

  public async eth_call(options: GetEthCallOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthCallResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_call
    });

    this.checkResponseStatus(response);
    return response.data.result as string;
  }

  public async eth_getCode(options: GetEthCodeOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthGetCodeResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_getCode
    });

    this.checkResponseStatus(response);
    return response.data.result as string;
  }

  public async eth_getStorageAt(options: GetEthStorageAtOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthGetStorageAtResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_getStorageAt
    });

    this.checkResponseStatus(response);
    return response.data.result as string;
  }

  public async eth_gasPrice(): Promise<string> {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthGasPriceResponse>({
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_gasPrice
    });

    this.checkResponseStatus(response);
    return response.data.result as string;
  }

  public async eth_estimateGas(options: GetEthEstimateGasOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerEthEstimateGasResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Proxy,
      action: BlockExplorerAction.eth_estimateGas
    });

    this.checkResponseStatus(response);
    return response.data.result as string;
  }

  public async getContractExecutionStatus(options: GetContractExecutionStatusOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerContractExecutionStatusResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Transaction,
      action: BlockExplorerAction.GetStatus
    });

    this.checkResponseStatus(response);
    return response.data.result;
  }

  public async checkTransactionReceiptStatus(options: GetContractExecutionStatusOptions) {
    const { chain: chainid } = this;

    const response = await this.transport.get<BlockExplorerTransactionReceiptStatusResponse>({
      ...options,
      chainid,
      module: BlockExplorerModule.Transaction,
      action: BlockExplorerAction.GetTexReceiptStatus
    });

    this.checkResponseStatus(response);
    return response.data.result;
  }
}

export class BlockExplorerRoutescan extends BlockExplorerEthereum {}
