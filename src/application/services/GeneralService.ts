import { GeneralRequestService } from "../../infrastructure/services/requests/GeneralRequestService.js";
import { formatResponse } from "../helpers/format.js";

export class GeneralService {
  constructor(private requestService: GeneralRequestService) {}

  async getDifficultyAdjustment(): Promise<string> {
    const data = await this.requestService.getDifficultyAdjustment();
    return formatResponse<any>("Difficulty Adjustment", data);
  }

  async getPrice(): Promise<string> {
    const data = await this.requestService.getPrice();
    return formatResponse<any>("Current Price", data);
  }

  async getHistoricalPrice(date: string): Promise<string> {
    const data = await this.requestService.getHistoricalPrice(date);
    return formatResponse<any>("Historical Price", data);
  }
} 