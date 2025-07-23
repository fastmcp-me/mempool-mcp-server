export interface IBlocksResponse {
  id: string;
  height: number;
  version: number;
  timestamp: number;
  tx_count: number;
  size: number;
  weight: number;
  merkle_root: string;
  previousblockhash: string;
  mediantime: number;
  nonce: number;
  bits: number;
  difficulty: number;
}

export type IBlockTxidsResponse = string;

export interface IBlockTxsResponse {
  txid: string;
  status: {
    confirmed: boolean;
    block_height?: number;
    block_hash?: string;
    block_time?: number;
  };
  vin: any[];
  vout: any[];
}

export interface IBlockStatusResponse {
  in_best_chain: boolean;
  height: number;
  next_best: boolean;
} 