import { IApiClient } from "../../interfaces/IApiClient.js";
import { IStatsResponse } from "../../../domain/models/responses/stats/IStatsResponse.js";

export class StatsRequestService {
  constructor(private client: IApiClient) {}

  async getStatsInfo(): Promise<IStatsResponse | null> {
    return this.client.makeRequest<IStatsResponse>(`stats`);
  }
} 