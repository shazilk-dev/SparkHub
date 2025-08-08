#!/usr/bin/env node

import spawn from "child_process";
console.log("🚀 Starting SparkHub in Super Fast Mode...");
console.log("⚡ Skipping typegen, reducing features for maximum speed");

// Set environment variables for fastest development
process.env.NODE_ENV = "development";
process.env.NEXT_TELEMETRY_DISABLED = "1";
process.env.DISABLE_ESLINT_PLUGIN = "true";

// Start Next.js with turbo and optimizations
const nextDev = spawn("npx", ["next", "dev", "--turbo", "--port", "3000"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    SKIP_TYPEGEN: "1",
    NODE_OPTIONS: "--max-old-space-size=4096",
  },
});

nextDev.on("close", (code) => {
  process.exit(code);
});

nextDev.on("error", (err) => {
  console.error("Failed to start development server:", err);
  process.exit(1);
});
