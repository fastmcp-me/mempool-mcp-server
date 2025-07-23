import { IApiClient } from "../../interfaces/IApiClient.js";
import {
  IMiningPoolsResponse,
  IMiningPoolResponse,
} from "../../../domain/models/responses/mining/IMiningResponse.js";

export class MiningRequestService {
  constructor(private client: IApiClient) {}

  async getMiningPools(): Promise<IMiningPoolsResponse[] | null> {
    return this.client.makeRequest<IMiningPoolsResponse[]>(`mining/pools`);
  }

  async getMiningPool({ poolId }: { poolId: string }): Promise<IMiningPoolResponse | null> {
    return this.client.makeRequest<IMiningPoolResponse>(`mining/pool/${poolId}`);
  }

  async getMiningBlocksFees24h(): Promise<any[] | null> {
    return this.client.makeRequest<any[]>(`v1/mining/blocks/fees/24h`);
  }
} 