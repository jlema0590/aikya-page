export const products = [
  {
    id: "harness",
    name: "Aikya Harness",
    short: "Harness",
    kind: "Work inside Claude Code",
    tag: "Engineering workflows",
    headline: "Give your engineering work a shared structure.",
    description:
      "A Claude Code engineering environment for project onboarding, application work, infrastructure planning and living documentation.",
    preview:
      "Start with an existing project, choose ODD or SDD, and work through explicit engineering phases.",
    command: "/aikya-analyze",
    repo: "https://github.com/jlema0590/aikya-harness",
    installation: "https://github.com/jlema0590/aikya-harness#1-quick-start",
    release: "https://github.com/jlema0590/aikya-harness/releases/latest",
    requirements:
      "Claude Code for the interactive workflow, and Python 3.10–3.13 with pip and venv. Native Mods need a compatible Claude Code release.",
    features: [
      [
        "Project-aware onboarding",
        "Use /aikya-init for new projects or /aikya-analyze for existing codebases.",
      ],
      [
        "Explicit methodology",
        "Select ODD or SDD during onboarding; retain the workflow’s approvals and evidence.",
      ],
      [
        "Engineering coverage",
        "Application, mobile, infrastructure and DevOps workflows with curated agents and skills.",
      ],
      [
        "Project-local knowledge",
        "Keep memory, code inventory and generated Markdown documentation with the project.",
      ],
    ],
    chips: ["Claude Code", "ODD / SDD", "Local documentation"],
    availability: "Stable releases available",
    note: "The latest published release and the main branch can differ. Follow the requirements and installer instructions for the version you select.",
  },
  {
    id: "forge",
    name: "Aikya Forge",
    short: "Forge",
    kind: "Work from your terminal",
    tag: "Independent terminal",
    headline: "A focused terminal for deliberate engineering.",
    description:
      "An independent Pi-based terminal with a Python core, project-local memory and controlled AI execution.",
    preview:
      "Bring project context, provider settings, workflow controls and observed agent usage into one terminal.",
    command: "aikya",
    repo: "https://github.com/jlema0590/aikya-forge",
    installation:
      "https://github.com/jlema0590/aikya-forge#quick-start-from-source",
    release: "https://github.com/jlema0590/aikya-forge/releases",
    requirements:
      "Source setup uses Python 3.10–3.13, Node.js 22.19.0+ and Git. Native distribution targets macOS, Windows and Linux; opening the terminal does not call a model.",
    features: [
      [
        "Interactive terminal",
        "Project workflows and an expandable Agents panel for Claude and Codex.",
      ],
      [
        "Your environment",
        "Provider and model selection, the Aikya theme, appearance settings and project/Git context.",
      ],
      [
        "Local memory",
        "Incremental project inventory and HTML visualization updated through local processing.",
      ],
      [
        "Visible execution limits",
        "Project-local token and call budgets, observed usage, and explicit unavailable states.",
      ],
    ],
    chips: ["Pi terminal", "Claude / Codex", "Local memory"],
    availability: "First stable release pending",
    note: "Use the source quick start today. Native public downloads require an accepted stable release and its deployment. Harness and Forge remain independent products.",
  },
  {
    id: "mods",
    name: "Aikya Mods",
    short: "Mods",
    kind: "See more in Claude Code",
    tag: "Workflow visibility",
    headline: "Make the work in your terminal visible.",
    description:
      "Independent Claude Code extensions for phase diagrams, observed usage and a little terminal personality.",
    preview:
      "Choose Flow for phase views, Usage for observed meters, or the optional BoxBot conveyor illustration.",
    command: "/aikya-flow status",
    repo: "https://github.com/jlema0590/aikya-mods",
    installation:
      "https://github.com/jlema0590/aikya-mods/tree/v0.0.10#install-with-one-command",
    release: "https://github.com/jlema0590/aikya-mods/releases/latest",
    requirements:
      "Claude Code with compatible native Mods support. Installer prerequisites differ by operating system; see the instructions shipped with the selected release.",
    features: [
      [
        "Aikya Flow",
        "Phase diagrams display recorded state. Missing evidence remains visible rather than implying success.",
      ],
      [
        "Aikya Usage",
        "Context, observed tokens and separate five-hour and seven-day usage fields, subject to available data.",
      ],
      [
        "Aikya BoxBot",
        "An optional decorative conveyor belt inside the mod pane.",
      ],
      [
        "Independent selection",
        "Select the mods you want. Their versions and the bundle version are managed independently.",
      ],
    ],
    chips: ["Flow", "Usage", "BoxBot"],
    availability: "Stable releases available",
    note: "Feature documentation on main can be newer than the published bundle. Check release notes for exact mod versions, compatibility and data-source limitations.",
  },
];
export const phases = [
  "Explore",
  "Plan",
  "Implement",
  "Validate",
  "Security",
  "Review",
];
