import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BaseToolsController } from "./base/BaseToolsController.js";
import { TxService } from "../../application/services/TxService.js";

export class TxToolsController extends BaseToolsController {
  constructor(server: McpServer, private txService: TxService) {
    super(server);
  }

  protected registerTools(): void {
    this.registerGetTxHandler();
    this.registerGetTxStatusHandler();
    this.registerGetTxRawHandler();
    this.registerGetTxMerkleblockProofHandler();
    this.registerGetTxOutspendHandler();
    this.registerGetTxOutspendsHandler();
  }

  private registerGetTxHandler(): void {
    this.server.tool(
      "get-tx-info",
      "Returns details about a transaction",
      {
        txid: z.string().length(64).describe("The txid to get info for"),
      },
      async ({ txid }) => {
        const text = await this.txService.getTxInfo({ txid });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetTxStatusHandler(): void {
    this.server.tool(
      "get-tx-status",
      "Returns status for a transaction",
      {
        txid: z.string().length(64).describe("The txid to get status for"),
      },
      async ({ txid }) => {
        const text = await this.txService.getTxStatus({ txid });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetTxRawHandler(): void {
    this.server.tool(
      "get-tx-raw",
      "Returns raw hex for a transaction",
      {
        txid: z.string().length(64).describe("The txid to get raw hex for"),
      },
      async ({ txid }) => {
        const text = await this.txService.getTxRaw({ txid });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetTxMerkleblockProofHandler(): void {
    this.server.tool(
      "get-tx-merkleblock-proof",
      "Returns the merkleblock proof for a transaction",
      {
        txid: z.string().length(64).describe("The txid to get merkleblock proof for"),
      },
      async ({ txid }) => {
        const text = await this.txService.getTxMerkleblockProof({ txid });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetTxOutspendHandler(): void {
    this.server.tool(
      "get-tx-outspend",
      "Returns outspend info for a transaction output",
      {
        txid: z.string().length(64).describe("The txid to get outspend for"),
        vout: z.number().int().describe("The vout index to get outspend for"),
      },
      async ({ txid, vout }) => {
        const text = await this.txService.getTxOutspend({ txid, vout });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetTxOutspendsHandler(): void {
    this.server.tool(
      "get-tx-outspends",
      "Returns outspends info for all outputs of a transaction",
      {
        txid: z.string().length(64).describe("The txid to get outspends for"),
      },
      async ({ txid }) => {
        const text = await this.txService.getTxOutspends({ txid });
        return { content: [{ type: "text", text }] };
      }
    );
  }
} 