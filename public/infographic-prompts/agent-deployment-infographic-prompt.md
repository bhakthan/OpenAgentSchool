# Agent Deployment - Infographic Generation Prompt

## Image Generation Settings
- **Model**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Aspect Ratio**: Portrait (9:16)
- **Format**: Educational Infographic

---

## Prompt

```
Create an 8K educational infographic titled "Agent Deployment" using Flat UI Style 2.0.

HEADER SECTION (Blue #3B82F6):
- Large title: "Deploying AI Agents to Production"
- Subtitle: "From Development to Production-Ready Agents"
- Icon: Rocket launching with AI brain and cloud

SECTION 1 - DEPLOYMENT JOURNEY (Purple #8B5CF6):
Title: "The Path to Production"
Linear journey with checkpoints:
[Development] → [Testing] → [Staging] → [Canary] → [Production]
     ↓              ↓           ↓           ↓            ↓
 "Local env"   "Unit/E2E"   "Pre-prod"   "5% traffic"  "Full scale"
Each stage with status icons: ✓ verified before proceeding

SECTION 2 - DEPLOYMENT OPTIONS (Green #22C55E):
Title: "Where to Deploy Agents"
Platform comparison grid:
| Platform | Pros | Cons | Best For |
|----------|------|------|----------|
| Serverless (Lambda/Functions) | Auto-scale, pay-per-use | Cold starts | Sporadic workloads |
| Containers (K8s) | Full control, portable | Complexity | High volume |
| Managed Platforms | Easy setup, built-in features | Vendor lock-in | Quick start |
| Edge | Low latency | Limited resources | Real-time |
| Hybrid | Flexibility | Complexity | Enterprise |

SECTION 3 - INFRASTRUCTURE CHECKLIST (Orange #F97316):
Title: "Production Readiness Checklist"
Checkbox grid:
☑ "LLM API Keys" - Secured in vault
☑ "Rate Limiting" - Prevent abuse
☑ "Authentication" - Verify callers
☑ "SSL/TLS" - Encrypted connections
☑ "Load Balancing" - Distribute traffic
☑ "Auto-scaling" - Handle demand spikes
☑ "Health Checks" - Monitor availability
☑ "Logging" - Capture all events
☑ "Monitoring" - Dashboards and alerts
☑ "Backup/Recovery" - Data protection

SECTION 4 - CONTAINER DEPLOYMENT (Teal #14B8A6):
Title: "Containerizing Agents"
Dockerfile structure:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```
Container best practices:
- "Multi-stage builds" - Smaller images
- "Non-root user" - Security
- "Health endpoints" - Liveness/readiness
- "Resource limits" - Memory/CPU bounds

SECTION 5 - CLOUD PLATFORMS (Blue #3B82F6):
Title: "Popular Deployment Platforms"
Platform cards with logos:
☁️ "Azure Container Apps" - Serverless containers
☁️ "AWS Lambda" - Function-based deployment
☁️ "Google Cloud Run" - Container on demand
☁️ "Kubernetes" - Full orchestration
☁️ "Vercel/Netlify" - Edge functions
☁️ "Modal/Beam" - GPU-optimized serverless
Agent-specific:
🤖 "Azure AI Agent Service"
🤖 "AWS Bedrock Agents"
🤖 "LangGraph Cloud"

SECTION 6 - SCALING STRATEGIES (Purple #8B5CF6):
Title: "Scaling AI Agents"
Scaling diagram:
Horizontal: "Add more instances"
[Agent] [Agent] [Agent] → [Load Balancer] ← [Requests]
Vertical: "Bigger machines"
[Small] → [Medium] → [Large]
Auto-scaling triggers:
- "CPU utilization > 70%"
- "Queue depth > 100"
- "Response latency > 2s"
- "Scheduled scaling for peak hours"

SECTION 7 - CONFIGURATION MANAGEMENT (Green #22C55E):
Title: "Managing Agent Configuration"
Configuration layers:
[Environment Variables] - Runtime settings
        ↓
[Config Files] - YAML/JSON configs
        ↓
[Feature Flags] - Dynamic toggles
        ↓
[Secrets Vault] - API keys, credentials
Best practice: "Never hardcode secrets"
Tools: "Azure Key Vault, AWS Secrets Manager, HashiCorp Vault"

SECTION 8 - DEPLOYMENT PATTERNS (Orange #F97316):
Title: "Safe Deployment Strategies"
Pattern comparison:
🔵🟢 "Blue/Green" 
  - Two identical environments
  - Switch traffic instantly
  - Easy rollback
🐤 "Canary"
  - Gradual rollout (5% → 25% → 100%)
  - Monitor for issues
  - Minimize blast radius
🔄 "Rolling"
  - Update instances one by one
  - No downtime
  - Slower rollout
🎚️ "Feature Flags"
  - Toggle features without deploy
  - A/B testing capability

SECTION 9 - CI/CD PIPELINE (Indigo #6366F1):
Title: "Automated Deployment Pipeline"
Pipeline stages:
[Code Push] → [Build] → [Test] → [Security Scan] → [Deploy Staging] → [Integration Tests] → [Deploy Production]
     ↓           ↓          ↓           ↓                ↓                    ↓                   ↓
 "Git/PR"   "Docker"   "Unit"    "Vulnerability"    "Pre-prod"           "E2E"             "Gradual"
Tools: "GitHub Actions, Azure DevOps, GitLab CI, ArgoCD"

SECTION 10 - ROLLBACK PLAN (Red #EF4444):
Title: "When Deployments Fail"
Rollback decision tree:
[Issue Detected] 
     ↓
[Severity Assessment]
  ↓ Critical          ↓ Medium           ↓ Low
[Immediate Rollback] → [Hotfix + Monitor] → [Schedule Fix]
Rollback methods:
- "Revert to previous image tag"
- "Switch blue/green environments"
- "Disable feature flag"
- "Scale down new instances"

FOOTER (Dark background):
- Key principle: "Deploy early, deploy often, deploy safely"
- Callout: "Every deployment should be reversible"
- Open Agent School logo

DESIGN NOTES:
- Use cloud/infrastructure iconography
- Show pipeline flows clearly
- Include container/Kubernetes visuals
- Add deployment status indicators (green/yellow/red)
- Use rocket/launch metaphors
- Create professional DevOps aesthetic
```

---

## Color Palette

| Section | Primary Color | Usage |
|---------|--------------|-------|
| Header | #3B82F6 | Deployment theme |
| Journey | #8B5CF6 | Path stages |
| Options | #22C55E | Platform comparison |
| Checklist | #F97316 | Readiness |
| Container | #14B8A6 | Docker/K8s |
| Cloud | #3B82F6 | Platforms |
| Scaling | #8B5CF6 | Growth strategies |
| Config | #22C55E | Management |
| Patterns | #F97316 | Strategies |
| CI/CD | #6366F1 | Pipeline |
| Rollback | #EF4444 | Recovery |

---

## Learning Objectives

After viewing this infographic, learners will understand:
1. The deployment journey from dev to production
2. Platform options for hosting AI agents
3. Production readiness checklist
4. Containerization best practices
5. Cloud platform options for agents
6. Scaling strategies for high availability
7. Configuration and secrets management
8. Safe deployment patterns (blue/green, canary)
9. CI/CD pipeline design for agents
10. Rollback planning and execution
