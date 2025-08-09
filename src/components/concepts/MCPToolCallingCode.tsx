import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MCPToolCallingCode() {
  const fullServerImplementation = `# Complete MCP Server Implementation
from mcp import MCPServer, Tool, types
import asyncio
import logging

class ProductPriceServer(MCPServer):
    def __init__(self):
        super().__init__("product-price-server")
        self.logger = logging.getLogger(__name__)
        
        # Mock database of products
        self.product_database = {
            "iPhone 15 Pro Max": {"price": 1199, "currency": "USD", "available": True},
            "Samsung Galaxy S24": {"price": 899, "currency": "USD", "available": True},
            "MacBook Pro": {"price": 2399, "currency": "USD", "available": False},
            "Dell XPS 13": {"price": 999, "currency": "USD", "available": True}
        }
        
    @Tool("get_product_price")
    def get_product_price(self, product_name: str) -> dict:
        """
        Get the current price and availability of a product.
        
        Args:
            product_name (str): The name of the product to look up
            
        Returns:
            dict: Product information including price, currency, and availability
        """
        self.logger.info(f"Looking up price for: {product_name}")
        
        product_info = self.product_database.get(product_name)
        
        if product_info:
            return {
                "success": True,
                "product": product_name,
                "price": product_info["price"],
                "currency": product_info["currency"],
                "available": product_info["available"],
                "message": f"Found pricing for {product_name}"
            }
        else:
            return {
                "success": False,
                "product": product_name,
                "price": None,
                "currency": None,
                "available": False,
                "message": f"Product '{product_name}' not found in database"
            }
    
    @Tool("list_products")
    def list_products(self) -> dict:
        """List all available products in the database."""
        products = list(self.product_database.keys())
        return {
            "success": True,
            "products": products,
            "count": len(products),
            "message": f"Found {len(products)} products"
        }
        
    async def handle_tool_call(self, request):
        """Handle incoming tool calls from MCP clients."""
        try:
            if request.name == "get_product_price":
                return self.get_product_price(request.arguments.get("product_name", ""))
            elif request.name == "list_products":
                return self.list_products()
            else:
                return {
                    "success": False,
                    "message": f"Unknown tool: {request.name}"
                }
        except Exception as e:
            self.logger.error(f"Error handling tool call: {e}")
            return {
                "success": False,
                "message": f"Server error: {str(e)}"
            }

# Start the server
if __name__ == "__main__":
    server = ProductPriceServer()
    asyncio.run(server.start())`;

  const fullClientImplementation = `# Complete MCP Client Implementation
from mcp import MCPClient
import openai
import asyncio
import logging
import json

class IntelligentPriceAssistant:
    def __init__(self, mcp_server_uri: str, openai_api_key: str):
        self.mcp_client = MCPClient(mcp_server_uri)
        self.openai_client = openai.OpenAI(api_key=openai_api_key)
        self.logger = logging.getLogger(__name__)
        
    async def initialize(self):
        """Initialize connection to MCP server and get available tools."""
        try:
            await self.mcp_client.connect()
            self.available_tools = await self.mcp_client.list_tools()
            self.logger.info(f"Connected to MCP server. Available tools: {[tool.name for tool in self.available_tools]}")
        except Exception as e:
            self.logger.error(f"Failed to initialize MCP client: {e}")
            raise
    
    def _create_tool_definitions(self):
        """Convert MCP tools to OpenAI function calling format."""
        tool_definitions = []
        for tool in self.available_tools:
            tool_def = {
                "type": "function",
                "function": {
                    "name": tool.name,
                    "description": tool.description,
                    "parameters": tool.parameters
                }
            }
            tool_definitions.append(tool_def)
        return tool_definitions
        
    async def process_user_query(self, user_query: str, conversation_history: list = None):
        """
        Process a user query with intelligent tool calling.
        
        Args:
            user_query (str): The user's natural language query
            conversation_history (list): Previous conversation context
            
        Returns:
            str: The assistant's response
        """
        if conversation_history is None:
            conversation_history = []
            
        # Prepare messages for LLM
        messages = [
            {
                "role": "system", 
                "content": "You are a helpful shopping assistant that can look up product prices and information. Be precise and helpful."
            }
        ]
        messages.extend(conversation_history)
        messages.append({"role": "user", "content": user_query})
        
        try:
            # First LLM call with available tools
            response = await self.openai_client.chat.completions.create(
                model="gpt-4",
                messages=messages,
                tools=self._create_tool_definitions(),
                tool_choice="auto"  # Let LLM decide when to use tools
            )
            
            response_message = response.choices[0].message
            messages.append(response_message)
            
            # Check if LLM wants to call any tools
            if response_message.tool_calls:
                self.logger.info(f"LLM requested {len(response_message.tool_calls)} tool calls")
                
                # Execute each tool call
                for tool_call in response_message.tool_calls:
                    tool_name = tool_call.function.name
                    tool_args = json.loads(tool_call.function.arguments)
                    
                    self.logger.info(f"Executing tool: {tool_name} with args: {tool_args}")
                    
                    # Call the MCP server
                    tool_result = await self.mcp_client.call_tool(tool_name, tool_args)
                    
                    # Add tool result to conversation
                    messages.append({
                        "role": "tool",
                        "content": json.dumps(tool_result),
                        "tool_call_id": tool_call.id
                    })
                
                # Final LLM call with tool results
                final_response = await self.openai_client.chat.completions.create(
                    model="gpt-4",
                    messages=messages
                )
                
                return final_response.choices[0].message.content
            else:
                # No tools needed, return direct response
                return response_message.content
                
        except Exception as e:
            self.logger.error(f"Error processing query: {e}")
            return f"I'm sorry, I encountered an error: {str(e)}"
    
    async def close(self):
        """Clean up connections."""
        await self.mcp_client.disconnect()

# Usage Example
async def main():
    assistant = IntelligentPriceAssistant(
        mcp_server_uri="mcp://localhost:8000",
        openai_api_key="your-openai-key"
    )
    
    await assistant.initialize()
    
    # Example conversation
    queries = [
        "How much is an iPhone 15 Pro Max?",
        "What about a Samsung Galaxy S24?",
        "Can you list all available products?",
        "Which product is most expensive?"
    ]
    
    conversation = []
    for query in queries:
        print(f"User: {query}")
        response = await assistant.process_user_query(query, conversation)
        print(f"Assistant: {response}\\n")
        
        # Add to conversation history
        conversation.extend([
            {"role": "user", "content": query},
            {"role": "assistant", "content": response}
        ])
    
    await assistant.close()

if __name__ == "__main__":
    asyncio.run(main())`;

  return (
    <div className="space-y-6">
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 border-blue-200 dark:border-blue-700">
    <CardHeader>
        <CardTitle className="text-blue-800 dark:text-blue-200">Complete Implementation Examples</CardTitle>
        <CardDescription className="text-blue-700 dark:text-blue-300">
        Production-ready MCP server and client code with error handling, logging, and advanced features
        </CardDescription>
    </CardHeader>
    </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              MCP Server
            </Badge>
            Production Server Implementation
          </CardTitle>
          <CardDescription>
            Complete server with multiple tools, error handling, logging, and database simulation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-xs">
            <code className="text-gray-800 dark:text-gray-200">{fullServerImplementation}</code>
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              MCP Client
            </Badge>
            Intelligent Client with Conversation History
          </CardTitle>
          <CardDescription>
            Advanced client that maintains conversation context and handles multiple tool calls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-xs">
            <code className="text-gray-800 dark:text-gray-200">{fullClientImplementation}</code>
          </pre>
        </CardContent>
      </Card>

      <Card className="bg-yellow-100 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <CardTitle className="text-yellow-800 dark:text-yellow-200">Advanced Features Showcased</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Server Features</h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Multiple tool definitions</li>
                <li>• Comprehensive error handling</li>
                <li>• Structured response format</li>
                <li>• Logging and monitoring</li>
                <li>• Data validation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Client Features</h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Conversation history management</li>
                <li>• Multiple tool call handling</li>
                <li>• Intelligent tool selection</li>
                <li>• Connection management</li>
                <li>• Graceful error recovery</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
