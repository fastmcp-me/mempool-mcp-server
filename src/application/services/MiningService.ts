import { MiningRequestService } from "../../infrastructure/services/requests/MiningRequestService.js";
import { formatResponse } from "../helpers/format.js";
import {
  IMiningPoolsResponse,
  IMiningPoolResponse,
} from "../../domain/models/responses/mining/IMiningResponse.js";

export class MiningService {
  constructor(private requestService: MiningRequestService) {}

  async getMiningPools(): Promise<string> {
    const data = await this.requestService.getMiningPools();
    return formatResponse<IMiningPoolsResponse[]>("Mining Pools", data);
  }

  async getMiningPool({ poolId }: { poolId: string }): Promise<string> {
    const data = await this.requestService.getMiningPool({ poolId });
    return formatResponse<IMiningPoolResponse>("Mining Pool", data);
  }

  async getMiningBlocksFees24h(): Promise<string> {
    const data = await this.requestService.getMiningBlocksFees24h();
    return formatResponse<any[]>("Mining Blocks Fees 24h", data);
  }
} 