import { IssueCreateInput } from "@linear/sdk/dist/_generated_documents";
import { getTeam } from "lib/linear/services/team.service";
import { getProject } from "lib/linear/services/project.service";
import { resolveLabelIds } from "lib/resolvers/label.resolver";
import { resolveMilestoneId } from "lib/resolvers/milestone.resolver";
import { CsvIssueInput } from "types";

export async function mapToLinearInput(
  csv: CsvIssueInput
): Promise<IssueCreateInput> {
  const team = await getTeam(csv.teamKey);
  const project = await getProject(csv.projectName);

  if (!team || !project) {
    throw new Error(
      `Team with key "${csv.teamKey}" or project with name "${csv.projectName}" not found`
    );
  }

  const labelIds = await resolveLabelIds(csv.labelNames);
  const milestoneId = await resolveMilestoneId(
    project.id,
    csv.projectMilestone
  );

  return {
    title: csv.title,
    description: csv.description,
    teamId: team.id,
    projectId: project.id,
    labelIds,
    projectMilestoneId: milestoneId,
  };
}
