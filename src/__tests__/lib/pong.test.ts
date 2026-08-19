import { describe, it, expect } from "vitest";
import {
  DEFAULT_PONG_CONFIG as CFG,
  createPongState,
  servePongBall,
  stepPong,
} from "@/lib/pong/engine";

const fixedRand = (v: number) => () => v;

describe("createPongState", () => {
  it("centers the ball and both paddles", () => {
    const s = createPongState(CFG);
    expect(s.ball.x).toBe(CFG.width / 2);
    expect(s.ball.y).toBe(CFG.height / 2);
    expect(s.playerY).toBe(CFG.height / 2);
    expect(s.aiY).toBe(CFG.height / 2);
  });

  it("starts with zero scores, full clock, idle ball", () => {
    const s = createPongState(CFG);
    expect(s.playerScore).toBe(0);
    expect(s.aiScore).toBe(0);
    expect(s.timeLeft).toBe(CFG.roundSeconds);
    expect(s.ball.vx).toBe(0);
    expect(s.ball.vy).toBe(0);
    expect(s.over).toBe(false);
  });
});

describe("servePongBall", () => {
  it("serves toward the given direction at initial speed", () => {
    const s = servePongBall(createPongState(CFG), CFG, 1, fixedRand(0.5));
    expect(s.ball.vx).toBeGreaterThan(0);
    const speed = Math.hypot(s.ball.vx, s.ball.vy);
    expect(speed).toBeCloseTo(CFG.initialBallSpeed, 5);
  });

  it("never serves flat — a center-line rally can never be won", () => {
    for (const r of [0, 0.25, 0.5, 0.75, 1]) {
      const s = servePongBall(createPongState(CFG), CFG, 1, fixedRand(r));
      const angle = Math.abs(Math.atan2(s.ball.vy, s.ball.vx));
      expect(angle).toBeGreaterThanOrEqual(CFG.minServeAngle - 1e-9);
      expect(angle).toBeLessThanOrEqual(CFG.maxServeAngle + 1e-9);
    }
  });

  it("serves both up and down depending on the roll", () => {
    const down = servePongBall(createPongState(CFG), CFG, 1, fixedRand(0.9));
    const up = servePongBall(createPongState(CFG), CFG, 1, fixedRand(0.1));
    expect(down.ball.vy).toBeGreaterThan(0);
    expect(up.ball.vy).toBeLessThan(0);
  });

  it("does not mutate the previous state", () => {
    const before = createPongState(CFG);
    servePongBall(before, CFG, -1, fixedRand(0.2));
    expect(before.ball.vx).toBe(0);
  });
});

describe("stepPong — motion & walls", () => {
  it("advances the ball by velocity * dt", () => {
    const s0 = servePongBall(createPongState(CFG), CFG, 1, fixedRand(0.5));
    const s1 = stepPong(s0, CFG, 0.1, { targetY: CFG.height / 2 });
    expect(s1.ball.x).toBeCloseTo(s0.ball.x + s0.ball.vx * 0.1, 5);
  });

  it("reflects off the top wall", () => {
    const s0 = {
      ...createPongState(CFG),
      ball: { x: CFG.width / 2, y: CFG.ballRadius + 1, vx: 0, vy: -200 },
    };
    const s1 = stepPong(s0, CFG, 0.05, { targetY: CFG.height / 2 });
    expect(s1.ball.vy).toBeGreaterThan(0);
    expect(s1.ball.y).toBeGreaterThanOrEqual(CFG.ballRadius);
  });

  it("reflects off the bottom wall", () => {
    const s0 = {
      ...createPongState(CFG),
      ball: { x: CFG.width / 2, y: CFG.height - CFG.ballRadius - 1, vx: 0, vy: 200 },
    };
    const s1 = stepPong(s0, CFG, 0.05, { targetY: CFG.height / 2 });
    expect(s1.ball.vy).toBeLessThan(0);
  });
});

describe("stepPong — paddles", () => {
  it("bounces off the player paddle and speeds up", () => {
    const s0 = {
      ...createPongState(CFG),
      ball: {
        x: CFG.playerX + CFG.paddleWidth + CFG.ballRadius + 1,
        y: CFG.height / 2,
        vx: -CFG.initialBallSpeed,
        vy: 0,
      },
    };
    const s1 = stepPong(s0, CFG, 0.05, { targetY: CFG.height / 2 });
    expect(s1.ball.vx).toBeGreaterThan(0);
    const speed = Math.hypot(s1.ball.vx, s1.ball.vy);
    expect(speed).toBeGreaterThan(CFG.initialBallSpeed);
  });

  it("angles the return by hit offset on the paddle", () => {
    const s0 = {
      ...createPongState(CFG),
      playerY: CFG.height / 2,
      ball: {
        x: CFG.playerX + CFG.paddleWidth + CFG.ballRadius + 1,
        y: CFG.height / 2 - CFG.paddleHeight * 0.4,
        vx: -CFG.initialBallSpeed,
        vy: 0,
      },
    };
    const s1 = stepPong(s0, CFG, 0.05, { targetY: s0.playerY });
    expect(s1.ball.vy).toBeLessThan(0); // hit above center → upward return
  });

  it("catches a full-speed ball that clears the paddle band in one frame", () => {
    // 900px/s across a 1/30s frame moves 30px — wider than the paddle itself,
    // so an overlap test would let this ball tunnel through and score.
    const s0 = {
      ...createPongState(CFG),
      playerY: CFG.height / 2,
      ball: {
        x: CFG.playerX + CFG.paddleWidth + CFG.ballRadius + 4,
        y: CFG.height / 2,
        vx: -CFG.maxBallSpeed,
        vy: 0,
      },
    };
    const s1 = stepPong(s0, CFG, 1 / 30, { targetY: CFG.height / 2 });
    expect(s1.ball.vx).toBeGreaterThan(0);
    expect(s1.aiScore).toBe(0);
  });

  it("still lets a ball past a paddle that is out of position", () => {
    const s0 = {
      ...createPongState(CFG),
      playerY: CFG.height - CFG.paddleHeight / 2,
      ball: {
        x: CFG.playerX + CFG.paddleWidth + CFG.ballRadius + 4,
        y: CFG.height / 2,
        vx: -CFG.maxBallSpeed,
        vy: 0,
      },
    };
    const s1 = stepPong(s0, CFG, 1 / 30, { targetY: CFG.height - CFG.paddleHeight / 2 });
    expect(s1.ball.vx).toBeLessThan(0);
  });

  it("caps ball speed at maxBallSpeed", () => {
    let s = {
      ...createPongState(CFG),
      ball: {
        x: CFG.playerX + CFG.paddleWidth + CFG.ballRadius + 1,
        y: CFG.height / 2,
        vx: -CFG.maxBallSpeed,
        vy: 0,
      },
    };
    s = stepPong(s, CFG, 0.05, { targetY: CFG.height / 2 });
    expect(Math.hypot(s.ball.vx, s.ball.vy)).toBeLessThanOrEqual(CFG.maxBallSpeed + 1e-6);
  });

  it("moves the AI paddle toward the ball at capped speed", () => {
    const s0 = {
      ...createPongState(CFG),
      aiY: 100,
      ball: { x: CFG.width / 2, y: 400, vx: 100, vy: 0 },
    };
    const s1 = stepPong(s0, CFG, 0.1, { targetY: CFG.height / 2 });
    expect(s1.aiY).toBeGreaterThan(100);
    expect(s1.aiY - 100).toBeLessThanOrEqual(CFG.aiMaxSpeed * 0.1 + 1e-6);
  });

  it("drifts the AI paddle back to center once the ball turns away", () => {
    const s0 = {
      ...createPongState(CFG),
      aiY: 500,
      ball: { x: CFG.width / 2, y: 560, vx: -400, vy: 0 }, // heading away
    };
    const s1 = stepPong(s0, CFG, 0.1, { targetY: CFG.height / 2 });
    expect(s1.aiY).toBeLessThan(500); // toward center, not toward the ball
    expect(500 - s1.aiY).toBeLessThanOrEqual(CFG.aiRecenterSpeed * 0.1 + 1e-6);
  });

  it("clamps the player paddle inside the court", () => {
    const s1 = stepPong(createPongState(CFG), CFG, 0.016, { targetY: -500 });
    expect(s1.playerY).toBeGreaterThanOrEqual(CFG.paddleHeight / 2);
  });
});

describe("stepPong — scoring & clock", () => {
  it("scores for the AI when the ball exits left, then re-serves", () => {
    const s0 = {
      ...createPongState(CFG),
      // Already past the paddle, one frame short of clearing the goal line.
      ball: { x: -CFG.ballRadius + 5, y: CFG.height / 2, vx: -600, vy: 0 },
    };
    const s1 = stepPong(s0, CFG, 0.05, { targetY: CFG.height / 2 }, fixedRand(0.5));
    expect(s1.aiScore).toBe(1);
    expect(s1.ball.x).toBe(CFG.width / 2);
  });

  it("scores for the player when the ball exits right", () => {
    const s0 = {
      ...createPongState(CFG),
      ball: { x: CFG.width + CFG.ballRadius - 5, y: CFG.height / 2, vx: 600, vy: 0 },
    };
    const s1 = stepPong(s0, CFG, 0.05, { targetY: CFG.height / 2 }, fixedRand(0.5));
    expect(s1.playerScore).toBe(1);
  });

  it("counts the clock down and ends the round at zero", () => {
    const s0 = { ...createPongState(CFG), timeLeft: 0.05 };
    const s1 = stepPong(s0, CFG, 0.1, { targetY: CFG.height / 2 });
    expect(s1.timeLeft).toBe(0);
    expect(s1.over).toBe(true);
  });

  it("does nothing once the round is over", () => {
    const s0 = { ...createPongState(CFG), over: true, timeLeft: 0 };
    const s1 = stepPong(s0, CFG, 0.1, { targetY: 0 });
    expect(s1).toEqual(s0);
  });

  it("never mutates the input state", () => {
    const s0 = servePongBall(createPongState(CFG), CFG, 1, fixedRand(0.5));
    const snapshot = JSON.parse(JSON.stringify(s0));
    stepPong(s0, CFG, 0.1, { targetY: 10 });
    expect(s0).toEqual(snapshot);
  });
});
