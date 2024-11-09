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
