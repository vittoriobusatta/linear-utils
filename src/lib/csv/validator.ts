export function validateCsvLabels(
  labelNamesCSV: string | string[],
  validLabels: Set<string>
): string[] {
  const inputLabels = Array.isArray(labelNamesCSV)
    ? labelNamesCSV
    : labelNamesCSV.split(",").map((l) => l.trim().toLowerCase());

  return inputLabels.filter((name) => !validLabels.has(name));
}
