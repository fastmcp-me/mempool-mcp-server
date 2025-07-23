export interface IMempoolInfoResponse {
  count: number;
  vsize: number;
  total_fee: number;
}

export type IMempoolTxidResponse = string;

export interface IMempoolRecentResponse {
  txid: string;
  fee: number;
  vsize: number;
  value: number;
  time: number;
} 