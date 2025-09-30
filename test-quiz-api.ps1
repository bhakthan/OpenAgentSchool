# Quiz API Integration Test
# Tests the Quiz System endpoint on Core API

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  Quiz API Integration Test" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:8000"

# Test 1: Health Check
Write-Host "Test 1: Health Check" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "✅ Health check passed" -ForegroundColor Green
    Write-Host "   Response: $($response | ConvertTo-Json -Compress)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 2: Get Available Quizzes
Write-Host "Test 2: Get Available Quizzes" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/v1/quiz/available" -Method Get
    Write-Host "✅ Quiz list retrieved successfully" -ForegroundColor Green
    Write-Host "   Found $($response.Count) quizzes" -ForegroundColor Gray
    
    if ($response.Count -gt 0) {
        Write-Host "   Sample quiz: $($response[0].title)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Failed to get quiz list: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   This might be expected if endpoint doesn't exist yet" -ForegroundColor Yellow
}

Write-Host ""

# Test 3: Get Quiz Categories
Write-Host "Test 3: Get Quiz Categories" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/v1/quiz/categories" -Method Get
    Write-Host "✅ Quiz categories retrieved successfully" -ForegroundColor Green
    Write-Host "   Found $($response.Count) categories" -ForegroundColor Gray
} catch {
    Write-Host "❌ Failed to get categories: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "   This might be expected if endpoint doesn't exist yet" -ForegroundColor Yellow
}

Write-Host ""

# Test 4: API Documentation Check
Write-Host "Test 4: API Documentation" -ForegroundColor Yellow
Write-Host "   Opening API docs in browser..." -ForegroundColor Gray
Start-Process "http://localhost:8000/docs"

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  Test Summary" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Check API docs at http://localhost:8000/docs" -ForegroundColor Gray
Write-Host "2. Look for quiz-related endpoints" -ForegroundColor Gray
Write-Host "3. Test endpoints using Swagger UI" -ForegroundColor Gray
Write-Host "4. Update frontend to call discovered endpoints" -ForegroundColor Gray
Write-Host ""
