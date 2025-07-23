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
import { HelpService } from "./application/services/HelpService.js";
import { HelpToolsController } from "./interface/controllers/HelpToolsController.js";

function parseArgs() {
  const args = process.argv.slice(2);
  let baseUrl = process.env.MEMPOOL_BASE_URL || "https://mempool.space/api";

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--base-url":
        baseUrl = args[++i];
        break;
      case "--help":
      case "-h":
        showHelp();
        process.exit(0);
    }
  }

  return { baseUrl };
}

function showHelp() {
  console.log(`
Mempool MCP Server

Usage: node build/main.js [options]

Options:
  --base-url <url>         Base URL for mempool API [default: https://mempool.space/api]
  --help, -h               Show this help message

Environment Variables:
  MEMPOOL_BASE_URL        Same as --base-url

Examples:
  node build/main.js
  node build/main.js --base-url http://umbrel.local:3006/api
  MEMPOOL_BASE_URL=http://umbrel.local:3006/api node build/main.js
  `);
}

const { baseUrl } = parseArgs();

const mempoolApiClientService = new MempoolApiClientService(baseUrl);

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
const helpService = new HelpService(baseUrl);

async function main() {
  const server = new McpServer({
    name: "mempool-mcp-server",
    version: "1.0.1",
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
  new HelpToolsController(server, helpService);

  await server.connect(transport);
  process.stderr.write(
    `Mempool.space MCP Server is running on stdio (${baseUrl})\n`
  );
}

main().catch((error) => {
  process.stderr.write(`Fatal error in main(): ${error?.message}\n`);
  process.exit(1);
});
