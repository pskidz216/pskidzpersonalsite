import type {
  ProxycurlProfile,
  ProxycurlCertification,
  ProxycurlExperience,
  ParsedCertification,
  ParsedExperience,
  LinkedInSnapshotData,
} from "@/types/linkedin";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(
  dateObj: { day?: number | null; month?: number | null; year?: number | null } | null
): string {
  if (!dateObj || !dateObj.year) return "Unknown";
  const month =
    dateObj.month && dateObj.month >= 1 && dateObj.month <= 12
      ? MONTHS[dateObj.month - 1]
      : null;
  return month ? `${month} ${dateObj.year}` : `${dateObj.year}`;
}

function formatDateRange(
  start: { day?: number | null; month?: number | null; year?: number | null } | null,
  end: { day?: number | null; month?: number | null; year?: number | null } | null
): string {
  const startStr = formatDate(start);
  const endStr = end && end.year ? formatDate(end) : "Present";
  return `${startStr} — ${endStr}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function parseCertification(
  raw: ProxycurlCertification
): ParsedCertification | null {
  if (!raw.name) return null;

  return {
    name: raw.name,
    issuer: raw.authority ?? "Unknown",
    date: formatDate(raw.starts_at),
    ...(raw.license_number ? { credentialId: raw.license_number } : {}),
  };
}

export function parseExperience(
  raw: ProxycurlExperience
): ParsedExperience | null {
  if (!raw.title || !raw.company) return null;

  return {
    id: slugify(raw.company),
    company: raw.company,
    role: raw.title,
    dateRange: formatDateRange(raw.starts_at, raw.ends_at),
    description: raw.description ?? "",
    ...(raw.location ? { location: raw.location } : {}),
  };
}

export function parseProfile(raw: ProxycurlProfile): LinkedInSnapshotData {
  const certifications = raw.certifications
    .map(parseCertification)
    .filter((c): c is ParsedCertification => c !== null);

  const experiences = raw.experiences
    .map(parseExperience)
    .filter((e): e is ParsedExperience => e !== null);

  const skills = [...raw.skills];

  return {
    certifications,
    experiences,
    skills,
    headline: raw.headline ?? undefined,
    summary: raw.summary ?? undefined,
    capturedAt: new Date().toISOString(),
  };
}
