import { IBlockResponse } from "../../domain/models/responses/block/IBlockResponse.js";
import { BlockRequestService } from "../../infrastructure/services/requests/BlockRequestService.js";
import { IHashParameter } from "../../shared/parameters/IHashParameter.js";

import { formatResponse } from "../helpers/format.js";

export class BlockService {
  constructor(private requestService: BlockRequestService) {}

  async getBlock({ hash }: IHashParameter): Promise<string> {
    const data = await this.requestService.getBlock({ hash });
    return formatResponse<IBlockResponse>("Details about a block.", data);
  }
}
