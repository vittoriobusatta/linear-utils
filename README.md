# Linear Utils

A lightweight CLI tool to seed issues and milestones into [Linear](https://linear.app/) from a CSV file.

## Features

* Import issues in bulk from CSV
* Automatically create project milestones
* Validate labels against existing Linear labels
* Keep a seed log to avoid duplicates on rerun
* `--dry` mode to simulate the process
* Detects already existing issues in Linear

## Installation

```bash
pnpm install
pnpm setup
pnpm link
```

Run `source ~/.zshrc` after `pnpm setup` to update your PATH and make the CLI available globally.

## Usage

```bash
linear-utils --dry
```

Use `--dry` to simulate issue creation without making any changes.

## CSV Input Format

See [`examples/issues.example.csv`](./examples/issues.example.csv) for a full template.

Required columns: `title`, `teamKey`, `projectName`

Optional: `description`, `projectMilestone`, `labelNames`

## Run Tests

```bash
pnpm test
```

## License

MIT
