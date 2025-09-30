# Backend Health Check Script
# Quick validation that all services are running

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  Backend Health Check" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

function Test-Endpoint {
    param(
        [string]$Url,
        [string]$Name
    )
    
    try {
        $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ $Name is healthy" -ForegroundColor Green
            return $true
        }
    }
    catch {
        Write-Host "❌ $Name is NOT responding" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
        return $false
    }
}

Write-Host "Testing backend services..." -ForegroundColor Yellow
Write-Host ""

$coreApiHealthy = Test-Endpoint -Url "http://localhost:8000/health" -Name "Core API (8000)"
$orchestratorHealthy = Test-Endpoint -Url "http://localhost:8002/api/v1/health/live" -Name "Agent Orchestrator (8002)"
$knowledgeHealthy = Test-Endpoint -Url "http://localhost:8003/health" -Name "Knowledge Service (8003)"

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan

if ($coreApiHealthy -and $orchestratorHealthy -and $knowledgeHealthy) {
    Write-Host "✅ All services are healthy!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📖 API Documentation:" -ForegroundColor Cyan
    Write-Host "   Core API:          http://localhost:8000/docs" -ForegroundColor White
    Write-Host "   Agent Orchestrator: http://localhost:8002/api/v1/docs" -ForegroundColor White
    Write-Host "   Knowledge Service:  http://localhost:8003/docs" -ForegroundColor White
} else {
    Write-Host "❌ Some services are not healthy" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "   1. Check if services are running: docker ps" -ForegroundColor Gray
    Write-Host "   2. View logs: cd C:\code\openagent-backend\<service> && docker compose logs -f" -ForegroundColor Gray
    Write-Host "   3. Restart services: .\start-backend.ps1" -ForegroundColor Gray
}

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
