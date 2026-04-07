import type {
  ChangeCategory,
  ChangeType,
  ChangeClassification,
} from "@/types/linkedin";

/**
 * Classification rules:
 *
 * AUTO (safe to apply without review):
 * - New certifications added
 * - New skills added
 * - Date range updates on existing experiences
 *
 * REVIEW (needs manual approval):
 * - Any experience additions or removals
 * - Experience description changes
 * - Certification removals
 * - Headline/summary changes
 * - Skill removals
 */

interface ClassificationRule {
  readonly category: ChangeCategory;
  readonly type: ChangeType;
  readonly classification: ChangeClassification;
}

const RULES: readonly ClassificationRule[] = [
  // Certifications
  { category: "certification", type: "added", classification: "auto" },
  { category: "certification", type: "removed", classification: "review" },
  { category: "certification", type: "modified", classification: "review" },

  // Experience — always review
  { category: "experience", type: "added", classification: "review" },
  { category: "experience", type: "removed", classification: "review" },
  { category: "experience", type: "modified", classification: "review" },

  // Skills
  { category: "skill", type: "added", classification: "auto" },
  { category: "skill", type: "removed", classification: "review" },
  { category: "skill", type: "modified", classification: "review" },

  // Headline & summary
  { category: "headline", type: "added", classification: "review" },
  { category: "headline", type: "removed", classification: "review" },
  { category: "headline", type: "modified", classification: "review" },
  { category: "summary", type: "added", classification: "review" },
  { category: "summary", type: "removed", classification: "review" },
  { category: "summary", type: "modified", classification: "review" },
];

const ruleMap = new Map<string, ChangeClassification>();
for (const rule of RULES) {
  ruleMap.set(`${rule.category}::${rule.type}`, rule.classification);
}

export function classifyChange(
  category: ChangeCategory,
  type: ChangeType
): ChangeClassification {
  return ruleMap.get(`${category}::${type}`) ?? "review";
}

export function partitionChanges<
  T extends { readonly classification: ChangeClassification },
>(changes: readonly T[]): {
  readonly auto: readonly T[];
  readonly review: readonly T[];
} {
  const auto = changes.filter((c) => c.classification === "auto");
  const review = changes.filter((c) => c.classification === "review");
  return { auto, review };
}
