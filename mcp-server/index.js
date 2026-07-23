import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';

const server = new Server(
  {
    name: 'bigtopsocial-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// Define a tool to get project statistics
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_project_stats',
        description: 'Returns statistics about the Bigtopsocial project components and pages',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async request => {
  if (request.params.name === 'get_project_stats') {
    try {
      const componentsDir = path.resolve(process.cwd(), 'components');
      const appDir = path.resolve(process.cwd(), 'app');

      let componentCount = 0;
      let pageCount = 0;

      try {
        const components = await fs.readdir(componentsDir, { recursive: true });
        componentCount = components.filter(
          f => typeof f === 'string' && (f.endsWith('.tsx') || f.endsWith('.jsx')),
        ).length;
      } catch (e) {
        // Directory might not exist or be accessible
      }
      try {
        const pages = await fs.readdir(appDir, { recursive: true });
        pageCount = pages.filter(f => typeof f === 'string' && f.endsWith('page.tsx')).length;
      } catch (e) {
        // Directory might not exist or be accessible
      }
      return {
        content: [
          {
            type: 'text',
            text: `Project Stats:\n- Components: ${componentCount}\n- Pages: ${pageCount}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error getting project stats: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error('Tool not found');
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Bigtopsocial MCP Server running on stdio');
}

main().catch(error => {
  console.error('Fatal error running MCP server:', error);
  process.exit(1);
});
