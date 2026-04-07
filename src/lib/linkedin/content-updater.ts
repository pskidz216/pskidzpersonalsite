import { readFile, writeFile } from "fs/promises";
import path from "path";
import type {
  DetectedChange,
  ParsedCertification,
  ParsedExperience,
  LinkedInSnapshotData,
} from "@/types/linkedin";
import { partitionChanges } from "./classifier";

const DATA_DIR = path.resolve(process.cwd(), "src/data");
const CERTS_FILE = path.join(DATA_DIR, "certifications.json");
const EXPERIENCE_FILE = path.join(DATA_DIR, "experience.json");

export interface UpdateResult {
  readonly applied: readonly DetectedChange[];
  readonly pendingReview: readonly DetectedChange[];
  readonly errors: readonly string[];
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const content = await readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  const content = JSON.stringify(data, null, 2) + "\n";
  await writeFile(filePath, content, "utf-8");
}

function applyCertificationChanges(
  existing: readonly ParsedCertification[],
  changes: readonly DetectedChange[]
): readonly ParsedCertification[] {
  let result = [...existing];

  for (const change of changes) {
    if (change.category !== "certification") continue;

    if (change.type === "added" && change.newValue) {
      const cert = change.newValue as ParsedCertification;
      const alreadyExists = result.some(
        (c) => c.name === cert.name && c.issuer === cert.issuer
      );
      if (!alreadyExists) {
        result = [...result, cert];
      }
    }
  }

  return result;
}

function applyExperienceChanges(
  existing: readonly ParsedExperience[],
  changes: readonly DetectedChange[]
): readonly ParsedExperience[] {
  let result = [...existing];

  for (const change of changes) {
    if (change.category !== "experience") continue;

    if (change.type === "added" && change.newValue) {
      const exp = change.newValue as ParsedExperience;
      const alreadyExists = result.some(
        (e) => e.company === exp.company && e.role === exp.role
      );
      if (!alreadyExists) {
        result = [...result, exp];
      }
    }
  }

  return result;
}

export async function applyAutoChanges(
  snapshot: LinkedInSnapshotData,
  changes: readonly DetectedChange[]
): Promise<UpdateResult> {
  const { auto, review } = partitionChanges(changes);
  const errors: string[] = [];

  if (auto.length === 0) {
    return { applied: [], pendingReview: review, errors: [] };
  }

  try {
    const existingCerts = await readJsonFile<ParsedCertification[]>(
      CERTS_FILE,
      []
    );
    const updatedCerts = applyCertificationChanges(existingCerts, auto);
    await writeJsonFile(CERTS_FILE, updatedCerts);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    errors.push(`Failed to update certifications: ${message}`);
  }

  try {
    const existingExperience = await readJsonFile<ParsedExperience[]>(
      EXPERIENCE_FILE,
      []
    );
    const updatedExperience = applyExperienceChanges(
      existingExperience,
      auto
    );
    await writeJsonFile(EXPERIENCE_FILE, updatedExperience);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    errors.push(`Failed to update experience: ${message}`);
  }

  return { applied: auto, pendingReview: review, errors };
}

export async function initializeDataFiles(
  snapshot: LinkedInSnapshotData
): Promise<void> {
  await writeJsonFile(CERTS_FILE, snapshot.certifications);
  await writeJsonFile(EXPERIENCE_FILE, snapshot.experiences);
}
