#!/usr/bin/env tsx

import "dotenv/config";
import { context } from "context";
import { seedIssuesFromCSV } from "lib/linear/seeders/issue.seed";
import { seedMilestonesFromCSV } from "lib/linear/seeders/milestone.seed";

async function main() {
  context.dryRun = process.argv.includes("--dry");

  const csvArg = process.argv.find((arg) => arg.startsWith("--csv="));
  const csvPath = csvArg?.split("=")[1] || process.env.CSV_PATH;

  if (!csvPath) {
    console.error("❌ CSV path not provided");
    process.exit(1);
  }

  await seedMilestonesFromCSV(csvPath);
  await seedIssuesFromCSV(csvPath);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
