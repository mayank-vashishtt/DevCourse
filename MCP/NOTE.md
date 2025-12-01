# Model Context Protocol (MCP) - Complete Guide
## From Basics to Advanced

---

## 📚 Table of Contents
1. [The Evolution: Understanding the Timeline](#timeline)
2. [The Problem MCP Solves](#the-problem)
3. [What is MCP?](#what-is-mcp)
4. [Core Architecture Components](#architecture)
5. [The Three Pillars of MCP](#three-pillars)
6. [The USB Analogy](#usb-analogy)
7. [Real-World Examples](#examples)
8. [Technical Deep Dive](#technical-deep-dive)
9. [Building with MCP](#building-with-mcp)

---

## 🕐 The Evolution Timeline {#timeline}

### Stage 1: Basic LLMs (2020-2022)
**What it was:** AI models trained on vast text data
- **Capability:** Generate text based on patterns learned during training
- **Limitation:** Knowledge frozen at training cutoff date
- **Example:** "What's the weather today?" → Can't answer (no real-time data)

```
User → LLM → Response (based only on training data)
```

### Stage 2: LLM + Context (2022-2023)
**What changed:** Adding external information to prompts
- **Capability:** Provide relevant information in the prompt itself
- **Technique:** RAG (Retrieval-Augmented Generation)
- **Limitation:** Still required custom code for each integration

```
User → Retrieve relevant docs → Add to prompt → LLM → Response
```

**Problem:** Every app needed custom integration code:
- Custom code to fetch from database
- Custom code to search documents
- Custom code to call APIs
- No standardization!

### Stage 3: MCP Era (Late 2024 - Present)
**What changed:** Standardized protocol for AI-to-external-world communication
- **Capability:** Universal interface for all integrations
- **Benefit:** Build once, use everywhere
- **Ecosystem:** Community-shared MCP servers

```
User → Host → MCP Client → MCP Server (standard protocol) → Data Source
                                                            → APIs
                                                            → Tools
```

---

## 🔴 The Problem MCP Solves {#the-problem}

### The M × N Integration Problem

Imagine you have:
- **M = 5 AI applications** (ChatGPT interface, Claude app, Custom AI tool, AI IDE, AI assistant)
- **N = 10 data sources** (Google Drive, Slack, GitHub, Database, Email, Calendar, CRM, Analytics, Files, APIs)

#### Without MCP (The Old Way)
You'd need **M × N = 5 × 10 = 50 custom integrations!**

```
AI App 1 ──┬── Custom connector → Google Drive
           ├── Custom connector → Slack
           ├── Custom connector → GitHub
           └── Custom connector → ... (and 7 more)

AI App 2 ──┬── Custom connector → Google Drive (rebuild again!)
           ├── Custom connector → Slack (rebuild again!)
           └── ... (rebuild all 10 again!)

... and so on for all 5 apps
```

**Problems:**
- 🔴 Duplicated work (50 different connectors!)
- 🔴 Hard to maintain (fix a bug = fix it 5 times)
- 🔴 Inconsistent behavior across apps
- 🔴 Slow to add new integrations

#### With MCP (The New Way)
You need only **M + N = 5 + 10 = 15 implementations!**

```
AI App 1 ──┐
AI App 2 ──┤
AI App 3 ──┼── MCP Protocol ──┬── Google Drive MCP Server
AI App 4 ──┤                  ├── Slack MCP Server
AI App 5 ──┘                  ├── GitHub MCP Server
                              └── ... (7 more MCP servers)
```

**Benefits:**
- ✅ Build connector once, use everywhere
- ✅ Fix bugs once, benefits all apps
- ✅ Consistent behavior
- ✅ Community can share servers

---

## 🎯 What is MCP? {#what-is-mcp}

### Official Definition
**Model Context Protocol (MCP)** is a standardized interface and protocol that allows AI models to seamlessly interact with external tools, resources, and environments.

### Simple Definition
MCP is like a **universal translator** between AI apps and the outside world (databases, APIs, tools, files, etc.)

### Key Characteristics

#### 1. It's a Protocol (Not a Framework)
- **Protocol** = Set of rules for communication (like HTTP, Bluetooth)
- Think of it as the "language" AI and tools use to talk
- Defines how messages are structured and exchanged

#### 2. It's a Standard
- Everyone follows the same rules
- Like USB: one port works with all devices

#### 3. It's Open Source
- Anyone can build MCP servers
- Community-driven ecosystem
- Free to use and extend

---

## 🏗️ Core Architecture Components {#architecture}

### 1. The Host
**What it is:** The user-facing AI application

**Examples:**
- Anthropic's Claude desktop app
- OpenAI's ChatGPT interface
- Custom AI applications
- AI-powered IDEs

**Responsibilities:**
- 👤 Capture user input
- 💬 Maintain conversation history
- 🖥️ Display model responses
- 🔌 Initiate connections to MCP servers
- 🧠 Decide when to use which tools/resources

**Analogy:** The Host is like your web browser - it's what you interact with directly.

```
┌─────────────────────────────┐
│         HOST                │
│  (Claude App, ChatGPT, etc) │
│                             │
│  ┌───────────────────────┐  │
│  │   User Interface      │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │   MCP Client          │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### 2. The MCP Client
**What it is:** A component within the Host that handles communication with MCP servers

**Responsibilities:**
- 📡 Speak the MCP protocol
- 🔄 Send requests to servers
- 📥 Receive responses from servers
- 🔐 Handle authentication
- ⚡ Manage connections

**Analogy:** The Client is like your browser's HTTP handler - you don't see it, but it does the technical work of fetching web pages.

**Key Point:** You don't directly interact with the Client - it's the "messenger" that carries out the Host's instructions.

### 3. The MCP Server
**What it is:** External program that provides capabilities (tools, data, etc.)

**Examples:**
- Google Drive MCP Server (accesses your files)
- Slack MCP Server (reads/sends messages)
- Database MCP Server (queries your database)
- GitHub MCP Server (interacts with repos)
- Weather API MCP Server (gets weather data)

**Responsibilities:**
- 🛠️ Implement actual functionality
- 📊 Provide data/resources
- ⚙️ Execute tools/actions
- 🔒 Handle permissions and security

**Deployment:**
- Can run locally (same machine as Host)
- Can run remotely (cloud service)
- MCP supports both seamlessly

```
┌─────────────────────────────┐
│      MCP SERVER             │
│  (Google Drive, Slack, etc) │
│                             │
│  ┌───────────────────────┐  │
│  │  Tools                │  │
│  │  - createFile()       │  │
│  │  - searchDocs()       │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │  Resources            │  │
│  │  - file://doc.txt     │  │
│  └───────────────────────┘  │
│  ┌───────────────────────┐  │
│  │  Prompts              │  │
│  │  - summarize_template │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### Complete Flow

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐
│   USER   │────▶│     HOST     │────▶│ MCP CLIENT   │
└──────────┘     │ (Claude App) │     └──────────────┘
                 └──────────────┘            │
                                             │ MCP Protocol
                                             ▼
                 ┌─────────────────────────────────────┐
                 │        MCP SERVERS                  │
                 ├──────────┬──────────┬──────────────┤
                 │  Google  │  Slack   │   Database   │
                 │  Drive   │          │              │
                 └──────────┴──────────┴──────────────┘
```

**Step-by-step example:**
1. **User:** "Find my Q3 sales report"
2. **Host:** Understands intent, decides to use Google Drive
3. **MCP Client:** Sends search request via MCP protocol
4. **MCP Server (Google Drive):** Searches files, returns results
5. **MCP Client:** Receives results
6. **Host:** Displays results to user

---

## 🎨 The Three Pillars of MCP {#three-pillars}

MCP provides three core capabilities that servers can offer:

### 1. 🛠️ Tools
**What they are:** Functions that perform actions or computations

**Characteristics:**
- Can have side effects (modify data, send messages, etc.)
- Require computation
- Interactive operations

**Examples:**

```javascript
// Tool: Send Slack Message
{
  name: "send_slack_message",
  description: "Send a message to a Slack channel",
  parameters: {
    channel: "string",
    message: "string"
  }
}

// Tool: Create Database Record
{
  name: "create_user",
  description: "Create a new user in database",
  parameters: {
    name: "string",
    email: "string",
    role: "string"
  }
}

// Tool: Analyze Image
{
  name: "analyze_image",
  description: "Run computer vision on an image",
  parameters: {
    image_url: "string",
    analysis_type: "string"
  }
}
```

**Real-world scenarios:**
- 📧 Send an email
- 📊 Generate a report
- 🔄 Update a spreadsheet
- 🤖 Trigger a workflow
- 💾 Save file to cloud

### 2. 📚 Resources
**What they are:** Read-only data sources

**Characteristics:**
- No side effects (don't modify anything)
- Information lookup/retrieval
- Typically lightweight

**Examples:**

```javascript
// Resource: File System
{
  uri: "file:///documents/report.pdf",
  name: "Q3 Sales Report",
  mimeType: "application/pdf"
}

// Resource: Database Query Result
{
  uri: "db://users/active",
  name: "Active Users List",
  mimeType: "application/json"
}

// Resource: API Endpoint
{
  uri: "api://weather/current",
  name: "Current Weather Data",
  mimeType: "application/json"
}
```

**Real-world scenarios:**
- 📄 Read documentation
- 🔍 Search knowledge base
- 📊 Query database (read-only)
- 📁 Access file contents
- 🌐 Fetch API data

**Key Difference from Tools:**
- **Tools:** "Do something" (actions)
- **Resources:** "Get something" (data)

### 3. 💭 Prompts
**What they are:** Pre-defined prompt templates or conversation flows

**Characteristics:**
- Guide AI behavior
- Reusable conversation patterns
- Can include context or instructions

**Examples:**

```javascript
// Prompt: Code Review Template
{
  name: "code_review",
  description: "Review code for best practices",
  template: `
    Please review the following code:
    {code}
    
    Focus on:
    - Security vulnerabilities
    - Performance issues
    - Code style
    - Best practices
  `
}

// Prompt: Customer Support Flow
{
  name: "support_greeting",
  description: "Greet customer and gather issue details",
  template: `
    You are a friendly customer support agent.
    Greet the customer and ask:
    1. What product they're using
    2. What issue they're experiencing
    3. When the issue started
  `
}

// Prompt: Data Analysis Assistant
{
  name: "analyze_data",
  description: "Analyze dataset and provide insights",
  template: `
    Analyze this dataset: {dataset_uri}
    
    Provide:
    - Summary statistics
    - Key trends
    - Anomalies
    - Recommendations
  `
}
```

**Real-world scenarios:**
- 📝 Standardized responses
- 🎯 Role-based behaviors
- 🔄 Workflow templates
- 📋 Analysis frameworks
- 🤝 Conversation patterns

---

## 🔌 The USB Analogy {#usb-analogy}

### Before USB (Like Before MCP)

Every device needed its own connector:
- 🖱️ Mouse → PS/2 port
- ⌨️ Keyboard → Different connector
- 🖨️ Printer → Parallel port
- 📷 Camera → Serial port
- 🎮 Gamepad → Gameport

**Problems:**
- Different ports for everything
- Can't use same device across computers easily
- Manufacturers build custom drivers for each port
- Limited ports on computer

### After USB (Like After MCP)

One universal connector:
- 🔌 USB port accepts all devices
- Plug and play
- Same device works on any computer
- Standard protocol for communication

```
Before USB:                    After USB:
Mouse ──── PS/2 Port          Mouse ────┐
Keyboard ── Different Port    Keyboard ─┤
Printer ──── Parallel Port    Printer ──┼──▶ USB Port
Camera ──── Serial Port       Camera ───┤
Gamepad ──── Gameport         Gamepad ──┘
```

### MCP is USB for AI

```
Before MCP:                        After MCP:
Google Drive ── Custom Code        Google Drive ──┐
Slack ────── Custom Code          Slack ─────────┤
GitHub ────── Custom Code    →    GitHub ────────┼──▶ MCP Protocol
Database ──── Custom Code         Database ──────┤
Email ────── Custom Code          Email ─────────┘
```

**Benefits of both USB and MCP:**
- ✅ Universal standard
- ✅ Build once, use everywhere
- ✅ Plug and play
- ✅ Ecosystem of compatible devices/servers

---

## 🌍 Real-World Examples {#examples}

### Example 1: AI Assistant for Work

**Scenario:** You want an AI to help manage your work

**Without MCP:** Need to build custom integrations
```javascript
// Custom code for each service
const slackAPI = require('custom-slack-connector');
const driveAPI = require('custom-drive-connector');
const emailAPI = require('custom-email-connector');
const calendarAPI = require('custom-calendar-connector');

// Each with different APIs, auth methods, error handling...
```

**With MCP:** Use standard MCP servers
```javascript
// All use same MCP protocol
const mcpClient = new MCPClient();

mcpClient.connect('slack-mcp-server');
mcpClient.connect('drive-mcp-server');
mcpClient.connect('email-mcp-server');
mcpClient.connect('calendar-mcp-server');

// Consistent interface for all!
```

**User interactions:**
- "Find my Q3 presentation" → Google Drive MCP Server
- "Message the team" → Slack MCP Server
- "Schedule meeting" → Calendar MCP Server
- "Send report to boss" → Email MCP Server

### Example 2: Customer Support Bot

**What it needs:**
- Access to knowledge base (Resources)
- Ability to create support tickets (Tools)
- Standard greeting templates (Prompts)

**MCP Implementation:**

```
User: "My order hasn't arrived"

Host (AI Bot) decides:
1. Use 'customer_greeting' Prompt (standardized response)
2. Query 'order_database' Resource (get order details)
3. Call 'create_ticket' Tool (create support ticket)
4. Use 'shipping_partner_api' Resource (check shipping status)

Response: "Hi! I see your order #12345. I've created a 
support ticket and checked - your package is currently 
in transit and will arrive tomorrow."
```

### Example 3: Development Assistant

**What it needs:**
- Read codebase (Resources)
- Run tests (Tools)
- Apply code review template (Prompts)
- Commit changes (Tools)

**MCP Implementation:**

```
User: "Review and test my changes"

GitHub MCP Server provides:
- Resource: file://src/main.py (current code)
- Tool: run_tests() (execute test suite)
- Prompt: code_review_checklist (review template)
- Tool: git_commit() (save changes)

Flow:
1. Read code via Resource
2. Apply review Prompt
3. Run tests via Tool
4. If passed, commit via Tool
```

### Example 4: Data Analysis Pipeline

**What it needs:**
- Access to databases (Resources)
- Data transformation (Tools)
- Generate visualizations (Tools)
- Export results (Tools)

**MCP Implementation:**

```
User: "Analyze last month's sales"

Database MCP Server:
- Resource: db://sales/2024-11 (get data)

Analysis MCP Server:
- Tool: calculate_metrics() (compute stats)
- Tool: create_chart() (visualize)

Export MCP Server:
- Tool: save_to_sheets() (export to Google Sheets)
- Tool: send_email() (email report)
```

---

## 🔧 Technical Deep Dive {#technical-deep-dive}

### MCP Protocol Specifications

#### Communication Transport
MCP supports multiple transport mechanisms:

1. **Standard Input/Output (stdio)**
   - Local processes
   - Simple and lightweight
   - Good for development

2. **HTTP with Server-Sent Events (SSE)**
   - Remote servers
   - Scalable
   - Production-ready

```javascript
// stdio transport example
const server = new MCPServer({
  transport: 'stdio'
});

// HTTP/SSE transport example
const server = new MCPServer({
  transport: 'http',
  port: 3000
});
```

#### Message Format
MCP uses JSON-RPC 2.0 for message structure:

```json
// Request example
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "send_message",
    "arguments": {
      "channel": "general",
      "text": "Hello team!"
    }
  }
}

// Response example
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "success": true,
    "message_id": "msg_12345"
  }
}
```

### Core Methods

#### 1. Server Capabilities Discovery
```json
// Client asks: What can you do?
{
  "method": "initialize",
  "params": {
    "protocolVersion": "1.0",
    "clientInfo": {
      "name": "Claude Desktop",
      "version": "1.0"
    }
  }
}

// Server responds:
{
  "result": {
    "capabilities": {
      "tools": true,
      "resources": true,
      "prompts": true
    },
    "serverInfo": {
      "name": "Slack MCP Server",
      "version": "2.1"
    }
  }
}
```

#### 2. List Available Tools
```json
{
  "method": "tools/list"
}

// Response:
{
  "result": {
    "tools": [
      {
        "name": "send_message",
        "description": "Send a Slack message",
        "inputSchema": {
          "type": "object",
          "properties": {
            "channel": { "type": "string" },
            "text": { "type": "string" }
          },
          "required": ["channel", "text"]
        }
      }
    ]
  }
}
```

#### 3. Call a Tool
```json
{
  "method": "tools/call",
  "params": {
    "name": "send_message",
    "arguments": {
      "channel": "general",
      "text": "Deploy complete!"
    }
  }
}
```

#### 4. Access Resources
```json
{
  "method": "resources/read",
  "params": {
    "uri": "file:///documents/report.pdf"
  }
}

// Response:
{
  "result": {
    "contents": [
      {
        "uri": "file:///documents/report.pdf",
        "mimeType": "application/pdf",
        "text": "[PDF content...]"
      }
    ]
  }
}
```

#### 5. Get Prompts
```json
{
  "method": "prompts/get",
  "params": {
    "name": "code_review"
  }
}

// Response:
{
  "result": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "Review this code for security..."
        }
      }
    ]
  }
}
```

### Security & Authentication

#### API Keys
```json
{
  "method": "initialize",
  "params": {
    "clientInfo": {...},
    "auth": {
      "type": "bearer",
      "token": "sk_live_xxxxx"
    }
  }
}
```

#### OAuth Flow
```javascript
// Server provides OAuth URL
{
  "authUrl": "https://slack.com/oauth/authorize?client_id=..."
}

// After user authorizes, server receives token
{
  "accessToken": "xoxb-xxxxx",
  "scope": "chat:write,channels:read"
}
```

### Error Handling

```json
// Error response format
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32600,
    "message": "Invalid request",
    "data": {
      "details": "Missing required parameter: channel"
    }
  }
}
```

**Common error codes:**
- `-32700`: Parse error
- `-32600`: Invalid request
- `-32601`: Method not found
- `-32602`: Invalid params
- `-32603`: Internal error

---

## 🏗️ Building with MCP {#building-with-mcp}

### Setting Up Development Environment

#### 1. Install MCP SDK

**Python:**
```bash
pip install mcp
```

**TypeScript:**
```bash
npm install @modelcontextprotocol/sdk
```

#### 2. Create Your First MCP Server

**Python Example:**
```python
from mcp.server import Server, Tool
from mcp.types import TextContent

# Create server instance
server = Server("my-first-server")

# Define a tool
@server.tool()
async def greet(name: str) -> str:
    """Greet someone by name"""
    return f"Hello, {name}!"

# Define a resource
@server.resource("config://settings")
async def get_settings() -> str:
    """Get application settings"""
    return '{"theme": "dark", "language": "en"}'

# Run server
if __name__ == "__main__":
    server.run()
```

**TypeScript Example:**
```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create server
const server = new Server({
  name: "my-first-server",
  version: "1.0.0"
}, {
  capabilities: {
    tools: {},
    resources: {}
  }
});

// Register tool
server.setRequestHandler("tools/list", async () => ({
  tools: [{
    name: "greet",
    description: "Greet someone by name",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string" }
      },
      required: ["name"]
    }
  }]
}));

server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "greet") {
    const name = request.params.arguments.name;
    return {
      content: [{
        type: "text",
        text: `Hello, ${name}!`
      }]
    };
  }
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Building a Real-World Server: Weather API

**Complete implementation:**

```python
from mcp.server import Server
from mcp.types import Tool, Resource, TextContent
import httpx
import os

server = Server("weather-mcp-server")

# Tool: Get current weather
@server.tool()
async def get_weather(city: str) -> dict:
    """
    Get current weather for a city
    
    Args:
        city: Name of the city
    """
    api_key = os.getenv("WEATHER_API_KEY")
    url = f"https://api.openweathermap.org/data/2.5/weather"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params={
            "q": city,
            "appid": api_key,
            "units": "metric"
        })
        data = response.json()
        
        return {
            "city": city,
            "temperature": data["main"]["temp"],
            "description": data["weather"][0]["description"],
            "humidity": data["main"]["humidity"]
        }

# Tool: Get forecast
@server.tool()
async def get_forecast(city: str, days: int = 5) -> dict:
    """
    Get weather forecast for a city
    
    Args:
        city: Name of the city
        days: Number of days (1-5)
    """
    api_key = os.getenv("WEATHER_API_KEY")
    url = f"https://api.openweathermap.org/data/2.5/forecast"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url, params={
            "q": city,
            "appid": api_key,
            "units": "metric",
            "cnt": days * 8  # 8 forecasts per day
        })
        data = response.json()
        
        forecasts = []
        for item in data["list"]:
            forecasts.append({
                "date": item["dt_txt"],
                "temp": item["main"]["temp"],
                "description": item["weather"][0]["description"]
            })
        
        return {
            "city": city,
            "forecasts": forecasts
        }

# Resource: Weather stations
@server.resource("weather://stations")
async def list_stations() -> str:
    """List available weather stations"""
    stations = [
        {"id": 1, "name": "Downtown", "city": "New York"},
        {"id": 2, "name": "Airport", "city": "Los Angeles"},
        {"id": 3, "name": "Harbor", "city": "San Francisco"}
    ]
    return str(stations)

# Prompt: Weather report template
@server.prompt("weather_report")
async def weather_report_prompt(city: str) -> str:
    """Generate weather report for a city"""
    return f"""
    Create a detailed weather report for {city}.
    Include:
    - Current conditions
    - Temperature (actual and feels like)
    - Humidity and wind
    - 3-day forecast
    - Recommendations for outdoor activities
    """

if __name__ == "__main__":
    server.run()
```

### Configuring Claude Desktop

Add server to Claude's config:

**macOS/Linux:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "weather": {
      "command": "python",
      "args": ["/path/to/weather_server.py"],
      "env": {
        "WEATHER_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Testing Your Server

```python
# test_weather_server.py
import asyncio
from mcp.client import Client

async def test():
    client = Client("test-client")
    
    # Connect to server
    await client.connect("stdio", ["python", "weather_server.py"])
    
    # List available tools
    tools = await client.list_tools()
    print("Available tools:", tools)
    
    # Call a tool
    result = await client.call_tool("get_weather", {"city": "London"})
    print("Weather result:", result)
    
    # Access a resource
    stations = await client.read_resource("weather://stations")
    print("Stations:", stations)

asyncio.run(test())
```

### Best Practices

#### 1. Error Handling
```python
@server.tool()
async def safe_operation(param: str) -> dict:
    try:
        result = await risky_operation(param)
        return {"success": True, "data": result}
    except ValueError as e:
        return {"success": False, "error": f"Invalid input: {e}"}
    except Exception as e:
        return {"success": False, "error": f"Unexpected error: {e}"}
```

#### 2. Input Validation
```python
@server.tool()
async def create_user(name: str, age: int, email: str) -> dict:
    # Validate inputs
    if not name or len(name) < 2:
        raise ValueError("Name must be at least 2 characters")
    
    if age < 0 or age > 150:
        raise ValueError("Invalid age")
    
    if "@" not in email:
        raise ValueError("Invalid email format")
    
    # Process...
    return {"success": True, "user_id": 123}
```

#### 3. Logging & Monitoring
```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@server.tool()
async def important_operation(data: str) -> dict:
    logger.info(f"Starting operation with data: {data}")
    
    try:
        result = await process(data)
        logger.info(f"Operation completed successfully")
        return result
    except Exception as e:
        logger.error(f"Operation failed: {e}")
        raise
```

#### 4. Rate Limiting
```python
from asyncio import Semaphore

# Limit concurrent operations
semaphore = Semaphore(5)

@server.tool()
async def rate_limited_operation(param: str) -> dict:
    async with semaphore:
        return await expensive_operation(param)
```
