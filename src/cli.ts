import "dotenv/config";
import { context } from "context";
import { seedIssuesFromCSV } from "lib/linear/seeders/issue.seed";
import { seedMilestonesFromCSV } from "lib/linear/seeders/milestone.seed";

async function main() {
  context.dryRun = process.argv.includes("--dry");

  await seedMilestonesFromCSV("./src/issues.csv");
  await seedIssuesFromCSV("./src/issues.csv");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
