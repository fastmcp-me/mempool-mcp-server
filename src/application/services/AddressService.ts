import { AddressRequestService } from "../../infrastructure/services/requests/AddressRequestService.js";
import { formatResponse } from "../helpers/format.js";
import {
  IAddressResponse,
  IAddressTxResponse,
  IAddressUtxoResponse,
} from "../../domain/models/responses/address/IAddressResponse.js";
import { IAddressParameter } from "../../shared/parameters/IAddressParameter.js";

export class AddressService {
  constructor(private requestService: AddressRequestService) {}

  async getAddressInfo({ address }: IAddressParameter): Promise<string> {
    const data = await this.requestService.getAddressInfo({ address });
    return formatResponse<IAddressResponse>("Address Info", data);
  }

  async getAddressTxs({ address }: IAddressParameter): Promise<string> {
    const data = await this.requestService.getAddressTxs({ address });
    return formatResponse<IAddressTxResponse[]>("Address Transactions", data);
  }

  async getAddressTxsChain({ address }: IAddressParameter): Promise<string> {
    const data = await this.requestService.getAddressTxsChain({ address });
    return formatResponse<IAddressTxResponse[]>(
      "Address Chain Transactions",
      data
    );
  }

  async getAddressTxsMempool({ address }: IAddressParameter): Promise<string> {
    const data = await this.requestService.getAddressTxsMempool({ address });
    return formatResponse<IAddressTxResponse[]>(
      "Address Mempool Transactions",
      data
    );
  }

  async getAddressUtxo({ address }: IAddressParameter): Promise<string> {
    const data = await this.requestService.getAddressUtxo({ address });
    return formatResponse<IAddressUtxoResponse[]>("Address UTXOs", data);
  }
}
