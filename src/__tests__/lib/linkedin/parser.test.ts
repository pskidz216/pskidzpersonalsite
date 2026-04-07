import { describe, it, expect } from "vitest";
import {
  parseCertification,
  parseExperience,
  parseProfile,
} from "@/lib/linkedin/parser";
import type {
  ProxycurlCertification,
  ProxycurlExperience,
  ProxycurlProfile,
} from "@/types/linkedin";

describe("parseCertification", () => {
  it("returns null when name is missing", () => {
    const raw: ProxycurlCertification = {
      name: null,
      authority: "Google",
      display_source: null,
      license_number: null,
      starts_at: null,
      ends_at: null,
      url: null,
    };
    expect(parseCertification(raw)).toBeNull();
  });

  it("parses a full certification with all fields", () => {
    const raw: ProxycurlCertification = {
      name: "Cloud Engineer",
      authority: "Google",
      display_source: null,
      license_number: "ABC123",
      starts_at: { day: 1, month: 3, year: 2024 },
      ends_at: null,
      url: null,
    };
    const result = parseCertification(raw);
    expect(result).toEqual({
      name: "Cloud Engineer",
      issuer: "Google",
      date: "Mar 2024",
      credentialId: "ABC123",
    });
  });

  it("uses 'Unknown' for missing authority", () => {
    const raw: ProxycurlCertification = {
      name: "Some Cert",
      authority: null,
      display_source: null,
      license_number: null,
      starts_at: { day: null, month: null, year: 2023 },
      ends_at: null,
      url: null,
    };
    const result = parseCertification(raw);
    expect(result?.issuer).toBe("Unknown");
    expect(result?.date).toBe("2023");
  });

  it("omits credentialId when license_number is null", () => {
    const raw: ProxycurlCertification = {
      name: "Test Cert",
      authority: "Test Issuer",
      display_source: null,
      license_number: null,
      starts_at: { day: 15, month: 6, year: 2022 },
      ends_at: null,
      url: null,
    };
    const result = parseCertification(raw);
    expect(result).toBeDefined();
    expect(result?.credentialId).toBeUndefined();
  });

  it("returns 'Unknown' date when starts_at is null", () => {
    const raw: ProxycurlCertification = {
      name: "No Date Cert",
      authority: "Issuer",
      display_source: null,
      license_number: null,
      starts_at: null,
      ends_at: null,
      url: null,
    };
    const result = parseCertification(raw);
    expect(result?.date).toBe("Unknown");
  });
});

describe("parseExperience", () => {
  it("returns null when title is missing", () => {
    const raw: ProxycurlExperience = {
      starts_at: null,
      ends_at: null,
      company: "Acme",
      company_linkedin_profile_url: null,
      title: null,
      description: null,
      location: null,
      logo_url: null,
    };
    expect(parseExperience(raw)).toBeNull();
  });

  it("returns null when company is missing", () => {
    const raw: ProxycurlExperience = {
      starts_at: null,
      ends_at: null,
      company: null,
      company_linkedin_profile_url: null,
      title: "Engineer",
      description: null,
      location: null,
      logo_url: null,
    };
    expect(parseExperience(raw)).toBeNull();
  });

  it("parses a full experience entry", () => {
    const raw: ProxycurlExperience = {
      starts_at: { day: 1, month: 1, year: 2020 },
      ends_at: { day: null, month: 6, year: 2023 },
      company: "Acme Corp",
      company_linkedin_profile_url: null,
      title: "Senior Dev",
      description: "Built things",
      location: "Miami, FL",
      logo_url: null,
    };
    const result = parseExperience(raw);
    expect(result).toEqual({
      id: "acme-corp",
      company: "Acme Corp",
      role: "Senior Dev",
      dateRange: "Jan 2020 — Jun 2023",
      description: "Built things",
      location: "Miami, FL",
    });
  });

  it("shows Present when ends_at is null", () => {
    const raw: ProxycurlExperience = {
      starts_at: { day: 1, month: 3, year: 2025 },
      ends_at: null,
      company: "Current Co",
      company_linkedin_profile_url: null,
      title: "VP",
      description: "",
      location: null,
      logo_url: null,
    };
    const result = parseExperience(raw);
    expect(result?.dateRange).toBe("Mar 2025 — Present");
  });
});

describe("parseProfile", () => {
  it("parses a complete Proxycurl profile into snapshot data", () => {
    const raw: ProxycurlProfile = {
      public_identifier: "paul-skidmore",
      full_name: "Paul Skidmore",
      headline: "VP Sales & Marketing",
      summary: "Builder",
      certifications: [
        {
          name: "Claude 101",
          authority: "Anthropic",
          display_source: null,
          license_number: "abc",
          starts_at: { day: 1, month: 4, year: 2026 },
          ends_at: null,
          url: null,
        },
      ],
      experiences: [
        {
          starts_at: { day: 1, month: 1, year: 2025 },
          ends_at: null,
          company: "BoldX",
          company_linkedin_profile_url: null,
          title: "VP",
          description: "Leading sales",
          location: "FL",
          logo_url: null,
        },
      ],
      skills: ["Sales", "Marketing"],
    };

    const result = parseProfile(raw);
    expect(result.certifications).toHaveLength(1);
    expect(result.certifications[0].name).toBe("Claude 101");
    expect(result.experiences).toHaveLength(1);
    expect(result.experiences[0].company).toBe("BoldX");
    expect(result.skills).toEqual(["Sales", "Marketing"]);
    expect(result.headline).toBe("VP Sales & Marketing");
    expect(result.capturedAt).toBeDefined();
  });

  it("handles empty arrays", () => {
    const raw: ProxycurlProfile = {
      certifications: [],
      experiences: [],
      skills: [],
    };
    const result = parseProfile(raw);
    expect(result.certifications).toHaveLength(0);
    expect(result.experiences).toHaveLength(0);
    expect(result.skills).toHaveLength(0);
  });

  it("filters out entries with null names", () => {
    const raw: ProxycurlProfile = {
      certifications: [
        {
          name: null,
          authority: "Test",
          display_source: null,
          license_number: null,
          starts_at: null,
          ends_at: null,
          url: null,
        },
        {
          name: "Valid",
          authority: "Issuer",
          display_source: null,
          license_number: null,
          starts_at: null,
          ends_at: null,
          url: null,
        },
      ],
      experiences: [],
      skills: [],
    };
    const result = parseProfile(raw);
    expect(result.certifications).toHaveLength(1);
    expect(result.certifications[0].name).toBe("Valid");
  });
});
