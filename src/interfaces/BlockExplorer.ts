import { Chain } from '../types/chains';
import { BlockExplorerClosest, BlockExplorerTag } from '../types/block-explorer';

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

export enum BlockExplorerType {
  Routescan = 'routescan',
  Ethereum = 'ethereum',
  Chainlens = 'chainlens'
}

export interface BlockExplorer {
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
   * Get ERC20-Token Account Balance for TokenContractAddress
   * @param options
   * @returns Account token balance (in wei mostly, but it depends on token params)
   */
  getAccountTokenBalance: (options: GetAccountTokenBalanceOptions) => Promise<bigint>;
}
