export enum BlockExplorerModule {
  Account = 'account',
  Block = 'block'
}

export enum BlockExplorerAction {
  Balance = 'balance',
  GetBlockByTime = 'getblocknobytime',
  TokenBalance = 'tokenbalance',
  TxList = 'txlist',
  TokenTxList = 'tokentx'
}

export enum BlockExplorerTag {
  Earliest = 'earliest',
  Pending = 'pending',
  Latest = 'latest'
}

export enum BlockExplorerStatus {
  Success = '1',
  Fail = '0'
}

export enum BlockExplorerSort {
  Asc = 'asc',
  Desc = 'desc'
}

export enum BlockExplorerClosest {
  Before = 'before',
  After = 'after'
}

export interface BlockExplorerPagination {
  /**
   * @description The integer page number, if pagination is enabled
   */
  page?: number;
  /**
   * @description The number of transactions displayed per page
   */
  offset?: number;
  /**
   * @description The integer block number to start searching for transactions
   */
  startblock?: number;
  /**
   * @description The integer block number to stop searching for transactions
   */
  endblock?: number;
  /**
   * @description the sorting preference, use **asc** to sort by ascending and **desc** to sort by descending
   */
  sort?: BlockExplorerSort;
}

export interface BlockExplorerTransaction {
  /**
   * @description Block number string
   */
  blockNumber: string;
  /**
   * @description Block generation timestamp in seconds
   */
  timeStamp: string;
  /**
   * @description Transaction hash
   */
  hash: string;
  /**
   * @description From address nonce
   */
  nonce: string;
  /**
   * @description Block hash string
   */
  blockHash: string;
  transactionIndex: string;
  /**
   * @description From address (transaction initiator)
   */
  from: string;
  /**
   * @description To address
   */
  to: string;
  /**
   * @description Value in wei
   */
  value: string;
  /**
   * @description Gas restriction
   */
  gas: string;
  /**
   * @description Gas price in wei
   */
  gasPrice: string;
  /**
   * @description Error code ("0" if all ok)
   */
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  /**
   * @description Used gas amount
   */
  gasUsed: string;
  /**
   * @description Block confirmations number
   */
  confirmations: string;
  methodId: string;
  functionName: string;
}

export interface BlockExplorerRequestCommon {
  /**
   * @description Module name
   */
  module: BlockExplorerModule;
  /**
   * @description Action (get block id, txs list etc.)
   */
  action: BlockExplorerAction;
  /**
   * @description API key string
   */
  apikey: string;
}

export interface BlockExplorerResponseCommon {
  /**
   * @description Status string (0 - fail, 1 - success)
   */
  status: BlockExplorerStatus;
  /**
   * @description Status message (**OK** if success)
   */
  message: string;
}

export interface BlockExplorerBlockIdRequest extends BlockExplorerRequestCommon {
  /**
   * @description The integer representing the Unix timestamp in seconds
   */
  timestamp: number;
  /**
   * @description the closest available block to the provided timestamp, either **before** or **after**
   */
  closest: BlockExplorerClosest;
}

export interface BlockExplorerBlockIdResponse extends BlockExplorerResponseCommon {
  /**
   * @description Block id string
   */
  result: string;
}

export interface GetAccountBalanceResponse extends BlockExplorerResponseCommon {
  /**
   * @description Account balance in wei
   */
  result: string;
}

export interface BlockExplorerTxListRequest extends BlockExplorerRequestCommon, BlockExplorerPagination {
  /**
   * @description The string representing the addresses to check for txs
   */
  address: string;
}

export interface BlockExplorerTxListResponse extends BlockExplorerResponseCommon {
  /**
   * @description List of transaction objects
   */
  result: BlockExplorerTransaction[];
}

export interface BlockExplorerTokenTxListRequest extends BlockExplorerTxListRequest {
  /**
   * @description The string representing the token contract address
   */
  contractaddress: string;
}

export interface BlockExplorerTokenTxListResponse extends BlockExplorerTxListResponse {}

export type BlockExplorerRequest = BlockExplorerBlockIdRequest | BlockExplorerTxListRequest | BlockExplorerTokenTxListRequest;

export type BlockExplorerResponse = BlockExplorerBlockIdResponse | BlockExplorerTxListResponse | BlockExplorerTokenTxListResponse;
