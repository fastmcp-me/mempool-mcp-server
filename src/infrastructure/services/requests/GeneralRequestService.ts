import { IApiClient } from "../../interfaces/IApiClient.js";

export class GeneralRequestService {
  constructor(private client: IApiClient) {}

  async getDifficultyAdjustment(): Promise<any | null> {
    return this.client.makeRequest<any>(`difficulty-adjustment`);
  }

  async getPrice(): Promise<any | null> {
    return this.client.makeRequest<any>(`prices`);
  }

  async getHistoricalPrice(date: string): Promise<any | null> {
    // date format: YYYY-MM-DD
    return this.client.makeRequest<any>(`historical-price/${date}`);
  }
} 