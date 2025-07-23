import { IApiClient } from "../../interfaces/IApiClient.js";
import {
  ITxResponse,
  ITxStatusResponse,
} from "../../../domain/models/responses/tx/ITxResponse.js";

export class TxRequestService {
  constructor(private client: IApiClient) {}

  async getTxInfo({ txid }: { txid: string }): Promise<ITxResponse | null> {
    return this.client.makeRequest<ITxResponse>(`tx/${txid}`);
  }

  async getTxStatus({ txid }: { txid: string }): Promise<ITxStatusResponse | null> {
    return this.client.makeRequest<ITxStatusResponse>(`tx/${txid}/status`);
  }

  async getTxRaw({ txid }: { txid: string }): Promise<string | null> {
    return this.client.makeRequest<string>(`tx/${txid}/raw`);
  }

  async getTxMerkleblockProof({ txid }: { txid: string }): Promise<string | null> {
    return this.client.makeRequest<string>(`tx/${txid}/merkleblock-proof`);
  }

  async getTxOutspend({ txid, vout }: { txid: string; vout: number }): Promise<any | null> {
    return this.client.makeRequest<any>(`tx/${txid}/outspend/${vout}`);
  }

  async getTxOutspends({ txid }: { txid: string }): Promise<any[] | null> {
    return this.client.makeRequest<any[]>(`tx/${txid}/outspends`);
  }
} 