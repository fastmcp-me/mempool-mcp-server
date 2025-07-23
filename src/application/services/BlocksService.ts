import { BlocksRequestService } from "../../infrastructure/services/requests/BlocksRequestService.js";
import { formatResponse } from "../helpers/format.js";
import {
  IBlocksResponse,
  IBlockTxidsResponse,
  IBlockTxsResponse,
  IBlockStatusResponse,
} from "../../domain/models/responses/block/IBlocksResponse.js";
import { IHashParameter } from "../../shared/parameters/IHashParameter.js";

export class BlocksService {
  constructor(private requestService: BlocksRequestService) {}

  async getBlocks(): Promise<string> {
    const data = await this.requestService.getBlocks();
    return formatResponse<IBlocksResponse[]>("Blocks", data);
  }

  async getBlockTxids({ hash }: IHashParameter): Promise<string> {
    const data = await this.requestService.getBlockTxids({ hash });
    return formatResponse<IBlockTxidsResponse[]>("Block Txids", data);
  }

  async getBlockTxs({ hash }: IHashParameter): Promise<string> {
    const data = await this.requestService.getBlockTxs({ hash });
    return formatResponse<IBlockTxsResponse[]>("Block Txs", data);
  }

  async getBlockStatus({ hash }: IHashParameter): Promise<string> {
    const data = await this.requestService.getBlockStatus({ hash });
    return formatResponse<IBlockStatusResponse>("Block Status", data);
  }

  async getBlockRaw({ hash }: IHashParameter): Promise<string> {
    const data = await this.requestService.getBlockRaw({ hash });
    return `Block Raw Hex: ${data}`;
  }

  async getBlockTxidByIndex({
    hash,
    index,
  }: {
    hash: string;
    index: number;
  }): Promise<string> {
    const data = await this.requestService.getBlockTxidByIndex({ hash, index });
    return `Block Txid By Index: ${data}`;
  }

  async getBlockHeader({ hash }: { hash: string }): Promise<string> {
    const data = await this.requestService.getBlockHeader({ hash });
    return `Block Header: ${data}`;
  }
}
