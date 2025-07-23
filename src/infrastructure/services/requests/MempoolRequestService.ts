import { IApiClient } from "../../interfaces/IApiClient.js";
import {
  IMempoolInfoResponse,
  IMempoolTxidResponse,
  IMempoolRecentResponse,
} from "../../../domain/models/responses/mempool/IMempoolResponse.js";

export class MempoolRequestService {
  constructor(private client: IApiClient) {}

  async getMempoolInfo(): Promise<IMempoolInfoResponse | null> {
    return this.client.makeRequest<IMempoolInfoResponse>(`mempool`);
  }

  async getMempoolTxids(): Promise<IMempoolTxidResponse[] | null> {
    return this.client.makeRequest<IMempoolTxidResponse[]>(`mempool/txids`);
  }

  async getMempoolRecent(): Promise<IMempoolRecentResponse[] | null> {
    return this.client.makeRequest<IMempoolRecentResponse[]>(`mempool/recent`);
  }
} 