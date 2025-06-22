import { client } from "lib/linear/client";

export async function getAllLabelNames(): Promise<Set<string>> {
  const issueLabels = await client.issueLabels();
  return new Set(issueLabels.nodes.map((l) => l.name.toLowerCase().trim()));
}
