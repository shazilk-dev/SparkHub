# SparkHub Fast Development Script for Windows
Write-Host "🚀 Starting SparkHub in Fast Development Mode..." -ForegroundColor Green

# Set environment variables for maximum performance
$env:NODE_ENV = "development"
$env:NEXT_TELEMETRY_DISABLED = "1"
$env:TURBOPACK = "1"
$env:SKIP_TYPEGEN = "1"

# Clear Next.js cache
Write-Host "🧹 Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}

# Start development server with optimizations
Write-Host "⚡ Starting with Turbopack + Performance Optimizations..." -ForegroundColor Cyan
npm run dev:fast
