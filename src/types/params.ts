export enum BlockExplorerModule {
  Account = 'account',
  Block = 'block',
  Logs = 'logs',
  Proxy = 'proxy',
  Transaction = 'transaction'
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
  eth_estimateGas = 'eth_estimateGas',
  GetStatus = 'getstatus'
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
