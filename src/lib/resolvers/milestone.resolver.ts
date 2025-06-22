// import { client } from "lib/linear/client";
// import { getProjectMilestones } from "lib/linear/services/milestone.service";

// export async function resolveOrCreateMilestone(
//   projectId: string,
//   milestoneName: string
// ): Promise<string> {
//   const milestones = await getProjectMilestones(projectId);

//   const existing = milestones.find(
//     (m) => m.name.trim().toLowerCase() === milestoneName.trim().toLowerCase()
//   );

//   if (existing) {
//     return existing.id;
//   }

//   const created = await client.createProjectMilestone({
//     name: milestoneName,
//     projectId,
//   });

//   if (!created.projectMilestone) {
//     throw new Error("Milestone could not be created.");
//   }

//   return (await created.projectMilestone)?.id;
// }

// export async function resolveMilestoneId(
//   projectId: string,
//   milestoneName: string
// ): Promise<string> {
//   const milestones = await getProjectMilestones(projectId);

//   const existing = milestones.find(
//     (m) => m.name.trim().toLowerCase() === milestoneName.trim().toLowerCase()
//   );

//   if (existing) {
//     return existing.id;
//   }

//   throw new Error(`Milestone "${milestoneName}" not found`);
// }

import { client } from "lib/linear/client";
import { getProjectMilestones } from "lib/linear/services/milestone.service";
import { getProject } from "lib/linear/services/project.service";
import { readSeedLog, writeToSeedLog } from "lib/utils/seed-tracker";

// export async function resolveOrCreateMilestone(
//   projectName: string,
//   milestoneName: string
// ): Promise<string> {
//   const project = await getProject(projectName);

//   const milestoneLogKey = `${projectName}::${milestoneName}`;
//   const seedLog = readSeedLog(projectName + "_milestones");

//   if (seedLog.has(milestoneLogKey)) {
//     const milestones = await getProjectMilestones(project.id);
//     const existing = milestones.find(
//       (m) => m.name.trim().toLowerCase() === milestoneName.trim().toLowerCase()
//     );
//     if (existing) {
//       return existing.id;
//     }
//   }

//   const milestones = await getProjectMilestones(project.id);

//   const existing = milestones.find(
//     (m) => m.name.trim().toLowerCase() === milestoneName.trim().toLowerCase()
//   );

//   if (existing) {
//     writeToSeedLog(projectName + "_milestones", milestoneLogKey);
//     return existing.id;
//   }

//   const created = await client.createProjectMilestone({
//     name: milestoneName,
//     projectId: project.id,
//   });

//   if (!created.projectMilestone) {
//     throw new Error("Milestone could not be created.");
//   }

//   writeToSeedLog(projectName + "_milestones", milestoneLogKey);
//   return (await created.projectMilestone)?.id;
// }

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
