# Vercel AI Elements Developer Documentation

## Overview

Vercel AI Elements is an open-source React component library built on top of shadcn/ui, designed specifically for building AI-native applications faster. It provides pre-built, customizable components that seamlessly integrate with the Vercel AI SDK to create modern AI interfaces like ChatGPT or v0-style applications.

## Key Features

- **Built on shadcn/ui**: Leverages the popular component library for consistent design
- **TypeScript-first**: Full type safety and excellent developer experience
- **Customizable**: Components are added to your codebase, allowing full control and modification
- **AI SDK Integration**: Seamlessly works with Vercel AI SDK hooks and functions
- **Open Source**: Completely free and open-source

## Prerequisites

Before installing AI Elements, ensure your environment meets these requirements:

- **Node.js**: Version 18 or later
- **Next.js Project**: With AI SDK installed
- **shadcn/ui**: Initialized in your project (`npx shadcn@latest init`)
- **Tailwind CSS**: Configured (AI Elements supports CSS Variables mode only)
- **AI Gateway API Key** (Recommended): For easy model switching and $5 monthly usage

## Installation

### Quick Setup

Install AI Elements using the dedicated CLI:

```bash
npx ai-elements@latest
```

### Alternative Installation via shadcn CLI

If you already use shadcn/ui workflow:

```bash
npx shadcn@latest add aisdk-elements
```

### Installing Individual Components

You can install specific components as needed:

```bash
npx ai-elements@latest add [component-name]
```

### Required Dependencies

Install the necessary AI SDK dependencies:

```bash
npm install ai @ai-sdk/react zod
```

## Environment Setup

Create a `.env.local` file and add your AI Gateway API key:

```env
AI_GATEWAY_API_KEY=your_api_key_here
```

Get your API key from the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway).

## Component Reference

### Core Components

#### Actions
**Purpose**: Provides action buttons for AI responses (retry, like, dislike, copy, share)
**Installation**: `npx ai-elements@latest add actions`
**Usage**: Enhance user interaction with AI responses

#### Branch
**Purpose**: Manages multiple versions of AI messages with navigation controls
**Installation**: `npx ai-elements@latest add branch`
**Usage**: A/B testing responses, response comparison, version management

#### Code Block
**Purpose**: Syntax highlighting, line numbers, and copy-to-clipboard for code
**Installation**: `npx ai-elements@latest add code-block`
**Usage**: Code generation tools, documentation, programming assistance

#### Conversation
**Purpose**: Message container with auto-scroll and scroll-to-bottom functionality
**Installation**: `npx ai-elements@latest add conversation`
**Usage**: Chat interfaces, message threading, conversation management

#### Image
**Purpose**: Displays AI-generated images from the AI SDK
**Installation**: `npx ai-elements@latest add image`
**Usage**: Image generation tools, visual content display

#### Inline Citation
**Purpose**: Academic-style citations with hover interactions for source details
**Installation**: `npx ai-elements@latest add inline-citation`
**Usage**: Research tools, source attribution, academic applications

#### Loader
**Purpose**: Spinning animation for loading states
**Installation**: `npx ai-elements@latest add loader`
**Usage**: Processing indicators, AI thinking states

#### Message
**Purpose**: Chat message display with avatar, name, and content
**Installation**: `npx ai-elements@latest add message`
**Usage**: Chat applications, user/AI communication

#### Prompt Input
**Purpose**: User input with textarea, submit button, and model selection
**Installation**: `npx ai-elements@latest add prompt-input`
**Usage**: User input collection, message composition, model switching

#### Reasoning
**Purpose**: Displays AI reasoning process with auto-expand during streaming
**Installation**: `npx ai-elements@latest add reasoning`
**Usage**: Transparent AI, reasoning visualization, debugging

#### Response
**Purpose**: Renders Markdown responses from language models
**Installation**: `npx ai-elements@latest add response`
**Usage**: AI response display, markdown content rendering

#### Sources
**Purpose**: Displays sources and citations used in AI responses
**Installation**: `npx ai-elements@latest add sources`
**Usage**: Source attribution, citation management, transparency

#### Suggestion
**Purpose**: Horizontal row of clickable suggestion buttons
**Installation**: `npx ai-elements@latest add suggestion`
**Usage**: Quick replies, suggested prompts, user guidance

#### Task
**Purpose**: Structured task lists with progress tracking and collapsible details
**Installation**: `npx ai-elements@latest add task`
**Usage**: Workflow tracking, agent task display, progress indication

#### Tool
**Purpose**: Display and interact with AI tools and functions
**Installation**: `npx ai-elements@latest add tool`
**Usage**: Tool calling interfaces, function execution, agent actions

#### Web Preview
**Purpose**: Showcase generated UI components with live preview
**Installation**: `npx ai-elements@latest add web-preview`
**Usage**: Component demos, UI generation tools, documentation

## Basic Usage Example

Here's a simple example of how to use AI Elements components:

```tsx
'use client';

import { Message, MessageContent } from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';
import { useChat } from '@ai-sdk/react';

export default function ChatExample() {
  const { messages } = useChat();

  return (
    <div>
      {messages.map((message) => (
        <Message from={message.role} key={message.id}>
          <MessageContent>
            {message.parts.map((part, i) => {
              switch (part.type) {
                case 'text':
                  return (
                    <Response key={`${message.id}-${i}`}>
                      {part.text}
                    </Response>
                  );
                default:
                  return null;
              }
            })}
          </MessageContent>
        </Message>
      ))}
    </div>
  );
}
```

## Advanced Usage with AI SDK Integration

### Complete Chatbot Implementation

```tsx
'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { Response } from '@/components/ai-elements/response';
import { Loader } from '@/components/ai-elements/loader';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 h-screen">
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <Response key={`${message.id}-${i}`}>
                            {part.text}
                          </Response>
                        );
                      default:
                        return null;
                    }
                  })}
                </MessageContent>
              </Message>
            ))}
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput onSubmit={handleSubmit} className="mt-4">
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <PromptInputSubmit
            status={status === 'streaming' ? 'streaming' : 'ready'}
            disabled={!input.trim()}
          />
        </PromptInput>
      </div>
    </div>
  );
}
```

### Backend Route Example

```typescript
// app/api/chat/route.ts
import { streamText, UIMessage, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: 'openai/gpt-4o', // Using AI Gateway
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

## Customization

### Styling Components

Since components are added to your codebase, you can modify them directly:

```tsx
// components/ai-elements/message.tsx
export const MessageContent = ({ children, className, ...props }) => (
  <div
    className={cn(
      'flex flex-col gap-2 text-sm text-foreground',
      'group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground',
      // Remove rounding: 'group-[.is-user]:rounded-lg', 
      'group-[.is-user]:px-4 group-[.is-user]:py-3',
      className,
    )}
    {...props}
  >
    <div className="is-user:dark">{children}</div>
  </div>
);
```

### Component Props

All AI Elements components extend their underlying HTML elements, so you can pass any standard props:

```tsx
<Message 
  from="user" 
  className="custom-class" 
  onClick={handleClick}
  data-testid="user-message"
>
  <MessageContent>Hello!</MessageContent>
</Message>
```

## Integration with AI SDK Hooks

### useChat Hook

```tsx
const { 
  messages, 
  sendMessage, 
  status, 
  isLoading 
} = useChat({
  api: '/api/chat',
  initialMessages: [],
});
```

### useObject Hook for Structured Data

```tsx
const { 
  object, 
  submit, 
  isLoading 
} = useObject({
  api: '/api/generate',
  schema: z.object({
    title: z.string(),
    content: z.string(),
  }),
});
```

## Best Practices

### Component Organization

1. **Import components from your local directory**:
   ```tsx
   import { Message } from '@/components/ai-elements/message';
   ```

2. **Use TypeScript for better development experience**:
   ```tsx
   interface ChatProps {
     initialMessages?: UIMessage[];
     onMessageSent?: (message: string) => void;
   }
   ```

3. **Handle loading states properly**:
   ```tsx
   {status === 'submitted' && <Loader />}
   {status === 'streaming' && <LoadingIndicator />}
   ```

### Performance Optimization

1. **Use React.memo for expensive components**:
   ```tsx
   const Message = React.memo(({ from, children }) => {
     // Component implementation
   });
   ```

2. **Implement proper key props for lists**:
   ```tsx
   {messages.map((message) => (
     <Message key={message.id} from={message.role}>
       {/* Content */}
     </Message>
   ))}
   ```

## Troubleshooting

### Common Issues

1. **Components not found**: Ensure you've installed the specific component
   ```bash
   npx ai-elements@latest add [component-name]
   ```

2. **Styling issues**: Verify Tailwind CSS is properly configured and shadcn/ui is set to CSS Variables mode

3. **TypeScript errors**: Make sure you have the latest versions of AI SDK and React types

### Re-installing Components

If you need to update or re-install a component:
```bash
npx ai-elements@latest add [component-name]
```

The CLI will ask before overwriting existing files, preserving your customizations.

## Examples and Templates

### Complete Chatbot with Features

Check out the [chatbot example](https://ai-sdk.dev/elements/examples/chatbot) that includes:
- Reasoning display with Deepseek R1
- Web search with citations
- Model picker
- Source attribution

### v0 Clone

See the [v0 clone example](https://ai-sdk.dev/elements/examples/v0) for building UI generation tools.

## Resources

- **Official Documentation**: [ai-sdk.dev/elements](https://ai-sdk.dev/elements)
- **GitHub Repository**: [vercel/ai](https://github.com/vercel/ai)
- **Community Discord**: [Vercel Community](https://discord.gg/vercel)
- **Examples**: [ai-sdk.dev/elements/examples](https://ai-sdk.dev/elements/examples)

## License

Vercel AI Elements is open-source software licensed under the MIT License.