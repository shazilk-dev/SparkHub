#!/bin/bash

# SparkHub Fast Development Script
echo "🚀 Starting SparkHub in Fast Development Mode..."

# Set environment variables for maximum performance
export NODE_ENV=development
export NEXT_TELEMETRY_DISABLED=1
export TURBOPACK=1
export SKIP_TYPEGEN=1

# Clear Next.js cache
echo "🧹 Clearing Next.js cache..."
rm -rf .next

# Start development server with optimizations
echo "⚡ Starting with Turbopack + Performance Optimizations..."
npm run dev:fast
