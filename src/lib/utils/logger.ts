export function logIssueHeader(csv: any) {
  console.info("\n" + "=".repeat(60) + "\n");
  console.info(`🔁 Processing issue: "${csv.title}"`);
  console.info(`🏷️  Project: ${csv.projectName}`);
  console.info(`🎯 Milestone: ${csv.projectMilestone}`);
  console.info(`🏁 Labels: ${csv.labelNames}`);
}

export function logDryRun(input: any, csv: any) {
  console.info("\n🧪 [DRY RUN] Would create:");
  console.info(`• Title: ${input.title}`);
  console.info(`• Team: ${csv.teamKey}`);
  console.info(`• Project: ${csv.projectName}`);
  console.info(`• Milestone: ${csv.projectMilestone}`);
  console.info(`• Labels: ${csv.labelNames}`);
}

export function logUnknownLabels(title: string, unknownLabels: string[]) {
  console.warn(
    `⚠️ Unknown label(s) in "${title}": ${unknownLabels.join(", ")}`
  );
}

export function logIssueError(title: string, message: string) {
  console.error(`❌ Failed to create issue "${title}": ${message}`);
}
