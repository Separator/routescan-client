import { Chain } from './types/chains';
import { BlockExplorer } from './interfaces/BlockExplorer';
import {
  BlockExplorerTransaction,
  BlockExplorerTxInternal,
  BlockExplorerErc20TokenTransferEvent,
  BlockExplorerTxInternalByTxHash
} from './types/transaction';
import {
  BlockExplorerCommon,
  BlockExplorerEthereum,
  BlockExplorerRoutescan,
  BlockExplorerOptions
} from './classes/BlockExplorer';
import {
  BlockExplorerModule,
  BlockExplorerAction,
  BlockExplorerTag,
  BlockExplorerStatus,
  BlockExplorerSort,
  BlockExplorerClosest,
  BlockExplorerTopicOperation
} from './types/params';
import {
  GetBlockCountdownTimeOptions,
  GetBlockNumberByTimestampOptions,
  GetAccountBalanceOptions,
  GetAccountsBalanceOptions,
  GetNormalTxListByAddressOptions,
  GetInternalTxListByTxHashOptions,
  GetErc20TokenTransferEventsListOptions,
  GetAccountTokenBalanceOptions,
  GetEventLogsByAddressOptions,
  GetEventLogsByTopicsOptions,
  GetEventLogsByAddressFilteredOptions,
  GetEthBlockByNumberOptions,
  GetEthUncleByBlockNumberAndIndexOptions
} from './types/options';
import {
  // Structures:
  BlockCountdownTime,
  EventLog,

  // Responses:
  BlockExplorerBlockCountdownTimeResponse,
  BlockExplorerBlockIdResponse,
  GetAccountBalanceResponse,
  GetAccountsBalanceResponse,
  GetAccountTokenBalanceResponse,
  GetEventLogsByAddressFilteredResponse,
  BlockExplorerTxListResponse,
  BlockExplorerInternalTxListResponse,
  BlockExplorerInternalTxListByHashResponse,
  BlockExplorerEthBlockNumberResponse,
  BlockExplorerEthBlockByNumberResponse
} from './types/block-explorer';

export {
  // Simple methods options:
  GetBlockCountdownTimeOptions,
  GetBlockNumberByTimestampOptions,
  GetAccountBalanceOptions,
  GetAccountsBalanceOptions,
  GetNormalTxListByAddressOptions,
  GetInternalTxListByTxHashOptions,
  GetErc20TokenTransferEventsListOptions,
  GetAccountTokenBalanceOptions,
  GetEventLogsByAddressOptions,
  GetEventLogsByTopicsOptions,
  GetEventLogsByAddressFilteredOptions,

  // Rpc methods options:
  GetEthBlockByNumberOptions,
  GetEthUncleByBlockNumberAndIndexOptions,

  // Parameters:
  BlockExplorerModule,
  BlockExplorerAction,
  BlockExplorerTag,
  BlockExplorerStatus,
  BlockExplorerSort,
  BlockExplorerClosest,
  BlockExplorerTopicOperation,
  Chain,

  // Entities:
  BlockExplorerTransaction,
  BlockExplorerTxInternal,
  BlockCountdownTime,
  BlockExplorerErc20TokenTransferEvent,
  BlockExplorerTxInternalByTxHash,
  EventLog,

  // Responses:
  BlockExplorerBlockCountdownTimeResponse,
  BlockExplorerBlockIdResponse,
  GetAccountBalanceResponse,
  GetAccountsBalanceResponse,
  GetAccountTokenBalanceResponse,
  GetEventLogsByAddressFilteredResponse,
  BlockExplorerTxListResponse,
  BlockExplorerInternalTxListResponse,
  BlockExplorerInternalTxListByHashResponse,
  BlockExplorerEthBlockNumberResponse,
  BlockExplorerEthBlockByNumberResponse,

  // Block explorer:
  BlockExplorer,
  BlockExplorerCommon,
  BlockExplorerEthereum,
  BlockExplorerRoutescan,
  BlockExplorerOptions
};
