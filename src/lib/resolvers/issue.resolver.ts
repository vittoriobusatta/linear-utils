import { IssueCreateInput } from "@linear/sdk/dist/_generated_documents";
import { client } from "lib/linear/client";

export async function issueAlreadyExists(
  input: IssueCreateInput
): Promise<boolean> {
  const result = await client.issues({
    filter: {
      title: { eq: input.title },
      project: { id: { eq: input.projectId } },
    },
  });

  return result.nodes.length > 0;
}
