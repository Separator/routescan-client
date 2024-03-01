export enum BlockExplorerModule {
  Account = 'account',
  Block = 'block',
  Logs = 'logs'
}

export enum BlockExplorerAction {
  Balance = 'balance',
  BalanceMulti = 'balancemulti',
  GetBlockByTime = 'getblocknobytime',
  GetLogs = 'getLogs',
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

export enum BlockExplorerTopicOperation {
  And = 'and',
  Or = 'or'
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
   * @example '47884'
   */
  blockNumber: string;
  /**
   * @description Block generation timestamp in seconds
   * @example '1438947953'
   */
  timeStamp: string;
  /**
   * @description Transaction hash
   * @example '0xad1c27dd8d0329dbc400021d7477b34ac41e84365bd54b45a4019a15deb10c0d'
   */
  hash: string;
  /**
   * @description From address nonce
   * @example '0'
   */
  nonce: string;
  /**
   * @description Block hash string
   * @example '0xf2988b9870e092f2898662ccdbc06e0e320a08139e9c6be98d0ce372f8611f22'
   */
  blockHash: string;
  /**
   * @description Transaction index
   * @example '0'
   */
  transactionIndex: string;
  /**
   * @description From address (transaction initiator)
   * @example '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a'
   */
  from: string;
  /**
   * @description To address
   * @example '0x2910543af39aba0cd09dbb2d50200b3e800a63d2'
   */
  to: string;
  /**
   * @description Value in wei
   * @example '5000000000000000000'
   */
  value: string;
  /**
   * @description Gas restriction
   * @example '23000'
   */
  gas: string;
  /**
   * @description Gas price in wei
   * @example '400000000000'
   */
  gasPrice: string;
  /**
   * @description Error code ("0" if all ok)
   * @example '0'
   */
  isError: string;
  /**
   * @description Tx receipt status
   * @example '1'
   */
  txreceipt_status: string;
  /**
   * @description Input
   * @example '0x454e34354139455138'
   */
  input: string;
  /**
   * @description Contract address
   * @example ''
   */
  contractAddress: string;
  /**
   * @description Cumulative gas used
   * @example '21612'
   */
  cumulativeGasUsed: string;
  /**
   * @description Used gas amount
   * @example '21612'
   */
  gasUsed: string;
  /**
   * @description Block confirmations count
   * @example '19292464'
   */
  confirmations: string;
  /**
   * @description Method id
   * @example '0x454e3435'
   */
  methodId: string;
  /**
   * @description Function name
   * @example ''
   */
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
   * @example '40891626854930000000999'
   */
  result: string;
}

export interface GetAccountsBalanceResponse extends BlockExplorerResponseCommon {
  result: {
    /**
     * @description Account address
     * @example '0xddBd2B932c763bA5b1b7AE3B362eac3e8d40121A'
     */
    account: string;
    /**
     * @description Account balance in wei
     * @example '40891626854930000000999'
     */
    balance: string;
  }[];
}

export interface GetAccountTokenBalanceResponse extends BlockExplorerResponseCommon {
  /**
   * @description Token balance for specified address in wei (probably, depends on token parameters)
   */
  result: string;
}

export interface EventLog {
  /**
   * @description Smart-contract address
   * @example '0x9e66eba102b77fc75cd87b5e60141b85573bc8e8'
   */
  address: string;
  /**
 * @description Event topics array
 * @example [
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000007d01c6a9f637f7f2a35b9797274d6b98c41e11e7",
    "0x0000000000000000000000000000000000000000000000000000000000e4e9c7"
  ]
 */
  topics: string[];
  /**
   * @description Tx data
   * @example '0x'
   */
  data: string;
  /**
   * @description Tx block number
   * @example '0x2349342'
   */
  blockNumber: string;
  /**
   * @description Tx block hash
   * @example '0x45d6a3318d1b7e44525b1058ec6dd3863c71c2dc0dd28e4b326d92964600bae0'
   */
  blockHash: string;
  /**
   * @description Tx timestamp
   * @example '0x653c1480'
   */
  timeStamp: string;
  /**
   * @description Tx gas price in wei
   * @example '0x6fc23ac00'
   */
  gasPrice: string;
  /**
   * @description Tx gas used
   * @example '0x26cee'
   */
  gasUsed: string;
  /**
   * @description Log index
   * @example '0x2'
   */
  logIndex: string;
  /**
   * @description Tx hash
   * @example '0x08042351a9cb68419d44fc3c905f880bfb005c271773543c2cd80191826f6306'
   */
  transactionHash: string;
  /**
   * @description Tx index
   * @example '0x2'
   */
  transactionIndex: string;
}

export interface GetEventLogsByAddressFilteredResponse extends BlockExplorerResponseCommon {
  result: EventLog[];
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
