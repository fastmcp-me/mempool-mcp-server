import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BaseToolsController } from "./base/BaseToolsController.js";
import { GeneralService } from "../../application/services/GeneralService.js";

export class GeneralToolsController extends BaseToolsController {
  constructor(server: McpServer, private generalService: GeneralService) {
    super(server);
  }

  protected registerTools(): void {
    this.registerGetDifficultyAdjustmentHandler();
    this.registerGetPriceHandler();
    this.registerGetHistoricalPriceHandler();
  }

  private registerGetDifficultyAdjustmentHandler(): void {
    this.server.tool(
      "get-difficulty-adjustment",
      "Returns current and next Bitcoin difficulty adjustment info",
      async () => {
        const text = await this.generalService.getDifficultyAdjustment();
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetPriceHandler(): void {
    this.server.tool(
      "get-price",
      "Returns the current BTC price in various fiat currencies",
      async () => {
        const text = await this.generalService.getPrice();
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetHistoricalPriceHandler(): void {
    this.server.tool(
      "get-historical-price",
      "Returns the BTC price for a specific date (YYYY-MM-DD)",
      {
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("The date in YYYY-MM-DD format")
      },
      async ({ date }) => {
        const text = await this.generalService.getHistoricalPrice(date);
        return { content: [{ type: "text", text }] };
      }
    );
  }
} 