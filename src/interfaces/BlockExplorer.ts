import { Chain } from '../types/chains';
import { EventLog } from '../types/block-explorer';
import { BlockCountdownTime, BlockExplorerBlockItem, BlockExplorerBlockUncleItem } from '../types/block';
import {
  BlockExplorerErc20TokenTransferEvent,
  BlockExplorerTransaction,
  BlockExplorerTxInternal,
  BlockExplorerTxInternalByTxHash,
  BlockExplorerTxReceipt,
  BlockExplorerTxRpc
} from '../types/transaction';
import {
  GetAccountBalanceOptions,
  GetAccountsBalanceOptions,
  GetAccountTokenBalanceOptions,
  GetBlockCountdownTimeOptions,
  GetBlockNumberByTimestampOptions,
  GetErc20TokenTransferEventsListOptions,
  GetEthBlockByNumberOptions,
  GetEthBlockTransactionCountByNumberOptions,
  GetEthCallOptions,
  GetEthCodeOptions,
  GetEthSendRawTransactionOptions,
  GetEthTransactionByBlockNumberAndIndexOptions,
  GetEthTransactionByHashOptions,
  GetEthTransactionCountOptions,
  GetEthTransactionReceiptOptions,
  GetEthUncleByBlockNumberAndIndexOptions,
  GetEventLogsByAddressFilteredOptions,
  GetEventLogsByAddressOptions,
  GetEventLogsByTopicsOptions,
  GetInternalTxListByAddressOptions,
  GetInternalTxListByTxHashOptions,
  GetNormalTxListByAddressOptions
} from '../types/options';

export interface BlockExplorer {
  /**
   *
   * @returns Get block explorer current chain id
   */
  getChain: () => Chain;

  /**
   * Get API key string
   * @returns API key
   */
  getApiKey: () => string;

  getUrl: () => string;

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
   * Get 'internal transactions' by transaction hash
   * @param options
   */
  getInternalTxListByTxHash(options: GetInternalTxListByTxHashOptions): Promise<BlockExplorerTxInternalByTxHash[]>;
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

  /**
   * Geth/Parity Proxy chapter
   * https://routescan.io/documentation/etherscan-compatibility/geth-parity-proxy
   */

  /**
   * Returns the number of most recent block
   * @returns Recent block number
   */
  eth_blockNumber(): Promise<bigint>;
  /**
   * Returns information about a block by block number
   * @param options
   * @returns Block info
   */
  eth_getBlockByNumber(options: GetEthBlockByNumberOptions): Promise<BlockExplorerBlockItem>;
  /**
   * Returns the number of transactions in a block
   * @param options
   * @returns Uncle block info
   */
  eth_getUncleByBlockNumberAndIndex(options: GetEthUncleByBlockNumberAndIndexOptions): Promise<BlockExplorerBlockUncleItem>;
  /**
   * Returns the number of transactions in a block
   * @param options
   * @returns Tx count
   */
  eth_getBlockTransactionCountByNumber(options: GetEthBlockTransactionCountByNumberOptions): Promise<bigint>;
  /**
   * Returns the information about a transaction requested by transaction hash
   * @param options
   * @returns Tx info
   */
  eth_getTransactionByHash(options: GetEthTransactionByHashOptions): Promise<BlockExplorerTxRpc>;
  /**
   * Returns information about a transaction by block number and transaction index position
   * @param options
   * @returns Tx info
   */
  eth_getTransactionByBlockNumberAndIndex(options: GetEthTransactionByBlockNumberAndIndexOptions): Promise<BlockExplorerTxRpc>;
  /**
   * Returns the number of transactions performed by an address
   * @param options
   * @returns Output tx count in hex
   */
  eth_getTransactionCount(options: GetEthTransactionCountOptions): Promise<bigint>;
  /**
   * Submits a pre-signed transaction for broadcast to the Ethereum network
   * @param options
   * @returns Submitted tx hash
   */
  eth_sendRawTransaction(options: GetEthSendRawTransactionOptions): Promise<string>;
  /**
   * Returns the receipt of a transaction by transaction hash
   * @param options
   * @returns Tx receipt info
   */
  eth_getTransactionReceipt(options: GetEthTransactionReceiptOptions): Promise<BlockExplorerTxReceipt>;
  /**
   * Executes a new message call immediately without creating a transaction on the block chain
   * @param options
   * @returns result string
   */
  eth_call(options: GetEthCallOptions): Promise<string>;
  /**
   * Returns code at a given address
   * @param options
   * @returns Code string
   */
  eth_getCode(options: GetEthCodeOptions): Promise<string>;
}
