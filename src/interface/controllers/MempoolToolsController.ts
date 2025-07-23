import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BaseToolsController } from "./base/BaseToolsController.js";
import { MempoolService } from "../../application/services/MempoolService.js";

export class MempoolToolsController extends BaseToolsController {
  constructor(server: McpServer, private mempoolService: MempoolService) {
    super(server);
  }

  protected registerTools(): void {
    this.registerGetMempoolHandler();
    this.registerGetMempoolTxidsHandler();
    this.registerGetMempoolRecentHandler();
  }

  private registerGetMempoolHandler(): void {
    this.server.tool(
      "get-mempool-info",
      "Returns mempool info",
      async () => {
        const text = await this.mempoolService.getMempoolInfo();
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetMempoolTxidsHandler(): void {
    this.server.tool(
      "get-mempool-txids",
      "Returns mempool txids",
      async () => {
        const text = await this.mempoolService.getMempoolTxids();
        return { content: [{ type: "text", text }] };
      }
    );
  }

  private registerGetMempoolRecentHandler(): void {
    this.server.tool(
      "get-mempool-recent",
      "Returns recent mempool transactions",
      async () => {
        const text = await this.mempoolService.getMempoolRecent();
        return { content: [{ type: "text", text }] };
      }
    );
  }
} 