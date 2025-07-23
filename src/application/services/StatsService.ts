import { StatsRequestService } from "../../infrastructure/services/requests/StatsRequestService.js";
import { formatResponse } from "../helpers/format.js";
import { IStatsResponse } from "../../domain/models/responses/stats/IStatsResponse.js";

export class StatsService {
  constructor(private requestService: StatsRequestService) {}

  async getStatsInfo(): Promise<string> {
    const data = await this.requestService.getStatsInfo();
    return formatResponse<IStatsResponse>("Stats Info", data);
  }
} 