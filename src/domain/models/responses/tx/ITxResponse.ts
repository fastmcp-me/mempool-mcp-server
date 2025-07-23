export interface ITxResponse {
  txid: string;
  version: number;
  locktime: number;
  vin: any[];
  vout: any[];
  size: number;
  weight: number;
  fee: number;
  status: ITxStatusResponse;
}

export interface ITxStatusResponse {
  confirmed: boolean;
  block_height?: number;
  block_hash?: string;
  block_time?: number;
} 