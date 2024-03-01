import { Chain } from '../types/chains';
import {
  BlockExplorerClosest,
  BlockExplorerSort,
  BlockExplorerTag,
  BlockExplorerTopicOperation,
  BlockExplorerTransaction,
  EventLog
} from '../types/block-explorer';

export enum BlockExplorerType {
  Routescan = 'routescan',
  Ethereum = 'ethereum',
  Chainlens = 'chainlens'
}

interface CommonOptions {
  /**
   * @description Chain to work with
   */
  chain?: Chain;
  /**
   * @description API key to get access to block explorer
   */
  apiKey?: string;
}

export interface GetBlockNumberOptions extends CommonOptions {
  /**
   * @description The closest available block to the provided timestamp, either **before** or **after**
   */
  closest?: BlockExplorerClosest;
  /**
   * @description The integer representing the Unix timestamp in seconds
   */
  timestamp?: number;
}

export interface GetAccountBalanceOptions extends CommonOptions {
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

export interface GetAccountTokenBalanceOptions extends CommonOptions {
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

export interface getEventLogsByAddressFilteredOptions extends CommonOptions {
  /**
   * @description The integer block number to start searching for logs
   * @example 37000000
   */
  fromBlock?: number;
  /**
   * @description The integer block number to stop searching for logs
   * @example 37200000
   */
  toBlock?: number;
  /**
   * @description The string representing the address to check for logs
   */
  address?: string;
  /**
   * @description The topic numbers to search for limited to **topic0**, **topic1**, **topic2**, **topic3**
   */
  topic0?: string;
  /**
   * @description The topic operator when multiple topic combinations are used limited to **and** or **or**
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
  /**
   * @description The integer page number, if pagination is enabled
   */
  page?: number;
  /**
   * @description The number of transactions displayed per page
   */
  offset?: number;
}

export interface GetNormalTxListByAddressOptions extends CommonOptions {
  /**
   * @description The string representing the addresses to get corresponding txs
   * @example '0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3'
   */
  address: string;
  /**
   * @description The integer block number to start searching for transactions
   * @example 0
   */
  startblock?: number;
  /**
   * @description The integer block number to stop searching for transactions
   * @example 270257
   */
  endblock?: number;
  /**
   * @description The integer page number, if pagination is enabled
   * @example 1
   */
  page?: number;
  /**
   * @description The number of transactions displayed per page
   * @example 10
   */
  offset?: number;
  /**
   * @description The sorting preference, use **asc** to sort by ascending and **desc** to sort by descending
   */
  sort?: BlockExplorerSort;
}

// https://api.routescan.io/v2/network/mainnet/evm/1/etherscan/api?module=account&action=txlistinternal&sort=asc&apikey=YourApiKeyToken

export interface BlockExplorer {
  /**
   *
   * @returns Get block explorer current chain id
   */
  getChain: () => Chain;
  /**
   * Get Block Number
   * @param options
   * @returns Block id
   */
  getBlockNumber: (options: GetBlockNumberOptions) => Promise<number>;
  /**
   * Get Ether Balance for a Single Address
   * @param options
   * @returns Account balance in wei
   */
  getAccountBalance: (options: GetAccountBalanceOptions) => Promise<bigint>;
  /**
   * Get Ether Balance for Multiple Addresses in a Single Call
   * @param options
   * @returns Array of accounts balances
   */
  getAccountsBalances: (options: GetAccountsBalanceOptions) => Promise<{ account: string; balance: BigInt }[]>;
  /**
   * Get a list of 'Normal' Transactions By Address
   * @param options
   * @returns
   */
  GetNormalTxListByAddress: (options: GetNormalTxListByAddressOptions) => Promise<BlockExplorerTransaction[]>;
  /**
   * Get ERC20-Token Account Balance for TokenContractAddress
   * @param options
   * @returns Account token balance (in wei mostly, but it depends on token params)
   */
  getAccountTokenBalance: (options: GetAccountTokenBalanceOptions) => Promise<bigint>;
  /**
   * Get Event Logs by Address filtered by Topics
   * @param options
   * @returns Event logs array
   */
  getEventLogsByAddressFiltered: (options: getEventLogsByAddressFilteredOptions) => Promise<EventLog[]>;
}
