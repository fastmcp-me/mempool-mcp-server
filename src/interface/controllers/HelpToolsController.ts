import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BaseToolsController } from "./base/BaseToolsController.js";
import { HelpService } from "../../application/services/HelpService.js";

export class HelpToolsController extends BaseToolsController {
  constructor(server: McpServer, private service: HelpService) {
    super(server);
  }

  protected registerTools(): void {
    this.registerGetBaseURL();
  }

  private registerGetBaseURL(): void {
    this.server.tool(
      "get-base-url",
      "Returns mempool.space base url api",
      async () => {
        const text = await this.service.getBaseUrl();
        return { content: [{ type: "text", text }] };
      }
    );
  }
}
