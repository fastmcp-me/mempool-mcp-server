import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BaseToolsController } from "./base/BaseToolsController.js";
import { BlocksService } from "../../application/services/BlocksService.js";

export class BlocksToolsController extends BaseToolsController {
  constructor(server: McpServer, private blocksService: BlocksService) {
    super(server);
  }

  protected registerTools(): void {
    this.registerGetBlocksHandler();
    this.registerGetBlockTxidsHandler();
    this.registerGetBlockTxsHandler();
    this.registerGetBlockStatusHandler();
    this.registerGetBlockRawHandler();
    this.registerGetBlockTxidByIndexHandler();
    this.registerGetBlockHeaderHandler();
  }

  private registerGetBlocksHandler(): void {
    this.server.tool(
      "get-blocks",
      "Returns the latest blocks",
      {},
      async () => {
        const text = await this.blocksService.getBlocks();
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetBlockTxidsHandler(): void {
    this.server.tool(
      "get-block-txids",
      "Returns txids for a block",
      {
        hash: z.string().length(64).describe("The block hash to get txids for"),
      },
      async ({ hash }) => {
        const text = await this.blocksService.getBlockTxids({ hash });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetBlockTxsHandler(): void {
    this.server.tool(
      "get-block-txs",
      "Returns transactions for a block",
      {
        hash: z.string().length(64).describe("The block hash to get txs for"),
      },
      async ({ hash }) => {
        const text = await this.blocksService.getBlockTxs({ hash });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetBlockStatusHandler(): void {
    this.server.tool(
      "get-block-status",
      "Returns status for a block",
      {
        hash: z.string().length(64).describe("The block hash to get status for"),
      },
      async ({ hash }) => {
        const text = await this.blocksService.getBlockStatus({ hash });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetBlockRawHandler(): void {
    this.server.tool(
      "get-block-raw",
      "Returns raw hex for a block",
      {
        hash: z.string().length(64).describe("The block hash to get raw hex for"),
      },
      async ({ hash }) => {
        const text = await this.blocksService.getBlockRaw({ hash });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetBlockTxidByIndexHandler(): void {
    this.server.tool(
      "get-block-txid-by-index",
      "Returns txid for a block at a specific index",
      {
        hash: z.string().length(64).describe("The block hash to get txid for"),
        index: z.number().int().describe("The index of the txid in the block"),
      },
      async ({ hash, index }) => {
        const text = await this.blocksService.getBlockTxidByIndex({ hash, index });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetBlockHeaderHandler(): void {
    this.server.tool(
      "get-block-header",
      "Returns the block header in hex",
      {
        hash: z.string().length(64).describe("The block hash to get header for"),
      },
      async ({ hash }) => {
        const text = await this.blocksService.getBlockHeader({ hash });
        return { content: [{ type: "text", text }] };
      }
    );
  }
} 