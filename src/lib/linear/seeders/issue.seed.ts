import { getAllLabelNames } from "lib/linear/services/label.service";
import { createIssue } from "lib/linear/services/issue.service";
import { parseCSV } from "lib/csv/parser";
import { validateCsvLabels } from "lib/csv/validator";
import { mapToLinearInput } from "lib/mappers/issue.mapper";
import { context } from "context";
import {
  logIssueHeader,
  logDryRun,
  logUnknownLabels,
  logIssueError,
} from "lib/utils/logger";
import { issueAlreadyExists } from "lib/resolvers/issue.resolver";
import { readSeedLog, writeToSeedLog } from "lib/utils/seed-tracker";
import { CsvIssueInput } from "types";

export async function seedIssuesFromCSV(csvPath: string) {
  const issues = await parseCSV(csvPath);
  const validLabels = await getAllLabelNames();

  const grouped = new Map<
    string,
    { seedLog: Set<string>; rows: CsvIssueInput[] }
  >();

  for (const csv of issues) {
    if (!csv.projectName) continue;
    if (!grouped.has(csv.projectName)) {
      grouped.set(csv.projectName, {
        seedLog: readSeedLog(csv.projectName),
        rows: [],
      });
    }
    grouped.get(csv.projectName)!.rows.push(csv);
  }

  for (const [projectName, { seedLog, rows }] of grouped) {
    for (const csv of rows) {
      try {
        const unknownLabels = validateCsvLabels(csv.labelNames, validLabels);
        if (unknownLabels.length) {
          logUnknownLabels(csv.title, unknownLabels);
          continue;
        }

        const key = `${csv.projectName}::Issue::${csv.title}`;
        if (seedLog.has(key)) {
          console.info(`⏩ Skipped (already seeded): ${csv.title}`);
          continue;
        }

        logIssueHeader(csv);

        const input = await mapToLinearInput(csv);
        const issueExists = await issueAlreadyExists(input);
        if (issueExists) {
          logIssueError(csv.title, "Issue already exists");
          continue;
        }

        if (context.dryRun) {
          logDryRun(input, csv);
          continue;
        }

        await createIssue(input);
        writeToSeedLog(projectName, key);
      } catch (err: any) {
        logIssueError(csv.title, err.message);
      }
    }
  }
}
