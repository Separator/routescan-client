import { BlockExplorerStatus } from './params';
import { BlockCountdownTime, BlockExplorerBlockItem, BlockExplorerBlockUncleItem } from './block';
import {
  BlockExplorerTransaction,
  BlockExplorerTxInternal,
  BlockExplorerTxInternalByTxHash,
  BlockExplorerErc20TokenTransferEvent,
  BlockExplorerTxRpc,
  BlockExplorerTxReceipt,
  BlockExplorerTxStatus,
  BlockExplorerReceiptStatus
} from './transaction';

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

  error?: {
    /**
     * @description Error code
     * @example -32000
     */
    code: number;
    /**
     * @description Error message
     * @example 'rlp: value size exceeds available input length'
     */
    message: string;
  };
}

export interface BlockExplorerEthBlockNumberResponse extends BlockExplorerRpcResponseCommon {
  /**
   * @description Recent block number in hex
   * @example '0x1427a5f'
   */
  result?: string;
}

export interface BlockExplorerEthBlockByNumberResponse extends BlockExplorerRpcResponseCommon {
  result?: BlockExplorerBlockItem;
}

export interface BlockExplorerEthUncleByBlockNumberAndIndexResponse extends BlockExplorerRpcResponseCommon {
  result?: BlockExplorerBlockUncleItem;
}

export interface BlockExplorerEthBlockTransactionCountByNumberResponse extends BlockExplorerRpcResponseCommon {
  result?: string;
}

export interface BlockExplorerEthTransactionByHashResponse extends BlockExplorerRpcResponseCommon {
  result?: BlockExplorerTxRpc;
}

export interface BlockExplorerEthTransactionByBlockNumberAndIndexResponse extends BlockExplorerRpcResponseCommon {
  result?: BlockExplorerTxRpc;
}

export interface BlockExplorerEthTransactionCountResponse extends BlockExplorerRpcResponseCommon {
  result?: string;
}

export interface BlockExplorerEthSendRawTransactionResponse extends BlockExplorerRpcResponseCommon {
  result?: string;
}

export interface BlockExplorerEthGetTransactionReceiptResponse extends BlockExplorerRpcResponseCommon {
  result?: BlockExplorerTxReceipt;
}

export interface BlockExplorerEthCallResponse extends BlockExplorerRpcResponseCommon {
  result?: string;
}

export interface BlockExplorerEthGetCodeResponse extends BlockExplorerRpcResponseCommon {
  result?: string;
}

export interface BlockExplorerEthGetStorageAtResponse extends BlockExplorerRpcResponseCommon {
  result?: string;
}

export interface BlockExplorerEthGasPriceResponse extends BlockExplorerRpcResponseCommon {
  result?: string;
}

export interface BlockExplorerEthEstimateGasResponse extends BlockExplorerRpcResponseCommon {
  result?: string;
}

export interface BlockExplorerContractExecutionStatusResponse extends BlockExplorerResponseCommon {
  result: BlockExplorerTxStatus;
}

export interface BlockExplorerTransactionReceiptStatusResponse extends BlockExplorerResponseCommon {
  result: BlockExplorerReceiptStatus;
}
