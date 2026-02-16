/**
 * AI Agent Playground - Core Type Definitions
 * 
 * This file contains the fundamental types for building and working with AI agents.
 */

// ============================================================================
// Base Types
// ============================================================================

/**
 * Unique identifier type for various entities
 */
export type ID = string;

/**
 * ISO 8601 timestamp string
 */
export type Timestamp = string;

/**
 * JSON-serializable value
 */
export type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

// ============================================================================
// Message Types
// ============================================================================

/**
 * Role of the message sender
 */
export type MessageRole = 'system' | 'user' | 'assistant' | 'function' | 'tool';

/**
 * Individual message in a conversation
 */
export interface Message {
  id: ID;
  role: MessageRole;
  content: string;
  timestamp: Timestamp;
  metadata?: Record<string, JSONValue>;
}

/**
 * Conversation thread containing multiple messages
 */
export interface Conversation {
  id: ID;
  messages: Message[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, JSONValue>;
}

// ============================================================================
// Agent Types
// ============================================================================

/**
 * Agent status
 */
export type AgentStatus = 'idle' | 'thinking' | 'executing' | 'waiting' | 'error' | 'completed';

/**
 * Configuration for an AI agent
 */
export interface AgentConfig {
  id: ID;
  name: string;
  description?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  tools?: Tool[];
  metadata?: Record<string, JSONValue>;
}

/**
 * Agent instance with state
 */
export interface Agent extends AgentConfig {
  status: AgentStatus;
  currentConversation?: ID;
  createdAt: Timestamp;
  lastActiveAt: Timestamp;
}

// ============================================================================
// Tool/Function Types
// ============================================================================

/**
 * Parameter definition for a tool
 */
export interface ToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description?: string;
  required?: boolean;
  enum?: string[];
  properties?: Record<string, ToolParameter>;
}

/**
 * Tool/Function that an agent can use
 */
export interface Tool {
  id: ID;
  name: string;
  description: string;
  parameters: ToolParameter[];
  handler?: ToolHandler;
}

/**
 * Handler function for a tool
 */
export type ToolHandler = (args: Record<string, JSONValue>) => Promise<ToolResult>;

/**
 * Result from executing a tool
 */
export interface ToolResult {
  success: boolean;
  data?: JSONValue;
  error?: string;
  metadata?: Record<string, JSONValue>;
}

/**
 * Request to execute a tool
 */
export interface ToolCall {
  id: ID;
  toolId: ID;
  toolName: string;
  arguments: Record<string, JSONValue>;
  timestamp: Timestamp;
}

/**
 * Completed tool execution
 */
export interface ToolExecution extends ToolCall {
  result: ToolResult;
  duration: number;
  completedAt: Timestamp;
}

// ============================================================================
// Execution Types
// ============================================================================

/**
 * Status of an execution
 */
export type ExecutionStatus = 'pending' | 'running' | 'success' | 'failed' | 'cancelled';

/**
 * Agent execution context
 */
export interface ExecutionContext {
  id: ID;
  agentId: ID;
  conversationId: ID;
  status: ExecutionStatus;
  startedAt: Timestamp;
  completedAt?: Timestamp;
  toolCalls?: ToolExecution[];
  error?: string;
  metadata?: Record<string, JSONValue>;
}

/**
 * Request to execute an agent task
 */
export interface ExecutionRequest {
  agentId: ID;
  conversationId?: ID;
  input: string;
  context?: Record<string, JSONValue>;
}

/**
 * Response from an agent execution
 */
export interface ExecutionResponse {
  executionId: ID;
  output: string;
  status: ExecutionStatus;
  toolsUsed?: ToolExecution[];
  metadata?: Record<string, JSONValue>;
}

// ============================================================================
// Event Types
// ============================================================================

/**
 * Types of events that can occur
 */
export type EventType = 
  | 'agent.created'
  | 'agent.updated'
  | 'agent.deleted'
  | 'message.created'
  | 'conversation.started'
  | 'conversation.ended'
  | 'tool.called'
  | 'tool.completed'
  | 'execution.started'
  | 'execution.completed'
  | 'execution.failed';

/**
 * Event emitted by the system
 */
export interface Event<T = JSONValue> {
  id: ID;
  type: EventType;
  timestamp: Timestamp;
  payload: T;
  metadata?: Record<string, JSONValue>;
}

// ============================================================================
// Configuration Types
// ============================================================================

/**
 * Provider for AI models (OpenAI, Anthropic, etc.)
 */
export type ModelProvider = 'openai' | 'anthropic' | 'google' | 'azure' | 'custom';

/**
 * Configuration for connecting to an AI provider
 */
export interface ProviderConfig {
  provider: ModelProvider;
  apiKey?: string;
  baseUrl?: string;
  organization?: string;
  defaultModel?: string;
  timeout?: number;
  maxRetries?: number;
  metadata?: Record<string, JSONValue>;
}

/**
 * Global playground configuration
 */
export interface PlaygroundConfig {
  providers: ProviderConfig[];
  defaultProvider?: ModelProvider;
  enableLogging?: boolean;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  maxConcurrentExecutions?: number;
  metadata?: Record<string, JSONValue>;
}

// ============================================================================
// Error Types
// ============================================================================

/**
 * Error code for categorizing errors
 */
export type ErrorCode = 
  | 'INVALID_INPUT'
  | 'AGENT_NOT_FOUND'
  | 'TOOL_NOT_FOUND'
  | 'EXECUTION_FAILED'
  | 'RATE_LIMIT_EXCEEDED'
  | 'AUTHENTICATION_FAILED'
  | 'PROVIDER_ERROR'
  | 'TIMEOUT'
  | 'UNKNOWN_ERROR';

/**
 * Structured error information
 */
export interface AgentError {
  code: ErrorCode;
  message: string;
  details?: JSONValue;
  timestamp: Timestamp;
  stack?: string;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Partial update type for any entity
 */
export type PartialUpdate<T> = Partial<Omit<T, 'id' | 'createdAt'>>;

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * Filter options for querying entities
 */
export interface FilterOptions {
  status?: string | string[];
  createdAfter?: Timestamp;
  createdBefore?: Timestamp;
  metadata?: Record<string, JSONValue>;
}

// ============================================================================
// Callback Types
// ============================================================================

/**
 * Callback for streaming responses
 */
export type StreamCallback = (chunk: string) => void;

/**
 * Callback for progress updates
 */
export type ProgressCallback = (progress: {
  current: number;
  total: number;
  message?: string;
}) => void;

/**
 * Callback for event notifications
 */
export type EventCallback<T = JSONValue> = (event: Event<T>) => void;

// ============================================================================
// Export all types
// ============================================================================

export default {
  // This allows for: import types from './index'
  // while still supporting named imports
};
