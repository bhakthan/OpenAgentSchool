import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, ArrowCounterClockwise, PlayCircle } from '@phosphor-icons/react';
import AudioNarrationControls from '../audio/AudioNarrationControls';

export default function MCPToolCallingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);

  const codeSteps = [
    {
      step: 1,
      title: "Tool Definition",
      serverCode: `@Tool("get_product_price")
def get_product_price(self, product_name: str) -> dict:
    """Get the current price of a product."""
    prices = {
        "iPhone 15 Pro Max": 1199,
        "Samsung Galaxy S24": 899,
        "MacBook Pro": 2399
    }
    return {"price": prices.get(product_name, "Price not found")}`,
      clientCode: `# Tool is registered and available
tools = await self.mcp_client.list_tools()
print(f"Available tools: {[tool.name for tool in tools]}")`,
      description: "MCP Server defines the tool schema and implementation"
    },
    {
      step: 2,
      title: "Query + Tools → LLM",
      serverCode: `# Server is ready to handle calls
# Tools are exposed via MCP protocol`,
      clientCode: `response = await self.openai_client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant that can look up product prices."},
        {"role": "user", "content": "How much is an iPhone 15 Pro Max?"}
    ],
    tools=[{
        "type": "function",
        "function": {
            "name": "get_product_price",
            "description": "Get the current price of a product",
            "parameters": {
                "type": "object",
                "properties": {
                    "product_name": {"type": "string"}
                }
            }
        }
    }]
)`,
      description: "Client sends user query and available tools to LLM"
    },
    {
      step: 3,
      title: "LLM Response",
      serverCode: `# Server waits for tool call`,
      clientCode: `# LLM decides to call the tool
tool_call = response.choices[0].message.tool_calls[0]
print(f"LLM wants to call: {tool_call.function.name}")
print(f"With arguments: {tool_call.function.arguments}")`,
      description: "LLM analyzes query and decides to call get_product_price tool"
    },
    {
      step: 4,
      title: "MCP Tool Call",
      serverCode: `async def handle_tool_call(self, request):
    if request.name == "get_product_price":
        return self.get_product_price(request.arguments["product_name"])`,
      clientCode: `# Execute tool call via MCP
result = await self.mcp_client.call_tool(
    tool_call.function.name,
    tool_call.function.arguments
)`,
      description: "Client forwards tool call to MCP Server for execution"
    },
    {
      step: 5,
      title: "Server Response",
      serverCode: `# Tool execution
product_name = "iPhone 15 Pro Max"
price = prices.get(product_name, "Price not found")
return {"price": 1199}`,
      clientCode: `# Receive result from MCP server
print(f"Tool result: {result}")
# result = {"price": 1199}`,
      description: "MCP Server executes tool and returns structured result"
    },
    {
      step: 6,
      title: "Context → LLM",
      serverCode: `# Server has completed the request
# Result is sent back via MCP protocol`,
      clientCode: `# Send complete context back to LLM
final_response = await self.openai_client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "How much is an iPhone 15 Pro Max?"},
        response.choices[0].message,  # Original LLM response with tool call
        {"role": "tool", "content": str(result), "tool_call_id": tool_call.id}
    ]
)`,
      description: "Client provides full context (query + tool call + result) to LLM"
    },
    {
      step: 7,
      title: "Final Response",
      serverCode: `# MCP Server ready for next request`,
      clientCode: `# LLM generates final user-friendly response
final_answer = final_response.choices[0].message.content
print(final_answer)
# "The iPhone 15 Pro Max costs $1199."

return final_answer`,
      description: "LLM creates natural language response using tool result"
    }
  ];

  // Manual control functions
  const startAutoPlay = () => {
    setIsManualMode(false);
    setIsAutoPlaying(true);
    setCurrentStep(0);
    setShowAllSteps(false);
  };

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    setIsManualMode(true);
  };

  const goToStep = (step: number) => {
    setIsManualMode(true);
    setIsAutoPlaying(false);
    setCurrentStep(step);
    setShowAllSteps(false);
    updateAnimationDisplay(step);
  };

  const nextStep = () => {
    const newStep = currentStep < 7 ? currentStep + 1 : 7;
    if (newStep === 7) {
      setShowAllSteps(true);
    }
    goToStep(newStep);
  };

  const prevStep = () => {
    const newStep = currentStep > 0 ? currentStep - 1 : 0;
    setShowAllSteps(false);
    goToStep(newStep);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setShowAllSteps(false);
    setIsAutoPlaying(false);
    setIsManualMode(true);
    updateAnimationDisplay(0);
  };

  const updateAnimationDisplay = (step: number) => {
    const paths = ['path1', 'path2', 'path3', 'path4', 'path5', 'path6', 'path7'];
    const texts = [
      'text1', 
      'text2', 'text2b',
      'text3',
      'text4',
      'text5',
      'text6', 'text6b',
      'text7'
    ];

    // Hide all first
    paths.forEach(pid => {
      const p = document.getElementById(pid);
      if (p) p.style.opacity = '0';
    });
    texts.forEach(tid => {
      const t = document.getElementById(tid);
      if (t) t.style.opacity = '0';
    });

    // Show steps up to current step
    for (let i = 1; i <= step; i++) {
      const pathId = `path${i}`;
      const path = document.getElementById(pathId);
      if (path) {
        path.style.transition = 'opacity 0.3s ease-in-out';
        path.style.opacity = '1';
      }

      // Handle text elements for each step
      if (i === 1) {
        const text = document.getElementById('text1');
        if (text) {
          text.style.transition = 'opacity 0.3s ease-in-out';
          text.style.opacity = '1';
        }
      } else if (i === 2) {
        ['text2', 'text2b'].forEach(textId => {
          const text = document.getElementById(textId);
          if (text) {
            text.style.transition = 'opacity 0.3s ease-in-out';
            text.style.opacity = '1';
          }
        });
      } else if (i === 6) {
        ['text6', 'text6b'].forEach(textId => {
          const text = document.getElementById(textId);
          if (text) {
            text.style.transition = 'opacity 0.3s ease-in-out';
            text.style.opacity = '1';
          }
        });
      } else {
        const textId = `text${i}`;
        const text = document.getElementById(textId);
        if (text) {
          text.style.transition = 'opacity 0.3s ease-in-out';
          text.style.opacity = '1';
        }
      }
    }
  };

  useEffect(() => {
    let animationTimeouts: NodeJS.Timeout[] = [];
    let mainInterval: NodeJS.Timeout | null = null;
    let isAnimating = false;

    const clearAllTimeouts = () => {
      animationTimeouts.forEach(timeout => clearTimeout(timeout));
      animationTimeouts = [];
    };

    const animateFlow = () => {
      // Skip auto animation if in manual mode
      if (isManualMode || !isAutoPlaying) return;
      
      // Prevent overlapping animations
      if (isAnimating) return;
      isAnimating = true;

      // Clear any existing timeouts
      clearAllTimeouts();

      const paths = ['path1', 'path2', 'path3', 'path4', 'path5', 'path6', 'path7'];
      const texts = [
        'text1', 
        'text2', 'text2b',
        'text3',
        'text4',
        'text5',
        'text6', 'text6b',
        'text7'
      ];
      
      const stepGroups: [string, string[]][] = [
        ['path1', ['text1']],
        ['path2', ['text2', 'text2b']],
        ['path3', ['text3']],
        ['path4', ['text4']],
        ['path5', ['text5']],
        ['path6', ['text6', 'text6b']],
        ['path7', ['text7']]
      ];
      
      // Reset state
      setCurrentStep(0);
      setShowAllSteps(false);
      
      // Hide all at the start
      paths.forEach(pid => {
        const p = document.getElementById(pid);
        if (p) p.style.opacity = '0';
      });
      texts.forEach(tid => {
        const t = document.getElementById(tid);
        if (t) t.style.opacity = '0';
      });
      
      let delay = 0;
      
      // Animate each step
      stepGroups.forEach(([pathId, textIds], idx) => {
        const timeout = setTimeout(() => {
          // Update current step for code highlighting
          setCurrentStep(idx + 1);
          
          const path = document.getElementById(pathId);
          if (path) {
            path.style.transition = 'opacity 0.5s ease-in-out';
            path.style.opacity = '1';
          }
          textIds.forEach(textId => {
            const text = document.getElementById(textId);
            if (text) {
              text.style.transition = 'opacity 0.5s ease-in-out';
              text.style.opacity = '1';
            }
          });
          
          // If last step, after a pause, show all
          if (idx === stepGroups.length - 1) {
            const showAllTimeout = setTimeout(() => {
              setShowAllSteps(true);
              // Show all paths and texts
              paths.forEach(pid => {
                const p = document.getElementById(pid);
                if (p) {
                  p.style.transition = 'opacity 0.5s ease-in-out';
                  p.style.opacity = '1';
                }
              });
              texts.forEach(tid => {
                const t = document.getElementById(tid);
                if (t) {
                  t.style.transition = 'opacity 0.5s ease-in-out';
                  t.style.opacity = '1';
                }
              });
              
              // After a few seconds, hide all and mark animation complete
              const hideAllTimeout = setTimeout(() => {
                paths.forEach(pid => {
                  const p = document.getElementById(pid);
                  if (p) p.style.opacity = '0';
                });
                texts.forEach(tid => {
                  const t = document.getElementById(tid);
                  if (t) t.style.opacity = '0';
                });
                setCurrentStep(0);
                setShowAllSteps(false);
                isAnimating = false; // Mark animation as complete
              }, 3500);
              animationTimeouts.push(hideAllTimeout);
            }, 2000);
            animationTimeouts.push(showAllTimeout);
          }
        }, delay);
        animationTimeouts.push(timeout);
        delay += 2000;
      });
    };

    // Start animation only when auto-play is enabled
    if (isAutoPlaying && !isManualMode) {
      const startTimeout = setTimeout(() => {
        animateFlow();
        mainInterval = setInterval(() => {
          animateFlow();
        }, 18000);
      }, 100);

      return () => {
        clearTimeout(startTimeout);
        if (mainInterval) clearInterval(mainInterval);
        clearAllTimeouts();
        isAnimating = false;
      };
    }

    return () => {
      if (mainInterval) clearInterval(mainInterval);
      clearAllTimeouts();
      isAnimating = false;
    };
  }, [isAutoPlaying, isManualMode]);

  const getCurrentStepData = () => {
    if (showAllSteps) {
      return {
        title: "Complete Flow",
        description: "Full MCP tool calling process from user query to final response",
        serverCode: "// All server components ready for next request",
        clientCode: "// Complete integration: User → LLM → Tools → Response"
      };
    }
    return codeSteps.find(step => step.step === currentStep) || codeSteps[0];
  };

  const stepData = getCurrentStepData();

  return (
    <Card className="w-full">
      <CardHeader className="relative">
        <CardTitle className="text-center text-xl text-primary">
          MCP Tool Calling: Animation + Code
        </CardTitle>
        <CardDescription className="text-center">
          Watch the flow between Host Application (containing MCP Client) and MCP Server while seeing the actual implementation code
        </CardDescription>
        
        {/* Audio Narration Controls */}
        <AudioNarrationControls 
          componentName="MCPToolCallingAnimation"
          position="embedded"
        />
      </CardHeader>
      <CardContent>
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mb-4">
        <p className="text-base text-blue-800 dark:text-blue-200 text-center">
            <strong>Scenario:</strong> User asks, "How much is an iPhone 15 Pro Max?"
        </p>
        </div>

        {/* Interactive Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Button
              onClick={startAutoPlay}
              disabled={isAutoPlaying}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-700 disabled:bg-gray-400 disabled:text-gray-200"
              variant={isAutoPlaying ? "secondary" : "default"}
            >
              <PlayCircle className="w-4 h-4" />
              Auto Play
            </Button>
            
            <Button
              onClick={stopAutoPlay}
              disabled={!isAutoPlaying}
              className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:text-gray-400 disabled:border-gray-200"
              variant="outline"
            >
              <Pause className="w-4 h-4" />
              Stop
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0 || isAutoPlaying}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:text-gray-400 disabled:border-gray-200"
              variant="outline"
              size="sm"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-1 px-3">
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <Button
                  key={step}
                  onClick={() => goToStep(step)}
                  disabled={isAutoPlaying}
                  variant={currentStep === step ? "default" : "outline"}
                  size="sm"
                  className={`w-8 h-8 p-0 text-xs ${
                    currentStep === step 
                      ? "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700" 
                      : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:text-gray-400 disabled:border-gray-200"
                  }`}
                >
                  {step}
                </Button>
              ))}
            </div>
            
            <Button
              onClick={nextStep}
              disabled={currentStep === 7 || isAutoPlaying}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:text-gray-400 disabled:border-gray-200"
              variant="outline"
              size="sm"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          <Button
            onClick={resetAnimation}
            disabled={isAutoPlaying}
            className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:text-gray-400 disabled:border-gray-200"
            variant="outline"
          >
            <ArrowCounterClockwise className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Status Indicator */}
        <div className="text-center mb-4">
          {isAutoPlaying ? (
            <Badge className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]">
              Auto Playing - Step {currentStep || "Starting..."}
            </Badge>
          ) : (
            <Badge className="ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)] dark:text-[var(--badge-gray-text)]">
              Manual Mode - Step {currentStep || "Ready"}
            </Badge>
          )}
        </div>
        
        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Side: Animation */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <Badge className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]">
                Visual Flow
              </Badge>
            </div>
            
            <div className="w-full flex justify-center">
              <svg 
                width="100%" 
                height="400" 
                viewBox="0 0 800 400" 
                className="border border-border rounded-lg bg-background shadow-sm"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" className="fill-foreground" />
                  </marker>
                </defs>

                {/* Vertical grid lines */}
                <line x1="100" y1="20" x2="100" y2="370" className="stroke-muted-foreground" strokeDasharray="5,5" opacity="0.5" />
                <line x1="300" y1="20" x2="300" y2="370" className="stroke-muted-foreground" strokeDasharray="5,5" opacity="0.5" />
                <line x1="500" y1="20" x2="500" y2="370" className="stroke-muted-foreground" strokeDasharray="5,5" opacity="0.5" />
                <line x1="700" y1="20" x2="700" y2="370" className="stroke-muted-foreground" strokeDasharray="5,5" opacity="0.5" />

                {/* Column headers */}
                <text x="100" y="35" textAnchor="middle" className="fill-foreground text-base font-medium">MCP SERVER</text>
                <text x="100" y="50" textAnchor="middle" className="fill-muted-foreground text-sm">Tool Provider</text>
                
                <text x="300" y="35" textAnchor="middle" className="fill-foreground text-base font-medium">MCP CLIENT</text>
                <text x="300" y="50" textAnchor="middle" className="fill-muted-foreground text-sm">Protocol Handler</text>

                <text x="500" y="35" textAnchor="middle" className="fill-foreground text-base font-medium">HOST APPLICATION</text>
                <text x="500" y="50" textAnchor="middle" className="fill-muted-foreground text-sm">User Interface</text>

                <text x="700" y="35" textAnchor="middle" className="fill-foreground text-base font-medium">LLM</text>
                <text x="700" y="50" textAnchor="middle" className="fill-muted-foreground text-sm">AI Model</text>

                {/* Flow paths */}
                <path id="path1" d="M100,80 L500,80" stroke="#FF8C00" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" opacity="0" />
                <text id="text1" x="300" y="70" textAnchor="middle" className="fill-foreground text-sm font-medium" opacity="0">1. Tool Definition</text>

                <path id="path2" d="M500,120 L700,120" stroke="#228B22" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" opacity="0" />
                <text id="text2" x="600" y="110" textAnchor="middle" className="fill-foreground text-sm font-medium" opacity="0">2. Query + Tools → LLM</text>
                <text id="text2b" x="600" y="130" textAnchor="middle" className="fill-foreground text-sm font-medium" opacity="0">"iPhone 15 Pro Max price?"</text>

                <path id="path3" d="M700,160 L500,160" stroke="#1E90FF" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" opacity="0" />
                <text id="text3" x="600" y="150" textAnchor="middle" className="fill-foreground text-sm font-medium" opacity="0">3. LLM → Tool Call</text>

                <path id="path4" d="M500,190 L300,190 L100,190" stroke="#FF8C00" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" opacity="0" />
                <text id="text4" x="300" y="180" textAnchor="middle" className="fill-foreground text-sm font-medium" opacity="0">4. Execute Tool</text>

                <path id="path5" d="M100,230 L300,230 L500,230" stroke="#FF8C00" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" opacity="0" />
                <text id="text5" x="300" y="220" textAnchor="middle" className="fill-foreground text-sm font-medium" opacity="0">5. Return Result</text>

                <path id="path6" d="M500,270 L700,270" stroke="#228B22" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" opacity="0" />
                <text id="text6" x="600" y="260" textAnchor="middle" className="fill-foreground text-sm font-medium" opacity="0">6. Context → LLM</text>
                <text id="text6b" x="600" y="280" textAnchor="middle" className="fill-foreground text-sm font-medium" opacity="0">(Query + Result)</text>

                <path id="path7" d="M700,320 L500,320" stroke="#1E90FF" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" opacity="0" />
                <text id="text7" x="600" y="310" textAnchor="middle" className="fill-foreground text-sm font-medium" opacity="0">7. Final Response</text>
              </svg>
            </div>
          </div>

          {/* Right Side: Synchronized Code */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <Badge className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)] dark:text-[var(--badge-blue-text)]">
                Live Code
              </Badge>
            </div>

            {/* Current Step Indicator */}
            <div className="text-center p-3 bg-gray-100 dark:bg-gray-900 rounded-lg border-l-4 border-blue-500 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Badge className="ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)] dark:text-[var(--badge-gray-text)]">
                  Step {currentStep || (showAllSteps ? "Complete" : "Ready")}
                </Badge>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{stepData.title}</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{stepData.description}</p>
            </div>

            {/* Server Code */}
            <Card className={`transition-all duration-500 ${currentStep >= 1 && currentStep <= 2 || currentStep === 4 || currentStep === 5 ? 'ring-4 ring-orange-400 bg-orange-100 dark:bg-orange-950/20 dark:ring-orange-500' : 'bg-white dark:bg-gray-800'} border border-gray-200 dark:border-gray-700`}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Badge className="ring-1 bg-[var(--badge-orange-bg)] ring-[var(--badge-orange-ring)] text-[var(--badge-orange-text)] dark:text-[var(--badge-orange-text)]">
                    MCP Server
                  </Badge>
                  <span className="text-gray-900 dark:text-gray-100">Tool Implementation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-xs overflow-x-auto border border-gray-200 dark:border-gray-700">
                  <code className="text-gray-900 dark:text-gray-100">{stepData.serverCode}</code>
                </pre>
              </CardContent>
            </Card>

            {/* Client Code */}
            <Card className={`transition-all duration-500 ${currentStep === 2 || currentStep === 3 || currentStep === 4 || currentStep === 6 || currentStep === 7 ? 'ring-4 ring-green-400 bg-green-100 dark:bg-green-950/20 dark:ring-green-500' : 'bg-white dark:bg-gray-800'} border border-gray-200 dark:border-gray-700`}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Badge className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]">
                    MCP Client
                  </Badge>
                  <span className="text-gray-600 dark:text-gray-400">(Code Layer)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-xs overflow-x-auto border border-gray-200 dark:border-gray-700">
                  <code className="text-gray-900 dark:text-gray-100">{stepData.clientCode}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <div className="space-y-3">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Interactive Learning Experience:</strong> This synchronized view shows exactly how each animation step corresponds to real code implementation. You have full control over the learning pace!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-blue-700 dark:text-blue-300">
              <div>
                <strong>🎬 Auto Play:</strong> Watch the complete flow automatically with synchronized code highlighting
              </div>
              <div>
                <strong>👆 Step-by-Step:</strong> Click step numbers (1-7) or use prev/next to learn at your own pace
              </div>
              <div>
                <strong>🔄 Reset:</strong> Start over anytime to review concepts or compare different steps
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
