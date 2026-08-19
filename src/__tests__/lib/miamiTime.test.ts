import { describe, it, expect } from "vitest";
import { getMiamiClock, clockAngles } from "@/lib/miamiTime";

describe("getMiamiClock", () => {
  it("converts a UTC instant to Miami wall time (EDT, summer)", () => {
    // 2026-08-19 16:00:00 UTC = 12:00:00 PM in Miami (UTC-4)
    const c = getMiamiClock(new Date("2026-08-19T16:00:00Z"));
    expect(c.hours12).toBe(12);
    expect(c.minutes).toBe(0);
    expect(c.seconds).toBe(0);
    expect(c.meridiem).toBe("PM");
    expect(c.tz).toBe("EDT");
  });

  it("uses EST in winter", () => {
    // 2026-01-15 03:30:45 UTC = 10:30:45 PM Jan 14 in Miami (UTC-5)
    const c = getMiamiClock(new Date("2026-01-15T03:30:45Z"));
    expect(c.hours12).toBe(10);
    expect(c.minutes).toBe(30);
    expect(c.seconds).toBe(45);
    expect(c.meridiem).toBe("PM");
    expect(c.tz).toBe("EST");
  });

  it("renders midnight as 12 AM", () => {
    // 04:00 UTC in summer = 00:00 Miami
    const c = getMiamiClock(new Date("2026-08-19T04:00:00Z"));
    expect(c.hours12).toBe(12);
    expect(c.meridiem).toBe("AM");
  });

  it("provides a zero-padded display string", () => {
    const c = getMiamiClock(new Date("2026-08-19T16:05:07Z"));
    expect(c.display).toBe("12:05:07");
  });
});

describe("clockAngles", () => {
  it("puts all hands at 12 for 12:00:00", () => {
    const a = clockAngles({ hours12: 12, minutes: 0, seconds: 0, ms: 0 });
    expect(a.hourDeg).toBe(0);
    expect(a.minuteDeg).toBe(0);
    expect(a.secondDeg).toBe(0);
  });

  it("puts the hour hand at 90° for 3:00", () => {
    const a = clockAngles({ hours12: 3, minutes: 0, seconds: 0, ms: 0 });
    expect(a.hourDeg).toBe(90);
  });

  it("advances the hour hand fractionally with minutes", () => {
    const a = clockAngles({ hours12: 3, minutes: 30, seconds: 0, ms: 0 });
    expect(a.hourDeg).toBe(105); // 3.5h * 30°
    expect(a.minuteDeg).toBe(180);
  });

  it("sweeps the second hand smoothly with milliseconds", () => {
    const a = clockAngles({ hours12: 12, minutes: 0, seconds: 15, ms: 500 });
    expect(a.secondDeg).toBeCloseTo(93, 5); // 15.5s * 6°
  });
});
