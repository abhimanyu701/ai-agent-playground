# ai-agent-playground

A TypeScript playground for experimenting with AI agents, tools, and conversations.

## Features

- 🤖 **Agent Management**: Create and configure AI agents with custom behaviors
- 💬 **Conversations**: Manage multi-turn conversations with message history
- 🛠️ **Tools**: Define and execute custom tools/functions for agents
- 📊 **Execution Tracking**: Monitor agent executions and tool calls
- 🔌 **Multi-Provider Support**: Work with different AI providers (OpenAI, Anthropic, etc.)
- 📝 **Type-Safe**: Fully typed with TypeScript for better development experience

## Installation

```bash
npm install
```

## Development

```bash
# Build the project
npm run build

# Watch mode for development
npm run dev

# Clean build artifacts
npm run clean
```

## Type Definitions

The project includes comprehensive type definitions in `index.ts`:

### Core Types

- **Message & Conversation**: For managing chat interactions
- **Agent & AgentConfig**: For defining AI agents and their configurations
- **Tool & ToolExecution**: For defining and executing agent tools
- **ExecutionContext**: For tracking agent task executions
- **Event**: For system events and notifications

### Configuration Types

- **ProviderConfig**: Configure AI model providers
- **PlaygroundConfig**: Global playground settings

### Utility Types

- **PaginatedResponse**: For paginated data
- **FilterOptions**: For querying entities
- **Callbacks**: For streaming, progress, and events

## Usage Example

```typescript
import { Agent, Message, Tool, ExecutionRequest } from './index';

// Define an agent
const agent: Agent = {
  id: 'agent-1',
  name: 'Assistant',
  description: 'A helpful AI assistant',
  model: 'gpt-4',
  temperature: 0.7,
  status: 'idle',
  createdAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
};

// Create a message
const message: Message = {
  id: 'msg-1',
  role: 'user',
  content: 'Hello, AI!',
  timestamp: new Date().toISOString(),
};

// Define a tool
const tool: Tool = {
  id: 'tool-1',
  name: 'calculator',
  description: 'Perform mathematical calculations',
  parameters: [
    {
      name: 'expression',
      type: 'string',
      description: 'Mathematical expression to evaluate',
      required: true,
    },
  ],
};
```

## Project Structure

```
ai-agent-playground/
├── index.ts          # Core type definitions
├── package.json      # Project configuration
├── tsconfig.json     # TypeScript configuration
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Contributing

Contributions are welcome! This is a playground project for experimenting with AI agent concepts.

## License

MIT
