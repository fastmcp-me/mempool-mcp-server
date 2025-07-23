#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { MempoolApiClientService } from "./infrastructure/services/clients/MempoolApiClientService.js";
import {
  FeesRequestService,
  BlockRequestService,
  AddressRequestService,
  BlocksRequestService,
  MempoolRequestService,
  MiningRequestService,
  StatsRequestService,
  TxRequestService,
  GeneralRequestService,
} from "./infrastructure/services/requests/index.js";
import {
  FeesService,
  BlockService,
  AddressService,
  BlocksService,
  MempoolService,
  MiningService,
  StatsService,
  TxService,
  GeneralService,
} from "./application/services/index.js";
import {
  FeesToolsController,
  BlockToolsController,
  AddressToolsController,
  BlocksToolsController,
  MempoolToolsController,
  MiningToolsController,
  StatsToolsController,
  TxToolsController,
  GeneralToolsController,
} from "./interface/controllers/index.js";

const mempoolApiClientService = new MempoolApiClientService();

const addressRequestService = new AddressRequestService(
  mempoolApiClientService
);
const feesRequestService = new FeesRequestService(mempoolApiClientService);
const blockRequestService = new BlockRequestService(mempoolApiClientService);
const blocksRequestService = new BlocksRequestService(mempoolApiClientService);
const mempoolRequestService = new MempoolRequestService(
  mempoolApiClientService
);
const miningRequestService = new MiningRequestService(mempoolApiClientService);
const statsRequestService = new StatsRequestService(mempoolApiClientService);
const txRequestService = new TxRequestService(mempoolApiClientService);
const generalRequestService = new GeneralRequestService(
  mempoolApiClientService
);

const addressService = new AddressService(addressRequestService);
const feesService = new FeesService(feesRequestService);
const blockService = new BlockService(blockRequestService);
const blocksService = new BlocksService(blocksRequestService);
const mempoolService = new MempoolService(mempoolRequestService);
const miningService = new MiningService(miningRequestService);
const statsService = new StatsService(statsRequestService);
const txService = new TxService(txRequestService);
const generalService = new GeneralService(generalRequestService);

async function main() {
  const server = new McpServer({
    name: "mempool-mcp-server",
    version: "1.0.0",
  });

  const transport = new StdioServerTransport();

  new AddressToolsController(server, addressService);
  new BlockToolsController(server, blockService);
  new BlocksToolsController(server, blocksService);
  new FeesToolsController(server, feesService);
  new MempoolToolsController(server, mempoolService);
  new MiningToolsController(server, miningService);
  new StatsToolsController(server, statsService);
  new TxToolsController(server, txService);
  new GeneralToolsController(server, generalService);

  await server.connect(transport);
  process.stderr.write(`Mempool.space MCP Server is running on stdio`);
}

main().catch((error) => {
  process.stderr.write(`Fatal error in main():`, error);
  process.exit(1);
});
