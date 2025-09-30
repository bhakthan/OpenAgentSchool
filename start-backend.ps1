# OpenAgent Backend - Service Startup Script
# Run this script to start all three microservices

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  OpenAgent Backend - Starting All Services" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Stop"
$baseDir = $PSScriptRoot

# Function to check if service is healthy
function Test-ServiceHealth {
    param(
        [string]$Url,
        [string]$ServiceName,
        [int]$MaxAttempts = 30
    )
    
    Write-Host "⏳ Waiting for $ServiceName to be healthy..." -ForegroundColor Yellow
    
    for ($i = 1; $i -le $MaxAttempts; $i++) {
        try {
            $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ $ServiceName is healthy!" -ForegroundColor Green
                return $true
            }
        }
        catch {
            # Service not ready yet
        }
        
        Write-Host "   Attempt $i/$MaxAttempts..." -ForegroundColor Gray
        Start-Sleep -Seconds 2
    }
    
    Write-Host "❌ $ServiceName failed to become healthy" -ForegroundColor Red
    return $false
}

# Start Core API
Write-Host ""
Write-Host "🚀 Starting Core API (Port 8000)..." -ForegroundColor Cyan
Set-Location "$baseDir\core-api"
docker compose up -d --build

if (-not (Test-ServiceHealth -Url "http://localhost:8000/health" -ServiceName "Core API")) {
    Write-Host "❌ Core API failed to start. Check logs with: docker compose -f core-api/docker-compose.yml logs" -ForegroundColor Red
    exit 1
}

# Start Agent Orchestrator
Write-Host ""
Write-Host "🚀 Starting Agent Orchestrator (Port 8002)..." -ForegroundColor Cyan
Set-Location "$baseDir\agent-orchestrator"
docker compose up -d --build

if (-not (Test-ServiceHealth -Url "http://localhost:8002/api/v1/health/live" -ServiceName "Agent Orchestrator")) {
    Write-Host "❌ Agent Orchestrator failed to start. Check logs with: docker compose -f agent-orchestrator/docker-compose.yml logs" -ForegroundColor Red
    exit 1
}

# Start Knowledge Service
Write-Host ""
Write-Host "🚀 Starting Knowledge Service (Port 8003)..." -ForegroundColor Cyan
Set-Location "$baseDir\knowledge-service"
docker compose up -d --build

if (-not (Test-ServiceHealth -Url "http://localhost:8003/health" -ServiceName "Knowledge Service")) {
    Write-Host "❌ Knowledge Service failed to start. Check logs with: docker compose -f knowledge-service/docker-compose.yml logs" -ForegroundColor Red
    exit 1
}

# All services started successfully
Write-Host ""
Write-Host "=============================================" -ForegroundColor Green
Write-Host "  ✅ All Services Started Successfully!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Service Status:" -ForegroundColor Cyan
Write-Host "   Core API:             http://localhost:8000" -ForegroundColor White
Write-Host "   Core API Docs:        http://localhost:8000/docs" -ForegroundColor White
Write-Host "   Agent Orchestrator:   http://localhost:8002" -ForegroundColor White
Write-Host "   Agent Orchestrator Docs: http://localhost:8002/api/v1/docs" -ForegroundColor White
Write-Host "   Knowledge Service:    http://localhost:8003" -ForegroundColor White
Write-Host "   Knowledge Service Docs: http://localhost:8003/docs" -ForegroundColor White
Write-Host ""
Write-Host "📝 Useful Commands:" -ForegroundColor Cyan
Write-Host "   View all logs:        docker compose -f core-api/docker-compose.yml logs -f" -ForegroundColor Gray
Write-Host "   Stop all services:    .\stop-all-services.ps1" -ForegroundColor Gray
Write-Host "   Restart a service:    cd <service-dir> && docker compose restart" -ForegroundColor Gray
Write-Host ""
Write-Host "🌐 Frontend Integration:" -ForegroundColor Cyan
Write-Host "   Set these in OpenAgentSchool/.env.local:" -ForegroundColor Gray
Write-Host "   VITE_CORE_API_URL=http://localhost:8000" -ForegroundColor Gray
Write-Host "   VITE_ORCHESTRATOR_SERVICE_URL=http://localhost:8002" -ForegroundColor Gray
Write-Host "   VITE_KNOWLEDGE_SERVICE_URL=http://localhost:8003" -ForegroundColor Gray
Write-Host ""

Set-Location $baseDir
