import { parseCSV } from "lib/csv/parser";
import type { CsvIssueInput } from "types/csv";
import { client } from "lib/linear/client";
import { getProject } from "lib/linear/services/project.service";
import { context } from "context";
import { readSeedLog, writeToSeedLog } from "lib/utils/seed-tracker";

export async function seedMilestonesFromCSV(csvPath: string) {
  const rows = (await parseCSV(csvPath)) as CsvIssueInput[];
  const seen = new Set<string>();

  for (const row of rows) {
    const milestoneName = row.projectMilestone?.trim();
    const projectName = row.projectName?.trim();

    if (!milestoneName || !projectName) continue;

    const alreadySeeded = readSeedLog(projectName);
    const logKey = `${projectName}::Milestone::${milestoneName}`;
    const cacheMemoKey = `${projectName}::${milestoneName}`;

    if (seen.has(cacheMemoKey)) continue;
    seen.add(cacheMemoKey);

    if (alreadySeeded.has(logKey)) {
      console.info(`⏩ Skipped milestone (already in log): "${milestoneName}"`);
      continue;
    }

    const project = await getProject(projectName);

    if (!project) {
      console.warn(`❌ Project not found: ${projectName}\n`);
      continue;
    }

    const existing = (await project.projectMilestones()).nodes.find(
      (m) => m.name.trim().toLowerCase() === milestoneName.toLowerCase()
    );

    if (existing) {
      console.info(`💡 Milestone "${milestoneName}" already exists`);
      continue;
    }

    if (context.dryRun) {
      console.info(`🔎 [DRY RUN] Would create milestone "${milestoneName}"`);
      continue;
    }

    await client.createProjectMilestone({
      name: milestoneName,
      projectId: project.id,
    });
    console.info(`✅ Created milestone: "${milestoneName}"`);
    writeToSeedLog(projectName, logKey);
  }
}
