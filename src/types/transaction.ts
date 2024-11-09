export interface BlockTransaction {
  /**
   * @description Block hash
   * @example '0x7eb7c23a5ac2f2d70aa1ba4e5c56d89de5ac993590e5f6e79c394e290d998ba8'
   */
  blockHash: string;
  /**
   * @description Block number in hex
   * @example '0x10d4f'
   */
  blockNumber: string;
  /**
   * @description Tx initiator address
   * @example '0x4458f86353b4740fe9e09071c23a7437640063c9'
   */
  from: string;
  /**
   * @description Gas count in hex
   * @example '0x5208'
   */
  gas: string;
  /**
   * @description Gas price in hex
   * @example '0xba43b7400'
   */
  gasPrice: string;
  /**
   * @description Tx hash
   * @example '0xa442249820de6be754da81eafbd44a865773e4b23d7c0522d31fd03977823008'
   */
  hash: string;
  /**
   * @description Input data
   * @example '0x'
   */
  input: string;
  /**
   * @description Nonce in hex
   * @example '0x1'
   */
  nonce: string;
  /**
   * @description To address
   * @example '0xbf3403210f9802205f426759947a80a9fda71b1e'
   */
  to: string;
  /**
   * @description Tx index
   * @example '0x0'
   */
  transactionIndex: string;
  /**
   * @description Amount value in hex
   * @example '0xaa9f075c200000'
   */
  value: string;
  /**
   * @description Type
   * @example '0x0'
   */
  type: string;
  /**
   * @description V
   * @example '0x1b'
   */
  v: string;
  /**
   * @description R
   * @example '0x2c2789c6704ba2606e200e1ba4fd17ba4f0e0f94abe32a12733708c3d3442616'
   */
  r: string;
  /**
   * @description S
   * @example '0x2946f47e3ece580b5b5ecb0f8c52604fa5f60aeb4103fc73adcbf6d620f9872b'
   */
  s: string;
}

export interface BlockExplorerTxBase {
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

export interface BlockExplorerTxCommon extends BlockExplorerTxBase {
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
