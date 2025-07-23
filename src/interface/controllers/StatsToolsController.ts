import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BaseToolsController } from "./base/BaseToolsController.js";
import { StatsService } from "../../application/services/StatsService.js";

export class StatsToolsController extends BaseToolsController {
  constructor(server: McpServer, private statsService: StatsService) {
    super(server);
  }

  protected registerTools(): void {
    this.registerGetStatsHandler();
  }

  private registerGetStatsHandler(): void {
    this.server.tool(
      "get-stats-info",
      "Returns stats info",
      async () => {
        const text = await this.statsService.getStatsInfo();
        return { content: [{ type: "text", text }] };
      }
    );
  }
} 