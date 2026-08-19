/**
 * Miami wall-clock math. Pure functions — the ticking lives in
 * components/ui/MiamiClock.tsx.
 */

const MIAMI_TZ = "America/New_York";

export interface MiamiClock {
  hours12: number;
  hours24: number;
  minutes: number;
  seconds: number;
  ms: number;
  meridiem: "AM" | "PM";
  /** "EDT" or "EST" */
  tz: string;
  /** Zero-padded "hh:mm:ss" in 12-hour time. */
  display: string;
}

const partsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: MIAMI_TZ,
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZoneName: "short",
});

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function getMiamiClock(date: Date): MiamiClock {
  const parts = partsFormatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? "";

  // hour12:false can yield "24" for midnight in some ICU versions.
  const hours24 = Number(get("hour")) % 24;
  const minutes = Number(get("minute"));
  const seconds = Number(get("second"));
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const meridiem: "AM" | "PM" = hours24 < 12 ? "AM" : "PM";

  return {
    hours12,
    hours24,
    minutes,
    seconds,
    ms: date.getMilliseconds(),
    meridiem,
    tz: get("timeZoneName"),
    display: `${pad(hours12)}:${pad(minutes)}:${pad(seconds)}`,
  };
}

export interface ClockAngles {
  hourDeg: number;
  minuteDeg: number;
  secondDeg: number;
}

/** Hand angles in degrees clockwise from 12. Second hand sweeps with ms. */
export function clockAngles(time: {
  hours12: number;
  minutes: number;
  seconds: number;
  ms: number;
}): ClockAngles {
  const s = time.seconds + time.ms / 1000;
  const m = time.minutes + s / 60;
  const h = (time.hours12 % 12) + m / 60;
  return {
    hourDeg: h * 30,
    minuteDeg: m * 6,
    secondDeg: s * 6,
  };
}
