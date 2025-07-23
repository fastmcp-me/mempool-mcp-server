import { MempoolRequestService } from "../../infrastructure/services/requests/MempoolRequestService.js";
import { formatResponse } from "../helpers/format.js";
import {
  IMempoolInfoResponse,
  IMempoolTxidResponse,
  IMempoolRecentResponse,
} from "../../domain/models/responses/mempool/IMempoolResponse.js";

export class MempoolService {
  constructor(private requestService: MempoolRequestService) {}

  async getMempoolInfo(): Promise<string> {
    const data = await this.requestService.getMempoolInfo();
    return formatResponse<IMempoolInfoResponse>("Mempool Info", data);
  }

  async getMempoolTxids(): Promise<string> {
    const data = await this.requestService.getMempoolTxids();
    return formatResponse<IMempoolTxidResponse[]>("Mempool Txids", data);
  }

  async getMempoolRecent(): Promise<string> {
    const data = await this.requestService.getMempoolRecent();
    return formatResponse<IMempoolRecentResponse[]>("Mempool Recent", data);
  }
} 