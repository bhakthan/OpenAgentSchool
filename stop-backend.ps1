# OpenAgent Backend - Service Shutdown Script
# Run this script to stop all three microservices

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  OpenAgent Backend - Stopping All Services" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Continue"
# Backend services are in separate directory
$backendDir = "C:\code\openagent-backend"

# Stop Knowledge Service
Write-Host "🛑 Stopping Knowledge Service..." -ForegroundColor Yellow
Set-Location "$backendDir\knowledge-service"
docker compose down
Write-Host "   ✅ Knowledge Service stopped" -ForegroundColor Green

# Stop Agent Orchestrator
Write-Host ""
Write-Host "🛑 Stopping Agent Orchestrator..." -ForegroundColor Yellow
Set-Location "$backendDir\agent-orchestrator"
docker compose down
Write-Host "   ✅ Agent Orchestrator stopped" -ForegroundColor Green

# Stop Core API
Write-Host ""
Write-Host "🛑 Stopping Core API..." -ForegroundColor Yellow
Set-Location "$backendDir\core-api"
docker compose down
Write-Host "   ✅ Core API stopped" -ForegroundColor Green

# Cleanup orphaned containers
Write-Host ""
Write-Host "🧹 Cleaning up orphaned containers..." -ForegroundColor Yellow
docker ps -aq --filter "label=com.docker.compose.project" | ForEach-Object { docker rm -f $_ 2>$null }

Write-Host ""
Write-Host "=============================================" -ForegroundColor Green
Write-Host "  ✅ All Services Stopped Successfully!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Additional Cleanup Options:" -ForegroundColor Cyan
Write-Host "   Remove all volumes:   docker volume prune -f" -ForegroundColor Gray
Write-Host "   Remove all networks:  docker network prune -f" -ForegroundColor Gray
Write-Host "   Full cleanup:         docker system prune -af --volumes" -ForegroundColor Gray
Write-Host ""

# Return to OpenAgentSchool directory
Set-Location "C:\code\OpenAgentSchool"
