import { IApiClient } from "../../interfaces/IApiClient.js";
import {
  IBlocksResponse,
  IBlockTxidsResponse,
  IBlockTxsResponse,
  IBlockStatusResponse,
} from "../../../domain/models/responses/block/IBlocksResponse.js";

export class BlocksRequestService {
  constructor(private client: IApiClient) {}

  async getBlocks(): Promise<IBlocksResponse[] | null> {
    return this.client.makeRequest<IBlocksResponse[]>(`blocks`);
  }

  async getBlockTxids({ hash }: { hash: string }): Promise<IBlockTxidsResponse[] | null> {
    return this.client.makeRequest<IBlockTxidsResponse[]>(`block/${hash}/txids`);
  }

  async getBlockTxs({ hash }: { hash: string }): Promise<IBlockTxsResponse[] | null> {
    return this.client.makeRequest<IBlockTxsResponse[]>(`block/${hash}/txs`);
  }

  async getBlockStatus({ hash }: { hash: string }): Promise<IBlockStatusResponse | null> {
    return this.client.makeRequest<IBlockStatusResponse>(`block/${hash}/status`);
  }

  async getBlockRaw({ hash }: { hash: string }): Promise<string | null> {
    return this.client.makeRequest<string>(`block/${hash}/raw`);
  }

  async getBlockTxidByIndex({ hash, index }: { hash: string; index: number }): Promise<string | null> {
    return this.client.makeRequest<string>(`block/${hash}/txid/${index}`);
  }

  async getBlockHeader({ hash }: { hash: string }): Promise<string | null> {
    return this.client.makeRequest<string>(`block/${hash}/header`);
  }
} 