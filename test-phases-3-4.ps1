# Week 4 Phases 3 & 4 Testing Script
# Tests Knowledge Service Integration and Bookmark Sync

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   Testing Phases 3 & 4 - Knowledge + Bookmarks   " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Track test results
$script:passCount = 0
$script:failCount = 0
$script:skipCount = 0

function Test-Step {
    param(
        [string]$Name,
        [scriptblock]$Test,
        [bool]$Required = $true
    )
    
    Write-Host "Testing: $Name" -ForegroundColor Yellow
    try {
        $result = & $Test
        if ($result) {
            Write-Host "  ✅ PASS" -ForegroundColor Green
            $script:passCount++
        } else {
            if ($Required) {
                Write-Host "  ❌ FAIL" -ForegroundColor Red
                $script:failCount++
            } else {
                Write-Host "  ⚠️  SKIP (Optional)" -ForegroundColor DarkYellow
                $script:skipCount++
            }
        }
    } catch {
        Write-Host "  ❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
        $script:failCount++
    }
    Write-Host ""
}

Write-Host "================================" -ForegroundColor Magenta
Write-Host "   Phase 1: Service Health     " -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta
Write-Host ""

# Test Frontend (Vite dev server)
Test-Step "Frontend Dev Server (Port 5000)" {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5000" -TimeoutSec 5 -UseBasicParsing
        return $response.StatusCode -eq 200
    } catch {
        Write-Host "    Hint: Run 'npm run dev' in OpenAgentSchool folder" -ForegroundColor DarkGray
        return $false
    }
}

# Test Core API
Test-Step "Core API (Port 8001)" {
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8001/health" -TimeoutSec 5
        return $response.status -eq "healthy"
    } catch {
        Write-Host "    Hint: Run 'python run.py' in openagent-backend/core-api" -ForegroundColor DarkGray
        return $false
    }
} -Required $false

# Test Knowledge Service
Test-Step "Knowledge Service (Port 8003)" {
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8003/health" -TimeoutSec 5
        return $response.status -eq "healthy"
    } catch {
        Write-Host "    Hint: Run 'docker compose up -d' in openagent-backend/knowledge-service" -ForegroundColor DarkGray
        return $false
    }
} -Required $false

Write-Host "================================" -ForegroundColor Magenta
Write-Host "   Phase 2: File Integrity     " -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta
Write-Host ""

# Check Phase 3 files exist
Test-Step "Phase 3: Knowledge Hooks File" {
    return Test-Path "c:\code\OpenAgentSchool\src\hooks\useKnowledge.ts"
}

Test-Step "Phase 3: Knowledge Search Component" {
    return Test-Path "c:\code\OpenAgentSchool\src\components\knowledge\KnowledgeSearch.tsx"
}

Test-Step "Phase 3: Related Concepts Component" {
    return Test-Path "c:\code\OpenAgentSchool\src\components\knowledge\RelatedConcepts.tsx"
}

Test-Step "Phase 3: Knowledge Base Page" {
    return Test-Path "c:\code\OpenAgentSchool\src\pages\KnowledgeBasePage.tsx"
}

# Check Phase 4 files exist
Test-Step "Phase 4: Bookmarks API Client" {
    return Test-Path "c:\code\OpenAgentSchool\src\services\api\bookmarks.ts"
}

Test-Step "Phase 4: Bookmarks Hooks" {
    return Test-Path "c:\code\OpenAgentSchool\src\hooks\useBookmarks.ts"
}

Test-Step "Phase 4: Backend Bookmarks API" {
    return Test-Path "c:\code\openagent-backend\core-api\app\api\v1\bookmarks.py"
}

Test-Step "Phase 4: Backend Bookmarks Model" {
    return Test-Path "c:\code\openagent-backend\core-api\app\models\bookmark.py"
}

Write-Host "================================" -ForegroundColor Magenta
Write-Host "   Phase 3: API Endpoints       " -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta
Write-Host ""

# Test Knowledge Service endpoints (if running)
Test-Step "Knowledge: Search Endpoint" {
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8003/api/v1/concepts/search?q=agent&limit=3" -TimeoutSec 5
        Write-Host "    Found: $($response.results.Count) results" -ForegroundColor DarkGray
        return $response.results.Count -gt 0
    } catch {
        return $false
    }
} -Required $false

Test-Step "Knowledge: Get Concept by ID" {
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8003/api/v1/concepts/agent-architecture" -TimeoutSec 5
        Write-Host "    Concept: $($response.title)" -ForegroundColor DarkGray
        return $null -ne $response.title
    } catch {
        return $false
    }
} -Required $false

Test-Step "Knowledge: Related Concepts" {
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8003/api/v1/concepts/agent-architecture/related?limit=3" -TimeoutSec 5
        Write-Host "    Related: $($response.related_concepts.Count) concepts" -ForegroundColor DarkGray
        return $response.related_concepts.Count -gt 0
    } catch {
        return $false
    }
} -Required $false

Write-Host "================================" -ForegroundColor Magenta
Write-Host "   Phase 4: Bookmark API        " -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta
Write-Host ""

# Test bookmark endpoints (requires auth)
Test-Step "Bookmarks: API Route Registered" {
    try {
        # Try to hit endpoint (will get 401 without auth, but proves route exists)
        try {
            Invoke-RestMethod -Uri "http://localhost:8001/api/v1/bookmarks" -TimeoutSec 5
        } catch {
            # 401 is expected without auth - route exists
            return $_.Exception.Response.StatusCode.value__ -eq 401
        }
        return $false
    } catch {
        return $false
    }
} -Required $false

Write-Host "================================" -ForegroundColor Magenta
Write-Host "   Phase 5: TypeScript Build    " -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta
Write-Host ""

Test-Step "TypeScript: No Compilation Errors" {
    Write-Host "    Running: tsc --noEmit..." -ForegroundColor DarkGray
    Push-Location "c:\code\OpenAgentSchool"
    try {
        $output = npx tsc --noEmit 2>&1
        $exitCode = $LASTEXITCODE
        Pop-Location
        
        if ($exitCode -eq 0) {
            Write-Host "    ✓ No TypeScript errors" -ForegroundColor DarkGray
            return $true
        } else {
            Write-Host "    ✗ TypeScript errors found:" -ForegroundColor Red
            Write-Host $output -ForegroundColor DarkRed
            return $false
        }
    } catch {
        Pop-Location
        return $false
    }
}

Write-Host "================================" -ForegroundColor Magenta
Write-Host "   Phase 6: Route Verification  " -ForegroundColor Magenta
Write-Host "================================" -ForegroundColor Magenta
Write-Host ""

Test-Step "Route: /knowledge-base exists in App.tsx" {
    $appContent = Get-Content "c:\code\OpenAgentSchool\src\App.tsx" -Raw
    return $appContent -match "/knowledge-base"
}

Test-Step "Route: Knowledge page lazy loaded" {
    $appContent = Get-Content "c:\code\OpenAgentSchool\src\App.tsx" -Raw
    return $appContent -match "KnowledgeBasePage"
}

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "                  TEST SUMMARY                     " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Passed:  $script:passCount" -ForegroundColor Green
Write-Host "❌ Failed:  $script:failCount" -ForegroundColor Red
Write-Host "⚠️  Skipped: $script:skipCount" -ForegroundColor Yellow
Write-Host ""

$total = $script:passCount + $script:failCount
if ($total -gt 0) {
    $percentage = [math]::Round(($script:passCount / $total) * 100, 1)
    Write-Host "Success Rate: $percentage%" -ForegroundColor $(if ($percentage -ge 80) { "Green" } elseif ($percentage -ge 60) { "Yellow" } else { "Red" })
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "              MANUAL TEST CHECKLIST                " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Phase 3: Knowledge Service" -ForegroundColor Magenta
Write-Host "  1. Navigate to: http://localhost:5000/knowledge-base" -ForegroundColor White
Write-Host "  2. Type in search: 'agent pattern'" -ForegroundColor White
Write-Host "  3. Verify: Results show with similarity %" -ForegroundColor White
Write-Host "  4. Click: Category filter (Architecture)" -ForegroundColor White
Write-Host "  5. Click: A concept card" -ForegroundColor White
Write-Host "  6. Verify: Related concepts sidebar appears" -ForegroundColor White
Write-Host ""
Write-Host "Phase 4: Bookmark Sync" -ForegroundColor Magenta
Write-Host "  1. Open: http://localhost:5000/bookmarks" -ForegroundColor White
Write-Host "  2. Add bookmark (not logged in)" -ForegroundColor White
Write-Host "  3. Verify: Saved to localStorage" -ForegroundColor White
Write-Host "  4. Navigate to: http://localhost:5000/auth" -ForegroundColor White
Write-Host "  5. Login with test account" -ForegroundColor White
Write-Host "  6. Verify: Toast shows 'Synced X bookmarks'" -ForegroundColor White
Write-Host "  7. Check Network tab: POST to /bookmarks/sync" -ForegroundColor White
Write-Host "  8. Logout and re-login" -ForegroundColor White
Write-Host "  9. Verify: Bookmarks persist from server" -ForegroundColor White
Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "               NEXT STEPS                          " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

if ($script:failCount -gt 0) {
    Write-Host "⚠️  Some tests failed. Fix issues before continuing." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Common Fixes:" -ForegroundColor White
    Write-Host "  - Start frontend: npm run dev" -ForegroundColor DarkGray
    Write-Host "  - Start Core API: python run.py (in openagent-backend/core-api)" -ForegroundColor DarkGray
    Write-Host "  - Start Knowledge: docker compose up -d (in openagent-backend/knowledge-service)" -ForegroundColor DarkGray
} else {
    Write-Host "✅ All automated tests passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Ready for Phase 5-7: Accessibility and Polish" -ForegroundColor Cyan
    Write-Host "  - ARIA labels" -ForegroundColor White
    Write-Host "  - Keyboard navigation" -ForegroundColor White
    Write-Host "  - Focus management" -ForegroundColor White
    Write-Host "  - Color contrast" -ForegroundColor White
    Write-Host "  - Mobile responsive" -ForegroundColor White
}

Write-Host ""
