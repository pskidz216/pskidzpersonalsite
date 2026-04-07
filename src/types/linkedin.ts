import { z } from "zod";

// --- Snapshot status ---

export const SnapshotStatus = z.enum([
  "pending_review",
  "applied",
  "dismissed",
]);
export type SnapshotStatus = z.infer<typeof SnapshotStatus>;

// --- Proxycurl raw response shapes ---

export const ProxycurlCertificationSchema = z.object({
  name: z.string().nullable(),
  authority: z.string().nullable(),
  display_source: z.string().nullable(),
  license_number: z.string().nullable(),
  starts_at: z
    .object({
      day: z.number().nullable(),
      month: z.number().nullable(),
      year: z.number().nullable(),
    })
    .nullable(),
  ends_at: z
    .object({
      day: z.number().nullable(),
      month: z.number().nullable(),
      year: z.number().nullable(),
    })
    .nullable(),
  url: z.string().nullable(),
});
export type ProxycurlCertification = z.infer<
  typeof ProxycurlCertificationSchema
>;

export const ProxycurlExperienceSchema = z.object({
  starts_at: z
    .object({
      day: z.number().nullable(),
      month: z.number().nullable(),
      year: z.number().nullable(),
    })
    .nullable(),
  ends_at: z
    .object({
      day: z.number().nullable(),
      month: z.number().nullable(),
      year: z.number().nullable(),
    })
    .nullable(),
  company: z.string().nullable(),
  company_linkedin_profile_url: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  location: z.string().nullable(),
  logo_url: z.string().nullable(),
});
export type ProxycurlExperience = z.infer<typeof ProxycurlExperienceSchema>;

export const ProxycurlProfileSchema = z.object({
  public_identifier: z.string().nullable().optional(),
  full_name: z.string().nullable().optional(),
  headline: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  certifications: z.array(ProxycurlCertificationSchema).default([]),
  experiences: z.array(ProxycurlExperienceSchema).default([]),
  skills: z.array(z.string()).default([]),
});
export type ProxycurlProfile = z.infer<typeof ProxycurlProfileSchema>;

// --- Parsed / normalized shapes (match site data.ts interfaces) ---

export const ParsedCertificationSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  credentialId: z.string().optional(),
});
export type ParsedCertification = z.infer<typeof ParsedCertificationSchema>;

export const ParsedExperienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  dateRange: z.string(),
  description: z.string(),
  location: z.string().optional(),
});
export type ParsedExperience = z.infer<typeof ParsedExperienceSchema>;

export const LinkedInSnapshotDataSchema = z.object({
  certifications: z.array(ParsedCertificationSchema),
  experiences: z.array(ParsedExperienceSchema),
  skills: z.array(z.string()),
  headline: z.string().optional(),
  summary: z.string().optional(),
  capturedAt: z.string(),
});
export type LinkedInSnapshotData = z.infer<typeof LinkedInSnapshotDataSchema>;

// --- Change detection ---

export const ChangeType = z.enum(["added", "removed", "modified"]);
export type ChangeType = z.infer<typeof ChangeType>;

export const ChangeCategory = z.enum([
  "certification",
  "experience",
  "skill",
  "headline",
  "summary",
]);
export type ChangeCategory = z.infer<typeof ChangeCategory>;

export const ChangeClassification = z.enum(["auto", "review"]);
export type ChangeClassification = z.infer<typeof ChangeClassification>;

export const DetectedChangeSchema = z.object({
  id: z.string(),
  type: ChangeType,
  category: ChangeCategory,
  classification: ChangeClassification,
  description: z.string(),
  previousValue: z.unknown().optional(),
  newValue: z.unknown().optional(),
});
export type DetectedChange = z.infer<typeof DetectedChangeSchema>;

// --- Database row ---

export const LinkedInSnapshotRowSchema = z.object({
  id: z.string().uuid(),
  profile_url: z.string(),
  snapshot_data: LinkedInSnapshotDataSchema,
  captured_at: z.string(),
  changes_detected: z.array(DetectedChangeSchema),
  status: SnapshotStatus,
});
export type LinkedInSnapshotRow = z.infer<typeof LinkedInSnapshotRowSchema>;

// --- Pipeline result ---

export const PipelineResultSchema = z.object({
  success: z.boolean(),
  snapshotId: z.string().optional(),
  changesDetected: z.number(),
  autoApplied: z.number(),
  pendingReview: z.number(),
  error: z.string().optional(),
});
export type PipelineResult = z.infer<typeof PipelineResultSchema>;
