import { ChatMockup, type ChatScript } from "./chat-mockup";
import {
  AgentMockup,
  AIMockup,
  AtlasMockup,
  BotMockup,
  CanvasMockup,
  ClipsMockup,
  CodeMockup,
  ConnectMockup,
  CRMMockup,
  FilesMockup,
  HuddleMockup,
  ListsMockup,
  MessagingMockup,
  PlatformMockup,
  SearchMockup,
  SecurityMockup,
  WorkflowMockup,
} from "./product-mockups";

export type MockupKind =
  | "chat"
  | "chat-channels"
  | "chat-team"
  | "chat-connect"
  | "huddle"
  | "canvas"
  | "lists"
  | "ai"
  | "workflow"
  | "search"
  | "code"
  | "crm"
  | "crm-native"
  | "agent"
  | "bot"
  | "clips"
  | "files"
  | "atlas"
  | "connect"
  | "security"
  | "platform"
  | "messaging";

const chatScripts: Partial<Record<MockupKind, ChatScript>> = {
  chat: "launch",
  "chat-channels": "channels",
  "chat-team": "team",
  "chat-connect": "connect",
};

/** Renders any code-built product mockup by name, so data files can reference them as strings. */
export function Mockup({ kind, className }: { kind: MockupKind; className?: string }) {
  const script = chatScripts[kind];
  if (script) return <ChatMockup script={script} className={className} />;
  switch (kind) {
    case "huddle":
      return <HuddleMockup className={className} />;
    case "canvas":
      return <CanvasMockup className={className} />;
    case "lists":
      return <ListsMockup className={className} />;
    case "ai":
      return <AIMockup className={className} />;
    case "workflow":
      return <WorkflowMockup className={className} />;
    case "search":
      return <SearchMockup className={className} />;
    case "code":
      return <CodeMockup className={className} />;
    case "crm":
      return <CRMMockup className={className} />;
    case "crm-native":
      return <CRMMockup className={className} native />;
    case "agent":
      return <AgentMockup className={className} />;
    case "bot":
      return <BotMockup className={className} />;
    case "clips":
      return <ClipsMockup className={className} />;
    case "files":
      return <FilesMockup className={className} />;
    case "atlas":
      return <AtlasMockup className={className} />;
    case "connect":
      return <ConnectMockup className={className} />;
    case "security":
      return <SecurityMockup className={className} />;
    case "platform":
      return <PlatformMockup className={className} />;
    case "messaging":
      return <MessagingMockup className={className} />;
    default:
      return <ChatMockup className={className} />;
  }
}
