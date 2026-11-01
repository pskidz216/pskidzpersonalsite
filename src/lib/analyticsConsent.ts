export type Consent = "accepted" | "declined";

export const CONSENT_KEY = "ps-analytics-consent";

export interface ConsentStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/** The visitor's saved choice, or null if undecided or storage is unavailable. */
export function readConsent(storage: ConsentStorage | null): Consent | null {
  if (!storage) return null;
  try {
    const value = storage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

/** Saves the choice; false means storage refused it and it lasts only this visit. */
export function writeConsent(storage: ConsentStorage | null, consent: Consent): boolean {
  if (!storage) return false;
  try {
    storage.setItem(CONSENT_KEY, consent);
    return true;
  } catch {
    return false;
  }
}
