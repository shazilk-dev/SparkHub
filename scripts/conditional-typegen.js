#!/usr/bin/env node

import spawn from "child_process";
// Check if SKIP_TYPEGEN environment variable is set to '1'
const skipTypegen = process.env.SKIP_TYPEGEN === "1";

if (skipTypegen) {
  console.log("🚀 Skipping typegen for fast development");
  process.exit(0);
} else {
  console.log("📝 Running typegen...");

  // Run the typegen command
  const typegen = spawn("npm", ["run", "typegen"], {
    stdio: "inherit",
    shell: true,
  });

  typegen.on("close", (code) => {
    process.exit(code);
  });

  typegen.on("error", (err) => {
    console.error("Failed to run typegen:", err);
    process.exit(1);
  });
}
