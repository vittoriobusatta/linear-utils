import { client } from "lib/linear/client";

export async function getProject(projectName: string) {
  const project = await client.projects({
    filter: { name: { eq: projectName } },
  });
  if (!project.nodes.length)
    throw new Error(`Project with name "${projectName}" not found`);
  return project.nodes[0];
}
