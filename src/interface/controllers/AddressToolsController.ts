import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BaseToolsController } from "./base/BaseToolsController.js";
import { AddressService } from "../../application/services/AddressService.js";

export class AddressToolsController extends BaseToolsController {
  constructor(server: McpServer, private addressService: AddressService) {
    super(server);
  }

  protected registerTools(): void {
    this.registerGetAddressHandler();
    this.registerGetAddressTxsHandler();
    this.registerGetAddressTxsChainHandler();
    this.registerGetAddressTxsMempoolHandler();
    this.registerGetAddressUtxoHandler();
  }

  private registerGetAddressHandler(): void {
    this.server.tool(
      "get-address-info",
      "Returns details about an address",
      {
        address: z.string().describe("The address to get info for"),
      },
      async ({ address }) => {
        const text = await this.addressService.getAddressInfo({ address });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetAddressTxsHandler(): void {
    this.server.tool(
      "get-address-txs",
      "Returns transactions for an address",
      {
        address: z.string().describe("The address to get txs for"),
      },
      async ({ address }) => {
        const text = await this.addressService.getAddressTxs({ address });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetAddressTxsChainHandler(): void {
    this.server.tool(
      "get-address-txs-chain",
      "Returns chain transactions for an address",
      {
        address: z.string().describe("The address to get chain txs for"),
      },
      async ({ address }) => {
        const text = await this.addressService.getAddressTxsChain({ address });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetAddressTxsMempoolHandler(): void {
    this.server.tool(
      "get-address-txs-mempool",
      "Returns mempool transactions for an address",
      {
        address: z.string().describe("The address to get mempool txs for"),
      },
      async ({ address }) => {
        const text = await this.addressService.getAddressTxsMempool({ address });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetAddressUtxoHandler(): void {
    this.server.tool(
      "get-address-utxo",
      "Returns UTXOs for an address",
      {
        address: z.string().describe("The address to get UTXOs for"),
      },
      async ({ address }) => {
        const text = await this.addressService.getAddressUtxo({ address });
        return { content: [{ type: "text", text }] };
      }
    );
  }
} 