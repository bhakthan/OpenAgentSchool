# Week 4 Phases 3 & 4 Testing Script
# Tests Knowledge Service Integration and Bookmark Sync

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   Testing Phases 3 & 4 - Knowledge + Bookmarks   " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$passCount = 0
$failCount = 0
$skipCount = 0

function Test-Service {
    param([string]$Name, [string]$Url)
    Write-Host "Testing: $Name" -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri $Url -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
        Write-Host "  ✅ PASS - Status: $($response.StatusCode)" -ForegroundColor Green
        $script:passCount++
        return $true
    } catch {
        Write-Host "  ❌ FAIL - Not responding" -ForegroundColor Red
        $script:failCount++
        return $false
    }
}

function Test-File {
    param([string]$Name, [string]$Path)
    Write-Host "Testing: $Name" -ForegroundColor Yellow
    if (Test-Path $Path) {
        Write-Host "  ✅ PASS - File exists" -ForegroundColor Green
        $script:passCount++
        return $true
    } else {
        Write-Host "  ❌ FAIL - File not found" -ForegroundColor Red
        $script:failCount++
        return $false
    }
}

Write-Host "================================" -ForegroundColor Magenta
Write-Host "   Phase 1: Service Health     " -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta
Write-Host ""

Test-Service "Frontend (Port 5000)" "http://localhost:5000"
Test-Service "Core API (Port 8001)" "http://localhost:8001/health"
Test-Service "Knowledge Service (Port 8003)" "http://localhost:8003/health"

Write-Host ""
Write-Host "================================" -ForegroundColor Magenta
Write-Host "   Phase 2: File Integrity     " -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta
Write-Host ""

# Phase 3 Files
Test-File "Knowledge Hooks" "c:\code\OpenAgentSchool\src\hooks\useKnowledge.ts"
Test-File "Knowledge Search Component" "c:\code\OpenAgentSchool\src\components\knowledge\KnowledgeSearch.tsx"
Test-File "Related Concepts Component" "c:\code\OpenAgentSchool\src\components\knowledge\RelatedConcepts.tsx"
Test-File "Knowledge Base Page" "c:\code\OpenAgentSchool\src\pages\KnowledgeBasePage.tsx"

Write-Host ""

# Phase 4 Files
Test-File "Bookmarks API Client" "c:\code\OpenAgentSchool\src\services\api\bookmarks.ts"
Test-File "Bookmarks Hooks" "c:\code\OpenAgentSchool\src\hooks\useBookmarks.ts"
Test-File "Backend Bookmarks API" "c:\code\openagent-backend\core-api\app\api\v1\bookmarks.py"
Test-File "Backend Bookmarks Model" "c:\code\openagent-backend\core-api\app\models\bookmark.py"

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "                  TEST SUMMARY                     " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Passed:  $passCount" -ForegroundColor Green
Write-Host "❌ Failed:  $failCount" -ForegroundColor Red
Write-Host ""

$total = $passCount + $failCount
if ($total -gt 0) {
    $percentage = [math]::Round(($passCount / $total) * 100, 1)
    Write-Host "Success Rate: $percentage%" -ForegroundColor $(if ($percentage -ge 80) { "Green" } elseif ($percentage -ge 60) { "Yellow" } else { "Red" })
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "              MANUAL TEST CHECKLIST                " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Phase 3: Knowledge Service" -ForegroundColor Magenta
Write-Host "  1. Navigate to: http://localhost:5000/knowledge-base" -ForegroundColor White
Write-Host "  2. Search for: agent pattern" -ForegroundColor White
Write-Host "  3. Verify: Results show with similarity %" -ForegroundColor White
Write-Host "  4. Click: Category filter" -ForegroundColor White
Write-Host "  5. Click: A concept card" -ForegroundColor White
Write-Host ""
Write-Host "Phase 4: Bookmark Sync" -ForegroundColor Magenta
Write-Host "  1. Add bookmark (logged out)" -ForegroundColor White
Write-Host "  2. Login" -ForegroundColor White
Write-Host "  3. Verify: Toast shows sync message" -ForegroundColor White
Write-Host "  4. Check Network tab for /bookmarks/sync" -ForegroundColor White
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "✅ Ready for Phase 5-7: Accessibility!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Fix failing tests first" -ForegroundColor Yellow
}
Write-Host ""
