import { BlockExplorerClosest, BlockExplorerSort, BlockExplorerTag, BlockExplorerTopicOperation } from './params';

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

export interface GetInternalTxListByTxHashOptions {
  /**
   * @description The string representing the transaction hash to check for internal transactions
   * @example '0x40eb908387324f2b575b4879cd9d7188f69c8fc9d87c901b9e2daaea4b442170'
   */
  txhash: string;
}

export interface GetErc20TokenTransferEventsListOptions extends PaginationOptions, BlockOptions {
  /**
     * @description The string representing the address to check for balance
       @example '0x77134cbC06cB00b66F4c7e623D5fdBF6777635EC'
     */
  address?: string;
  /**
   * @description The string representing the token contract address to check for balance
   * @example '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7'
   */
  contractaddress: string;
}

export interface GetEthBlockByNumberOptions {
  /**
   * The block number, in hex
   * @example '0x10d4f'
   */
  tag?: string;
  /**
     * @description The boolean value to show full transaction objects.  
        when **true**, returns full transaction objects and their information,  
        when **false** only returns a list of transactions.
     */
  boolean: boolean;
}

export interface GetEthUncleByBlockNumberAndIndexOptions {
  /**
   * The block number, in hex
   * @example '0x10d4f'
   */
  tag?: string;
  /**
   * @description Position of the uncle's index in the block, in hex
   * @example '0x5'
   */
  index?: string;
}

export interface GetEthBlockTransactionCountByNumberOptions {
  /**
   * The block number, in hex
   * @example '0x10d4f'
   */
  tag?: string;
}

export interface GetEthTransactionByHashOptions {
  txhash: string;
}

export interface GetEthTransactionByBlockNumberAndIndexOptions {
  /**
   * @description The block number, in hex
   * @example '0x10FB78'
   */
  tag: string;
  /**
   * @description The position of the uncle's index in the block, in hex
   * @example '0x0'
   */
  index?: string;
}
