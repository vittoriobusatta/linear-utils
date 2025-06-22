import { getProjectMilestones } from "lib/linear/services/milestone.service";

export async function resolveMilestoneId(
  projectId: string,
  milestoneName: string
): Promise<string> {
  const milestones = await getProjectMilestones(projectId);

  const existing = milestones.find(
    (m) => m.name.trim().toLowerCase() === milestoneName.trim().toLowerCase()
  );

  if (existing) {
    return existing.id;
  }

  throw new Error(`Milestone "${milestoneName}" not found`);
}
