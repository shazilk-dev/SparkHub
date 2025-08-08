# SparkHub Rebuild Script for Windows
Write-Host "🔄 Rebuilding SparkHub..." -ForegroundColor Green

# Clear all caches
Write-Host "🧹 Clearing all caches..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
}
if (Test-Path "node_modules/.cache") {
    Remove-Item -Recurse -Force "node_modules/.cache"
}

# Set environment for fresh build
$env:NODE_ENV = "production"
$env:NEXT_TELEMETRY_DISABLED = "1"

# Rebuild
Write-Host "🔨 Building with fresh cache..." -ForegroundColor Cyan
npm run build:fast

# Start
Write-Host "🚀 Starting production server..." -ForegroundColor Green
npm start
