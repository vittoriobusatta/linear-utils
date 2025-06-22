import fs from "fs";
import path from "path";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function getSeedLogPath(projectName: string) {
  const filename = `./seed-logs/seed-log__${projectName.replace(
    /\s+/g,
    "-"
  )}__${getTodayDate()}.json`;
  return path.resolve(process.cwd(), filename);
}

export function readSeedLog(projectName: string): Set<string> {
  const filePath = getSeedLogPath(projectName).toLowerCase();
  if (!fs.existsSync(filePath)) return new Set();
  const raw = fs.readFileSync(filePath, "utf-8");
  return new Set(JSON.parse(raw));
}

export function writeToSeedLog(projectName: string, key: string) {
  const filePath = getSeedLogPath(projectName).toLowerCase();
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const log = readSeedLog(projectName);
  log.add(key);
  fs.writeFileSync(filePath, JSON.stringify(Array.from(log), null, 2));
}