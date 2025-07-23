import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BaseToolsController } from "./base/BaseToolsController.js";
import { MiningService } from "../../application/services/MiningService.js";

export class MiningToolsController extends BaseToolsController {
  constructor(server: McpServer, private miningService: MiningService) {
    super(server);
  }

  protected registerTools(): void {
    this.registerGetMiningPoolsHandler();
    this.registerGetMiningPoolHandler();
    this.registerGetMiningBlocksFees24hHandler();
  }

  private registerGetMiningPoolsHandler(): void {
    this.server.tool(
      "get-mining-pools",
      "Returns mining pools info",
      async () => {
        const text = await this.miningService.getMiningPools();
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetMiningPoolHandler(): void {
    this.server.tool(
      "get-mining-pool",
      "Returns info for a specific mining pool",
      {
        poolId: z.string().describe("The poolId to get info for"),
      },
      async ({ poolId }) => {
        const text = await this.miningService.getMiningPool({ poolId });
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetMiningBlocksFees24hHandler(): void {
    this.server.tool(
      "get-mining-blocks-fees-24h",
      "Returns mining blocks fees for the last 24h",
      async () => {
        const text = await this.miningService.getMiningBlocksFees24h();
        return { content: [{ type: "text", text }] };
      }
    );
  }
} 