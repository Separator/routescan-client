import { BlockExplorerBlockItem } from './block';

export enum BlockExplorerModule {
  Account = 'account',
  Block = 'block',
  Logs = 'logs',
  Proxy = 'proxy'
}

export enum BlockExplorerAction {
  Balance = 'balance',
  BalanceMulti = 'balancemulti',
  GetBlockByTime = 'getblocknobytime',
  GetBlockCountdown = 'getblockcountdown',
  GetLogs = 'getLogs',
  TokenBalance = 'tokenbalance',
  TxList = 'txlist',
  TokenTxList = 'tokentx',
  TxListInternal = 'txlistinternal',
  eth_blockNumber = 'eth_blockNumber',
  eth_getBlockByNumber = 'eth_getBlockByNumber',
  eth_getUncleByBlockNumberAndIndex = 'eth_getUncleByBlockNumberAndIndex',
  eth_getBlockTransactionCountByNumber = 'eth_getBlockTransactionCountByNumber',
  eth_getTransactionByHash = 'eth_getTransactionByHash',
  eth_getTransactionByBlockNumberAndIndex = 'eth_getTransactionByBlockNumberAndIndex',
  eth_getTransactionCount = 'eth_getTransactionCount',
  eth_sendRawTransaction = 'eth_sendRawTransaction',
  eth_getTransactionReceipt = 'eth_getTransactionReceipt',
  eth_call = 'eth_call',
  eth_getCode = 'eth_getCode',
  eth_getStorageAt = 'eth_getStorageAt',
  eth_gasPrice = 'eth_gasPrice',
  eth_estimateGas = 'eth_estimateGas'
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

interface BlockExplorerTxBase {
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
   * @description Contract address
   * @example ''
   */
  contractAddress: string;
  /**
   * @description Input
   * @example '0x454e34354139455138'
   */
  input: string;
  /**
   * @description Gas restriction
   * @example '23000'
   */
  gas: string;
  /**
   * @description Used gas amount
   * @example '21612'
   */
  gasUsed: string;
  /**
   * @description Error code ("0" if all ok)
   * @example '0'
   */
  isError?: string;
}

interface BlockExplorerTxCommon extends BlockExplorerTxBase {
  /**
   * @description Transaction hash
   * @example '0xad1c27dd8d0329dbc400021d7477b34ac41e84365bd54b45a4019a15deb10c0d'
   */
  hash: string;
}

export interface BlockExplorerTransaction extends BlockExplorerTxCommon {
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
   * @description Gas price in wei
   * @example '400000000000'
   */
  gasPrice: string;
  /**
   * @description Tx receipt status
   * @example '1'
   */
  txreceipt_status: string;
  /**
   * @description Cumulative gas used
   * @example '21612'
   */
  cumulativeGasUsed: string;
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

export interface BlockExplorerTxInternal extends BlockExplorerTxCommon {
  /**
   * @description Tx type
   * @example 'call'
   */
  type: string;
  /**
   * @description Trace id
   * @example '1'
   */
  traceId: string;
  /**
   * @description Error code
   * @example ''
   */
  errCode: string;
}

export interface BlockExplorerTxInternalByTxHash extends BlockExplorerTxBase {
  /**
   * @description Tx type
   * @example 'call'
   */
  type: string;
  /**
   * @description Error code
   * @example ''
   */
  errCode: string;
}

export interface BlockExplorerErc20TokenTransferEvent extends BlockExplorerTxCommon {
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
   * @description Cumulative gas used
   * @example '21612'
   */
  cumulativeGasUsed: string;
  /**
   * @description Gas price in wei
   * @example '400000000000'
   */
  gasPrice: string;
  /**
   * @description Block confirmations count
   * @example '19292464'
   */
  confirmations: string;
  /**
   * @description Token name
   * @example 'TetherToken'
   */
  tokenName: string;
  /**
   * @description Token symbol
   * @example 'USDt'
   */
  tokenSymbol: string;
  /**
   * @description Token decimal count
   * @example '6'
   */
  tokenDecimal: string;
}

export interface BlockCountdownTime {
  /**
   * @description Current block id
   * @example '19419956'
   */
  CurrentBlock: string;
  /**
   * @description Countdown block
   * @example '167015880000'
   */
  CountdownBlock: string;
  /**
   * @description Remaining block
   * @example '166996460044'
   */
  RemainingBlock: string;
  /**
   * @description Estimate time in sec
   * @example 2003957520528
   */
  EstimateTimeInSec: string;
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

export interface BlockExplorerBlockCountdownTimeResponse extends BlockExplorerResponseCommon {
  result: BlockCountdownTime;
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

export interface GetEventLogsByAddressResponse extends BlockExplorerResponseCommon {
  result: EventLog[];
}

export type GetEventLogsByTopicsResponse = GetEventLogsByAddressResponse;

export type GetEventLogsByAddressFilteredResponse = GetEventLogsByAddressResponse;

export interface BlockExplorerTxListResponse extends BlockExplorerResponseCommon {
  /**
   * @description List of tx objects
   */
  result: BlockExplorerTransaction[];
}

export interface BlockExplorerInternalTxListResponse extends BlockExplorerResponseCommon {
  /**
   * @description List of internal tx objects
   */
  result: BlockExplorerTxInternal[];
}

export interface BlockExplorerInternalTxListByHashResponse extends BlockExplorerResponseCommon {
  /**
   * @description List of internal tx objects
   */
  result: BlockExplorerTxInternalByTxHash[];
}

export interface GetErc20TokenTransferEventsListResponse extends BlockExplorerResponseCommon {
  result: BlockExplorerErc20TokenTransferEvent[];
}

interface BlockExplorerRpcResponseCommon {
  /**
   * @description RPC version
   * @example '2.0'
   */
  jsonrpc: string;
  /**
   * @description ???
   * @example 83
   */
  id: number;
}

export interface BlockExplorerEthBlockNumberResponse extends BlockExplorerRpcResponseCommon {
  /**
   * @description Recent block number in hex
   * @example '0x1427a5f'
   */
  result: string;
}

export interface BlockExplorerEthBlockByNumberResponse extends BlockExplorerRpcResponseCommon {
  result: BlockExplorerBlockItem;
}
