/**
 * Off-the-clock activities shown on the homepage rotator.
 * Content carried over from the pre-redesign OffTheClock section.
 */
export const OFF_CLOCK_ACTIVITIES: readonly string[] = [
  "Chasing the sunrise",
  "On the paddle board",
  "First one at the coffee shop",
  "Outside every chance I get",
  "In the gym",
  "Deep in a good book",
  "Locked into a podcast",
  "Dropping into Fortnite",
  "Spending time with family",
];

export function nextActivityIndex(current: number, length: number): number {
  if (length <= 1) return 0;
  return (current + 1) % length;
}
