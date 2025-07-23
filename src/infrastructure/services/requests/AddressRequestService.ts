import { IApiClient } from "../../interfaces/IApiClient.js";
import {
  IAddressResponse,
  IAddressTxResponse,
  IAddressUtxoResponse,
} from "../../../domain/models/responses/address/IAddressResponse.js";

export class AddressRequestService {
  constructor(private client: IApiClient) {}

  async getAddressInfo({ address }: { address: string }): Promise<IAddressResponse | null> {
    return this.client.makeRequest<IAddressResponse>(`address/${address}`);
  }

  async getAddressTxs({ address }: { address: string }): Promise<IAddressTxResponse[] | null> {
    return this.client.makeRequest<IAddressTxResponse[]>(`address/${address}/txs`);
  }

  async getAddressTxsChain({ address }: { address: string }): Promise<IAddressTxResponse[] | null> {
    return this.client.makeRequest<IAddressTxResponse[]>(`address/${address}/txs/chain`);
  }

  async getAddressTxsMempool({ address }: { address: string }): Promise<IAddressTxResponse[] | null> {
    return this.client.makeRequest<IAddressTxResponse[]>(`address/${address}/txs/mempool`);
  }

  async getAddressUtxo({ address }: { address: string }): Promise<IAddressUtxoResponse[] | null> {
    return this.client.makeRequest<IAddressUtxoResponse[]>(`address/${address}/utxo`);
  }
} 