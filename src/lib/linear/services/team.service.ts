import { client } from "lib/linear/client";

export async function getTeam(teamKey: string) {
  const team = await client.team(teamKey);
  if (!team) throw new Error(`Team with key "${teamKey}" not found`);
  return team;
}
