import { TxRequestService } from "../../infrastructure/services/requests/TxRequestService.js";
import { formatResponse } from "../helpers/format.js";
import {
  ITxResponse,
  ITxStatusResponse,
} from "../../domain/models/responses/tx/ITxResponse.js";

export class TxService {
  constructor(private requestService: TxRequestService) {}

  async getTxInfo({ txid }: { txid: string }): Promise<string> {
    const data = await this.requestService.getTxInfo({ txid });
    return formatResponse<ITxResponse>("Transaction Info", data);
  }

  async getTxStatus({ txid }: { txid: string }): Promise<string> {
    const data = await this.requestService.getTxStatus({ txid });
    return formatResponse<ITxStatusResponse>("Transaction Status", data);
  }

  async getTxRaw({ txid }: { txid: string }): Promise<string> {
    const data = await this.requestService.getTxRaw({ txid });
    return `Transaction Raw Hex: ${data}`;
  }

  async getTxMerkleblockProof({ txid }: { txid: string }): Promise<string> {
    const data = await this.requestService.getTxMerkleblockProof({ txid });
    return `Transaction Merkleblock Proof: ${data}`;
  }

  async getTxOutspend({
    txid,
    vout,
  }: {
    txid: string;
    vout: number;
  }): Promise<string> {
    const data = await this.requestService.getTxOutspend({ txid, vout });
    return formatResponse<any>("Transaction Outspend", data);
  }

  async getTxOutspends({ txid }: { txid: string }): Promise<string> {
    const data = await this.requestService.getTxOutspends({ txid });
    return formatResponse<any[]>("Transaction Outspends", data);
  }
}
