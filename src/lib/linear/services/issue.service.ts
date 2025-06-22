import { IssueCreateInput } from "@linear/sdk/dist/_generated_documents";
import { context } from "context";
import { client } from "lib/linear/client";

export async function createIssue(input: IssueCreateInput) {
  const result = await client.createIssue(input);
  const issue = await result.issue;

  if (issue && input.projectMilestoneId) {
    await client.updateIssue(issue.id, {
      projectMilestoneId: input.projectMilestoneId,
    });
    console.info(`📌 Assigned milestone to "${issue.title}"`);
  }

  if (!context.dryRun) {
    console.info(
      `✅ Created issue: ${issue?.title} – https://linear.app/issue/${issue?.identifier}`
    );
  }
}

export async function getMyIssues() {
  const me = await client.viewer;
  const myIssues = await me.assignedIssues();

  if (myIssues.nodes.length) {
    myIssues.nodes.map((issue: { title: string }) =>
      console.info(`${me.displayName} has issue: ${issue.title}`)
    );
  } else {
    console.info(`${me.displayName} has no issues`);
  }
}
