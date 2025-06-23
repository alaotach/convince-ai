# AI Chat Backend Startup Script (PowerShell)
# This script provides different ways to run the backend on Windows

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("dev", "prod", "light", "test", "perf")]
    [string]$Mode
)

Write-Host "🚀 AI Chat Backend Startup Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Function to check if Python packages are installed
function Check-Dependencies {
    Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
    try {
        python -c "import flask, flask_cors, g4f, gunicorn" 2>$null
        if ($LASTEXITCODE -ne 0) {
            throw "Missing dependencies"
        }
        Write-Host "✅ All dependencies are installed" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Missing dependencies. Installing..." -ForegroundColor Red
        pip install -r ..\project\requirements.txt
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
            exit 1
        }
    }
}

# Function to start development server
function Start-Dev {
    Write-Host "🔧 Starting development server..." -ForegroundColor Blue
    Write-Host "   - Single threaded but with threading enabled" -ForegroundColor Gray
    Write-Host "   - Good for debugging and development" -ForegroundColor Gray
    Write-Host "   - Access at: http://localhost:4343" -ForegroundColor Gray
    python app.py
}

# Function to start production server
function Start-Production {
    Write-Host "🏭 Starting production server with Gunicorn..." -ForegroundColor Green
    Write-Host "   - Multi-worker with gevent async handling" -ForegroundColor Gray
    Write-Host "   - Optimized for concurrent requests" -ForegroundColor Gray
    Write-Host "   - Access at: http://localhost:4343" -ForegroundColor Gray
    gunicorn -c gunicorn.conf.py app:app
}

# Function to start lightweight production server
function Start-ProductionLight {
    Write-Host "⚡ Starting lightweight production server..." -ForegroundColor Magenta
    Write-Host "   - 2 workers for smaller deployments" -ForegroundColor Gray
    Write-Host "   - Good for low-medium traffic" -ForegroundColor Gray
    Write-Host "   - Access at: http://localhost:4343" -ForegroundColor Gray
    gunicorn -w 2 -k gevent --timeout 120 --bind 0.0.0.0:4343 app:app
}

# Function to run performance tests
function Start-PerformanceTest {
    Write-Host "🧪 Running performance tests..." -ForegroundColor Yellow
    Write-Host "   - Testing async vs sync processing" -ForegroundColor Gray
    Write-Host "   - Multiple concurrent request scenarios" -ForegroundColor Gray
    Write-Host "   - Make sure the backend is running first!" -ForegroundColor Gray
    python test_performance.py --mode comprehensive
}
    Write-Host "🧪 Testing server health..." -ForegroundColor Yellow
    try {
        $healthResponse = Invoke-RestMethod -Uri "http://localhost:4343/api/health" -Method Get
        $healthResponse | ConvertTo-Json -Depth 4
        
        Write-Host ""
        Write-Host "📊 Testing metrics endpoint..." -ForegroundColor Yellow
        $metricsResponse = Invoke-RestMethod -Uri "http://localhost:4343/api/metrics" -Method Get
        $metricsResponse | ConvertTo-Json -Depth 4
    }
    catch {
        Write-Host "❌ Server is not responding. Make sure it's running." -ForegroundColor Red
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Main execution
switch ($Mode) {
    "dev" {
        Check-Dependencies
        Start-Dev
    }
    "prod" {
        Check-Dependencies
        Start-Production
    }
    "light" {
        Check-Dependencies
        Start-ProductionLight
    }    "test" {
        Test-Server
    }
    "perf" {
        Start-PerformanceTest
    }
}

Write-Host ""
Write-Host "Available commands:" -ForegroundColor Cyan
Write-Host "  .\start.ps1 dev    - Start development server" -ForegroundColor Gray
Write-Host "  .\start.ps1 prod   - Start production server" -ForegroundColor Gray
Write-Host "  .\start.ps1 light  - Start lightweight production server" -ForegroundColor Gray
Write-Host "  .\start.ps1 test   - Test server endpoints" -ForegroundColor Gray
Write-Host "  .\start.ps1 perf   - Run performance tests" -ForegroundColor Gray
