import axios from 'axios';

import {
  BlockCountdownTime,
  BlockExplorerAction,
  BlockExplorerBlockCountdownTimeResponse,
  BlockExplorerBlockIdResponse,
  BlockExplorerClosest,
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
  GetEventLogsByAddressFilteredResponse
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
  getEventLogsByAddressFilteredOptions
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
  apiKey: string;
}

export abstract class BlockExplorerCommon implements BlockExplorer {
  protected url: string = '';
  protected apikey: string = '';
  protected chain: Chain = Chain.NotSpecified;

  constructor(options: BlockExplorerOptions) {
    const { apiKey, chain } = options;
    this.apikey = apiKey;
    this.chain = chain;
    this.url = this.getBlockExplorerUrl(chain);
  }

  public abstract getBlockCountdownTime(options: GetBlockCountdownTimeOptions): Promise<BlockCountdownTime>;
  public abstract getBlockNumberByTimestamp(options: GetBlockNumberByTimestampOptions): Promise<number>;
  public abstract getAccountBalance(options: GetAccountBalanceOptions): Promise<bigint>;
  public abstract getAccountTokenBalance(options: GetAccountTokenBalanceOptions): Promise<bigint>;
  public abstract getAccountsBalances(options: GetAccountsBalanceOptions): Promise<{ account: string; balance: BigInt }[]>;
  public abstract GetNormalTxListByAddress(options: GetNormalTxListByAddressOptions): Promise<BlockExplorerTransaction[]>;
  public abstract GetInternalTxListByAddress(options: GetInternalTxListByAddressOptions): Promise<BlockExplorerTxInternal[]>;
  public abstract getEventLogsByAddressFiltered(options: getEventLogsByAddressFilteredOptions): Promise<EventLog[]>;

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

  public async getBlockCountdownTime({ blockno }: GetBlockCountdownTimeOptions): Promise<BlockCountdownTime> {
    const { apikey, url } = this;

    const response = await axios.get<BlockExplorerBlockCountdownTimeResponse>(url, {
      params: {
        module: BlockExplorerModule.Block,
        action: BlockExplorerAction.GetBlockCountdown,
        apikey,
        blockno
      }
    });

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(response.data.message);
    }

    return response.data.result;
  }

  public async getBlockNumberByTimestamp(options: GetBlockNumberByTimestampOptions) {
    const { apikey, url } = this;
    const { closest = BlockExplorerClosest.After, timestamp } = options;

    const response = await axios.get<BlockExplorerBlockIdResponse>(url, {
      params: {
        module: BlockExplorerModule.Block,
        action: BlockExplorerAction.GetBlockByTime,
        apikey,
        closest,
        timestamp
      }
    });

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(response.data.message);
    }

    return Number(response.data.result);
  }

  public async getAccountBalance(options: GetAccountBalanceOptions) {
    const { apikey, url } = this;
    const { address, tag = BlockExplorerTag.Latest } = options;

    const response = await axios.get<GetAccountBalanceResponse>(url, {
      params: {
        module: BlockExplorerModule.Account,
        action: BlockExplorerAction.Balance,
        address,
        apikey,
        tag
      }
    });

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(response.data.message);
    }

    return BigInt(response.data.result);
  }

  public async getAccountsBalances(options: GetAccountsBalanceOptions) {
    const { apikey, url } = this;
    const { address, tag = BlockExplorerTag.Latest } = options;

    const response = await axios.get<GetAccountsBalanceResponse>(url, {
      params: {
        module: BlockExplorerModule.Account,
        action: BlockExplorerAction.BalanceMulti,
        address,
        apikey,
        tag
      }
    });

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(response.data.message);
    }

    return response.data.result.map(({ account, balance }) => ({
      account,
      balance: BigInt(balance)
    }));
  }

  public async GetNormalTxListByAddress(options: GetNormalTxListByAddressOptions) {
    const { apikey, url } = this;
    const { address, startblock, endblock, page, offset, sort } = options;

    const response = await axios.get<BlockExplorerTxListResponse>(url, {
      params: {
        module: BlockExplorerModule.Account,
        action: BlockExplorerAction.TxList,
        address,
        startblock,
        endblock,
        page,
        offset,
        sort,
        apikey
      }
    });

    if (response.data.status !== BlockExplorerStatus.Success) {
      if (response.data.message === TX_NO_FOUND_MESSAGE) {
        return [];
      }
      throw new Error(response.data.message);
    }

    return response.data.result;
  }

  public async GetInternalTxListByAddress(options: GetNormalTxListByAddressOptions): Promise<BlockExplorerTxInternal[]> {
    const { apikey, url } = this;
    const { address, startblock, endblock, page, offset, sort } = options;

    const response = await axios.get<BlockExplorerInternalTxListResponse>(url, {
      params: {
        module: BlockExplorerModule.Account,
        action: BlockExplorerAction.TxListInternal,
        address,
        startblock,
        endblock,
        page,
        offset,
        sort,
        apikey
      }
    });

    if (response.data.status !== BlockExplorerStatus.Success) {
      if (response.data.message === TX_NO_FOUND_MESSAGE) {
        return [];
      }
      throw new Error(response.data.message);
    }

    return response.data.result;
  }

  public async getAccountTokenBalance(options: GetAccountTokenBalanceOptions) {
    const { apikey, url } = this;
    const { address, contractAddress, tag = BlockExplorerTag.Latest } = options;

    const response = await axios.get<GetAccountTokenBalanceResponse>(url, {
      params: {
        action: BlockExplorerAction.TokenBalance,
        address,
        apikey,
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

  public async getEventLogsByAddressFiltered(options: getEventLogsByAddressFilteredOptions) {
    const { apikey, url } = this;
    const {
      address,
      fromBlock = 0,
      toBlock = Number.MAX_SAFE_INTEGER,
      topic0,
      topic0_1_opr,
      topic1,
      topic2,
      topic3,
      page,
      offset
    } = options;

    const response = await axios.get<GetEventLogsByAddressFilteredResponse>(url, {
      params: {
        module: BlockExplorerModule.Logs,
        action: BlockExplorerAction.GetLogs,
        fromBlock,
        toBlock,
        address,
        topic0_1_opr,
        topic0,
        topic1,
        topic2,
        topic3,
        page,
        offset,
        apikey
      }
    });

    if (response.data.status !== BlockExplorerStatus.Success) {
      throw new Error(response.data.message);
    }

    return response.data.result;
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
