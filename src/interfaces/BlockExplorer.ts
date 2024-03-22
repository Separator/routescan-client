import { Chain } from '../types/chains';
import {
  BlockCountdownTime,
  BlockExplorerClosest,
  BlockExplorerErc20TokenTransferEvent,
  BlockExplorerSort,
  BlockExplorerTag,
  BlockExplorerTopicOperation,
  BlockExplorerTransaction,
  BlockExplorerTxInternal,
  EventLog
} from '../types/block-explorer';

export enum BlockExplorerType {
  Routescan = 'routescan',
  Ethereum = 'ethereum',
  Chainlens = 'chainlens'
}

interface PaginationOptions {
  /**
   * @description The integer page number, if pagination is enabled
   */
  page?: number;
  /**
   * @description The number of records displayed per page
   */
  offset?: number;
}

interface BlockOptions {
  /**
   * @description The integer block number to start searching for records
   * @example 0
   */
  startblock?: number;
  /**
   * @description The integer block number to stop searching for records
   * @example 270257
   */
  endblock?: number;
  /**
   * @description The sorting preference, use **asc** to sort by ascending and **desc** to sort by descending
   */
  sort?: BlockExplorerSort;
}

export interface GetBlockCountdownTimeOptions {
  /**
   * @description The integer block number to estimate time remaining to be mined
   * @example 16701588000
   */
  blockno: number;
}

export interface GetBlockNumberByTimestampOptions {
  /**
   * @description The closest available block to the provided timestamp, either **before** or **after**
   */
  closest?: BlockExplorerClosest;
  /**
   * @description The integer representing the Unix timestamp in seconds
   */
  timestamp: number;
}

export interface GetAccountBalanceOptions {
  /**
   * @description The **string** representing the address to check for balance
   */
  address: string;
  /**
   * @description The string pre-defined block parameter, either **earliest**, **pending** or **latest**
   */
  tag: BlockExplorerTag;
}

/**
 * @description Same as GetAccountBalanceOptions but in address option we can provide multiple addresses delimited by commas
 */
export interface GetAccountsBalanceOptions extends GetAccountBalanceOptions {}

export interface GetAccountTokenBalanceOptions {
  /**
   * @description The **contract address** of the ERC-20 token
   */
  contractAddress: string;
  /**
   * @description The string representing the address to check for token balance
   */
  address: string;
  /**
   * @description The string pre-defined block parameter, either **earliest**, **pending** or **latest**
   */
  tag: BlockExplorerTag;
}

export interface GetEventLogsByAddressOptions extends PaginationOptions {
  /**
   * @description The integer block number to start searching for logs eg. 37000000
   * @example 37000000
   */
  fromBlock: number;
  /**
   * @description The integer block number to stop searching for logs eg. 37200000
   * @example 37200000
   */
  toBlock: number;

  /**
   * @description The string representing the address to check for logs
   * @example '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7'
   */
  address?: string;
}

export interface GetEventLogsByTopicsOptions extends PaginationOptions {
  /**
   * @description The integer block number to start searching for logs eg. 37000000
   * @example 37000000
   */
  fromBlock: number;
  /**
   * @description The integer block number to stop searching for logs eg. 37200000
   * @example 37200000
   */
  toBlock: number;
  /**
   * @description The topic numbers to search for limited to **topic0**, **topic1**, **topic2**, **topic3**
   * @example '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
   */
  topic0?: string;
  /**
   * @description The topic operator when multiple topic combinations are used limited to **and** or **or**
   * @example 'and'
   */
  topic0_1_opr?: BlockExplorerTopicOperation;
  /**
   * @description The topic numbers to search for limited to **topic0**, **topic1**, **topic2**, **topic3**
   */
  topic1?: string;
  /**
   * @description The topic numbers to search for limited to **topic0**, **topic1**, **topic2**, **topic3**
   */
  topic2?: string;
  /**
   * @description The topic numbers to search for limited to **topic0**, **topic1**, **topic2**, **topic3**
   */
  topic3?: string;
}

export interface GetEventLogsByAddressFilteredOptions extends GetEventLogsByTopicsOptions {
  /**
   * @description The string representing the address to check for logs
   * @example '0x9e66eba102b77fc75cd87b5e60141b85573bc8e8'
   */
  address?: string;
}

export interface GetNormalTxListByAddressOptions extends PaginationOptions, BlockOptions {
  /**
   * @description The string representing the addresses to get corresponding txs
   * @example '0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3'
   */
  address: string;
}

export type GetInternalTxListByAddressOptions = GetNormalTxListByAddressOptions;

export interface GetErc20TokenTransferEventsListOptions extends PaginationOptions, BlockOptions {
  /**
   * @description The string representing the address to check for balance
     @example '0x77134cbC06cB00b66F4c7e623D5fdBF6777635EC'
   */
  address: string;
  /**
   * @description The string representing the token contract address to check for balance
   * @example '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7'
   */
  contractaddress: string;
}

export interface BlockExplorer {
  /**
   *
   * @returns Get block explorer current chain id
   */
  getChain: () => Chain;

  /**
   * Get ether balance for a single address
   * @param options
   * @returns Account balance in wei
   */
  getAccountBalance(options: GetAccountBalanceOptions): Promise<bigint>;
  /**
   * Get ether balance for multiple addresses in a single call
   * @param options
   * @returns Array of accounts balances
   */
  getAccountsBalances(options: GetAccountsBalanceOptions): Promise<{ account: string; balance: BigInt }[]>;
  /**
   * Get a list of 'Normal' transactions by address
   * @param options
   * @returns
   */
  getNormalTxListByAddress(options: GetNormalTxListByAddressOptions): Promise<BlockExplorerTransaction[]>;
  /**
   * Get a list of 'Internal' transactions by address
   * @param options
   * @returns
   */
  getInternalTxListByAddress(options: GetInternalTxListByAddressOptions): Promise<BlockExplorerTxInternal[]>;
  /**
   * Get a list of 'ERC20 - token transfer events' by address
   * @param options
   */
  getErc20TokenTransferEventsList(
    options: GetErc20TokenTransferEventsListOptions
  ): Promise<BlockExplorerErc20TokenTransferEvent[]>;

  /**
   * Get estimated block countdown time by BlockNo
   * @param options
   * @returns Countdown info object
   */
  getBlockCountdownTime(options: GetBlockCountdownTimeOptions): Promise<BlockCountdownTime>;
  /**
   * Get block number
   * @param options
   * @returns Block id
   */
  getBlockNumberByTimestamp(options: GetBlockNumberByTimestampOptions): Promise<number>;

  /**
   * Get ERC20-Token account balance for TokenContractAddress
   * @param options
   * @returns Account token balance (in wei mostly, but it depends on token params)
   */
  getAccountTokenBalance(options: GetAccountTokenBalanceOptions): Promise<bigint>;
  /**
   * Get event logs by address
   * @param options
   * @returns Event logs array
   */
  getEventLogsByAddress(options: GetEventLogsByAddressOptions): Promise<EventLog[]>;
  /**
   * Get event logs by topics
   * @param options
   * @returns Event logs array
   */
  getEventLogsByTopics(options: GetEventLogsByTopicsOptions): Promise<EventLog[]>;
  /**
   * Get event logs by address filtered by topics
   * @param options
   * @returns Event logs array
   */
  getEventLogsByAddressFiltered(options: GetEventLogsByAddressFilteredOptions): Promise<EventLog[]>;
}
