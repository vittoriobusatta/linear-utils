import { Project } from "@linear/sdk";
import { client } from "lib/linear/client";

export async function getProjectMilestones(projectId: Project["id"]) {
  const project = await client.project(projectId);
  const milestones = await project.projectMilestones();
  return milestones.nodes;
}
