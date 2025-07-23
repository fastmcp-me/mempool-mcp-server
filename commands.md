## Run server

```bash

npm install
npm run build
npm run server

```

## Run on local Bitcoin node as Umbrel

```bash
node build/main.js --base-url http://umbrel.local:3006/api
```



## Help

```bash

node build/main.js --help

```

## Debug with inspector

```bash
npx @modelcontextprotocol/inspector node main.js
```

## Debug server with Clause (See logs)

```bash

tail -n 20 -F ~/Library/Logs/Claude/mcp*.log

```
