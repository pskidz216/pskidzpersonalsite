import type {
  LinkedInSnapshotData,
  DetectedChange,
  ParsedCertification,
  ParsedExperience,
} from "@/types/linkedin";
import { classifyChange } from "./classifier";

let changeCounter = 0;
function nextChangeId(): string {
  changeCounter += 1;
  return `change-${changeCounter}`;
}

export function resetChangeCounter(): void {
  changeCounter = 0;
}

function certKey(cert: ParsedCertification): string {
  return `${cert.name}::${cert.issuer}`;
}

function expKey(exp: ParsedExperience): string {
  return `${exp.company}::${exp.role}`;
}

function diffCertifications(
  previous: readonly ParsedCertification[],
  current: readonly ParsedCertification[]
): readonly DetectedChange[] {
  const prevMap = new Map(previous.map((c) => [certKey(c), c]));
  const currMap = new Map(current.map((c) => [certKey(c), c]));
  const changes: DetectedChange[] = [];

  for (const [key, cert] of currMap) {
    if (!prevMap.has(key)) {
      changes.push({
        id: nextChangeId(),
        type: "added",
        category: "certification",
        classification: classifyChange("certification", "added"),
        description: `New certification: ${cert.name} from ${cert.issuer}`,
        newValue: cert,
      });
    }
  }

  for (const [key, cert] of prevMap) {
    if (!currMap.has(key)) {
      changes.push({
        id: nextChangeId(),
        type: "removed",
        category: "certification",
        classification: classifyChange("certification", "removed"),
        description: `Removed certification: ${cert.name} from ${cert.issuer}`,
        previousValue: cert,
      });
    }
  }

  return changes;
}

function diffExperiences(
  previous: readonly ParsedExperience[],
  current: readonly ParsedExperience[]
): readonly DetectedChange[] {
  const prevMap = new Map(previous.map((e) => [expKey(e), e]));
  const currMap = new Map(current.map((e) => [expKey(e), e]));
  const changes: DetectedChange[] = [];

  for (const [key, exp] of currMap) {
    const prev = prevMap.get(key);
    if (!prev) {
      changes.push({
        id: nextChangeId(),
        type: "added",
        category: "experience",
        classification: classifyChange("experience", "added"),
        description: `New role: ${exp.role} at ${exp.company}`,
        newValue: exp,
      });
    } else if (
      prev.dateRange !== exp.dateRange ||
      prev.description !== exp.description
    ) {
      changes.push({
        id: nextChangeId(),
        type: "modified",
        category: "experience",
        classification: classifyChange("experience", "modified"),
        description: `Updated role: ${exp.role} at ${exp.company}`,
        previousValue: prev,
        newValue: exp,
      });
    }
  }

  for (const [key, exp] of prevMap) {
    if (!currMap.has(key)) {
      changes.push({
        id: nextChangeId(),
        type: "removed",
        category: "experience",
        classification: classifyChange("experience", "removed"),
        description: `Removed role: ${exp.role} at ${exp.company}`,
        previousValue: exp,
      });
    }
  }

  return changes;
}

function diffSkills(
  previous: readonly string[],
  current: readonly string[]
): readonly DetectedChange[] {
  const prevSet = new Set(previous);
  const currSet = new Set(current);
  const changes: DetectedChange[] = [];

  for (const skill of currSet) {
    if (!prevSet.has(skill)) {
      changes.push({
        id: nextChangeId(),
        type: "added",
        category: "skill",
        classification: classifyChange("skill", "added"),
        description: `New skill: ${skill}`,
        newValue: skill,
      });
    }
  }

  for (const skill of prevSet) {
    if (!currSet.has(skill)) {
      changes.push({
        id: nextChangeId(),
        type: "removed",
        category: "skill",
        classification: classifyChange("skill", "removed"),
        description: `Removed skill: ${skill}`,
        previousValue: skill,
      });
    }
  }

  return changes;
}

function diffStringField(
  category: "headline" | "summary",
  previous?: string,
  current?: string
): readonly DetectedChange[] {
  if (previous === current) return [];
  if (!previous && current) {
    return [
      {
        id: nextChangeId(),
        type: "added",
        category,
        classification: classifyChange(category, "added"),
        description: `${category} added`,
        newValue: current,
      },
    ];
  }
  if (previous && !current) {
    return [
      {
        id: nextChangeId(),
        type: "removed",
        category,
        classification: classifyChange(category, "removed"),
        description: `${category} removed`,
        previousValue: previous,
      },
    ];
  }
  return [
    {
      id: nextChangeId(),
      type: "modified",
      category,
      classification: classifyChange(category, "modified"),
      description: `${category} updated`,
      previousValue: previous,
      newValue: current,
    },
  ];
}

export function detectChanges(
  previous: LinkedInSnapshotData | null,
  current: LinkedInSnapshotData
): readonly DetectedChange[] {
  resetChangeCounter();

  if (!previous) {
    // First snapshot — everything is new, mark as auto-apply
    return [];
  }

  return [
    ...diffCertifications(previous.certifications, current.certifications),
    ...diffExperiences(previous.experiences, current.experiences),
    ...diffSkills(previous.skills, current.skills),
    ...diffStringField("headline", previous.headline, current.headline),
    ...diffStringField("summary", previous.summary, current.summary),
  ];
}
