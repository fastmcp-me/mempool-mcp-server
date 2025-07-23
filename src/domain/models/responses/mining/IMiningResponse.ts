export interface IMiningPoolsResponse {
  id: string;
  name: string;
  hash_rate: number;
  blocks_mined: number;
}

export interface IMiningPoolResponse {
  id: string;
  name: string;
  hash_rate: number;
  blocks_mined: number;
  addresses: string[];
} 