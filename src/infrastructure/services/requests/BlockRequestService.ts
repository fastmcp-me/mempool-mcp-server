import { IBlockResponse } from "../../../domain/models/responses/block/IBlockResponse.js";
import { IHashParameter } from "../../../shared/parameters/IHashParameter.js";

import { IApiClient } from "../../interfaces/IApiClient.js";

export class BlockRequestService {
  constructor(private client: IApiClient) {}

  async getBlock({ hash }: IHashParameter): Promise<IBlockResponse | null> {
    return this.client.makeRequest<IBlockResponse>(`block/${hash}`);
  }
}
