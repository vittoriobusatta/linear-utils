import { client } from "lib/linear/client";

export async function resolveLabelIds(
  labelNamesCSV: string | string[]
): Promise<string[]> {
  const allLabels = await client.issueLabels();
  const inputLabels = Array.isArray(labelNamesCSV)
    ? labelNamesCSV
    : labelNamesCSV.split(",").map((l) => l.trim().toLowerCase());

  const labelIds = allLabels.nodes
    .filter((label) => inputLabels.includes(label.name.toLowerCase()))
    .map((label) => label.id);

  return labelIds;
}
