import { describe, it, expect } from "vitest";
import {
  DEFAULT_PONG_CONFIG as CFG,
  createPongState,
  servePongBall,
  stepPong,
  type PongState,
} from "@/lib/pong/engine";

/**
 * Integration: drive a whole 30-second round at 60fps the same way the
 * rAF loop in PongOverlay does, with a scripted "player" that tracks the
 * ball. The browser pane can't run rAF, so this is what proves the loop
 * terminates and stays inside the court.
 */
/**
 * `tracking` 1 = paddle glued to the ball, 0 = frozen at center.
 * `aim` is the offset (px) the player deliberately puts between the paddle
 * center and the ball — hitting off-center is how a return gets its angle,
 * so an aiming player is the only one who can actually beat the AI.
 */
function playRound(tracking: number, aim = 0, seed = 0.5): PongState {
  const dt = 1 / 60;
  let s = servePongBall(createPongState(CFG), CFG, 1, () => seed);
  let guard = 0;

  while (!s.over && guard < 60 * CFG.roundSeconds + 10) {
    const wanted = s.ball.y - aim;
    const targetY = s.playerY + (wanted - s.playerY) * tracking;
    s = stepPong(s, CFG, dt, { targetY }, () => seed);
    guard += 1;
  }
  return s;
}

describe("a full round", () => {
  it("ends after roundSeconds of stepping", () => {
    const s = playRound(0.35);
    expect(s.over).toBe(true);
    expect(s.timeLeft).toBe(0);
  });

  it("keeps the ball inside the court the whole way through", () => {
    const dt = 1 / 60;
    let s = servePongBall(createPongState(CFG), CFG, 1, () => 0.5);
    while (!s.over) {
      s = stepPong(s, CFG, dt, { targetY: s.ball.y }, () => 0.5);
      expect(s.ball.y).toBeGreaterThanOrEqual(0);
      expect(s.ball.y).toBeLessThanOrEqual(CFG.height);
      expect(s.playerY).toBeGreaterThanOrEqual(CFG.paddleHeight / 2);
      expect(s.playerY).toBeLessThanOrEqual(CFG.height - CFG.paddleHeight / 2);
    }
  });

  it("is winnable — a player who aims with the paddle edge beats the AI", () => {
    const s = playRound(1, 34);
    expect(s.playerScore).toBeGreaterThan(s.aiScore);
  });

  it("is losable — a frozen player concedes", () => {
    const s = playRound(0);
    expect(s.aiScore).toBeGreaterThan(0);
  });

  it("is worth playing — a sharp player banks several goals in one round", () => {
    // Guards the difficulty tuning in DEFAULT_PONG_CONFIG. A round that ends
    // 0-0 is a boring round, and that is what these numbers were tuned away
    // from; averaged over serves so one unlucky seed can't flip it.
    const seeds = [0.1, 0.25, 0.4, 0.55, 0.7, 0.85];
    const total = seeds.reduce((sum, seed) => sum + playRound(1, 34, seed).playerScore, 0);
    expect(total / seeds.length).toBeGreaterThanOrEqual(3);
  });

  it("buries a player who never moves", () => {
    const s = playRound(0);
    expect(s.aiScore).toBeGreaterThan(10);
  });

  it("stays a stalemate for a player who only ever returns dead-center", () => {
    // Canonical Pong: a flat return gives the AI nothing to miss. This is the
    // reason `aim` above matters — it is the whole skill of the game.
    const s = playRound(1, 0);
    expect(s.playerScore).toBe(0);
    expect(s.aiScore).toBe(0);
  });

  it("never exceeds the ball speed cap", () => {
    const dt = 1 / 60;
    let s = servePongBall(createPongState(CFG), CFG, 1, () => 0.5);
    while (!s.over) {
      s = stepPong(s, CFG, dt, { targetY: s.ball.y }, () => 0.5);
      expect(Math.hypot(s.ball.vx, s.ball.vy)).toBeLessThanOrEqual(
        CFG.maxBallSpeed + 1e-6,
      );
    }
  });

  it("survives a long frame without tunnelling through a paddle", () => {
    // A backgrounded tab resumes with a big gap; the loop clamps dt to 1/30.
    const dt = 1 / 30;
    let s = servePongBall(createPongState(CFG), CFG, 1, () => 0.5);
    for (let i = 0; i < 400 && !s.over; i += 1) {
      s = stepPong(s, CFG, dt, { targetY: s.ball.y }, () => 0.5);
      expect(s.ball.x).toBeGreaterThan(-CFG.width);
      expect(s.ball.x).toBeLessThan(CFG.width * 2);
    }
  });
});
