import fs from "fs";
import { parse } from "csv-parse";
import { CsvIssueInput } from "types/csv";

export async function parseCSV(filePath: string): Promise<CsvIssueInput[]> {
  return new Promise((resolve, reject) => {
    const records: CsvIssueInput[] = [];

    fs.createReadStream(filePath)
      .pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
          trim: true,
          quote: '"',
        })
      )
      .on("data", (row) => records.push(row))
      .on("end", () => resolve(records))
      .on("error", reject);
  });
}
