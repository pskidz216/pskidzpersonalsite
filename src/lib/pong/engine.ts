/**
 * Pure Pong engine — no DOM, no canvas, no side effects.
 * Every function returns a new state object (immutability rule).
 * Rendering + input live in components/game/PongOverlay.tsx.
 */

export interface PongConfig {
  width: number;
  height: number;
  paddleWidth: number;
  paddleHeight: number;
  ballRadius: number;
  /** Left edge of the player paddle. */
  playerX: number;
  /** Left edge of the AI paddle. */
  aiX: number;
  /** Paddle speed while chasing an incoming ball. */
  aiMaxSpeed: number;
  /**
   * Paddle speed while drifting back to center after the ball turns away.
   * Without this the AI simply shadows the ball forever and is unbeatable —
   * resetting between volleys is what gives a sharp return somewhere to land.
   */
  aiRecenterSpeed: number;
  initialBallSpeed: number;
  /** Multiplier applied on every paddle hit. */
  speedIncrement: number;
  maxBallSpeed: number;
  roundSeconds: number;
  /**
   * Min serve angle off horizontal, radians. A perfectly flat serve down the
   * center line rallies forever — both paddles sit at center and neither can
   * ever miss — so a serve always carries at least this much angle.
   */
  minServeAngle: number;
  /** Max serve angle off horizontal, radians. */
  maxServeAngle: number;
  /** Max deflection angle off horizontal on a paddle edge hit, radians. */
  maxBounceAngle: number;
}

export const DEFAULT_PONG_CONFIG: PongConfig = {
  width: 1000,
  height: 600,
  paddleWidth: 14,
  paddleHeight: 90,
  // Big enough to carry a face and still read at a glance. Raising this makes
  // the game easier for both paddles, so re-check the balance test if you move it.
  ballRadius: 34,
  playerX: 36,
  aiX: 1000 - 36 - 14,
  // Tuned by simulation (see pongRound.test.ts): a sharp player takes ~6 goals
  // in a round, a casual one ~3, and an idle one gets buried.
  aiMaxSpeed: 200,
  aiRecenterSpeed: 130,
  initialBallSpeed: 500,
  speedIncrement: 1.06,
  maxBallSpeed: 900,
  roundSeconds: 30,
  minServeAngle: Math.PI / 14,
  maxServeAngle: Math.PI / 5,
  maxBounceAngle: Math.PI / 3.4,
};

export interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface PongState {
  ball: Ball;
  playerY: number;
  aiY: number;
  playerScore: number;
  aiScore: number;
  timeLeft: number;
  over: boolean;
}

export interface PongInput {
  /** Desired player paddle center Y, in court coordinates. */
  targetY: number;
}

type Rand = () => number;

export function createPongState(config: PongConfig): PongState {
  return {
    ball: { x: config.width / 2, y: config.height / 2, vx: 0, vy: 0 },
    playerY: config.height / 2,
    aiY: config.height / 2,
    playerScore: 0,
    aiScore: 0,
    timeLeft: config.roundSeconds,
    over: false,
  };
}

/** Serve from center toward `dir` (+1 = right/AI, -1 = left/player). */
export function servePongBall(
  state: PongState,
  config: PongConfig,
  dir: 1 | -1,
  rand: Rand = Math.random,
): PongState {
  const spread = rand() * 2 - 1; // -1 … 1
  const up = spread < 0 ? -1 : 1;
  const angle =
    up *
    (config.minServeAngle +
      Math.abs(spread) * (config.maxServeAngle - config.minServeAngle));
  return {
    ...state,
    ball: {
      x: config.width / 2,
      y: config.height / 2,
      vx: Math.cos(angle) * config.initialBallSpeed * dir,
      vy: Math.sin(angle) * config.initialBallSpeed,
    },
  };
}

function clampPaddle(y: number, config: PongConfig): number {
  const half = config.paddleHeight / 2;
  return Math.min(Math.max(y, half), config.height - half);
}

function capSpeed(vx: number, vy: number, max: number): [number, number] {
  const speed = Math.hypot(vx, vy);
  if (speed <= max) return [vx, vy];
  const k = max / speed;
  return [vx * k, vy * k];
}

/**
 * Reflect the ball off a paddle. The return angle is driven by where the
 * ball struck the paddle — center is flat, edges are steep — which is the
 * whole skill of Pong.
 */
function paddleBounce(
  ball: Ball,
  paddleY: number,
  dir: 1 | -1,
  config: PongConfig,
): Ball {
  const offset = (ball.y - paddleY) / (config.paddleHeight / 2);
  const clamped = Math.min(Math.max(offset, -1), 1);
  const angle = clamped * config.maxBounceAngle;
  const speed = Math.hypot(ball.vx, ball.vy) * config.speedIncrement;
  const [vx, vy] = capSpeed(
    Math.cos(angle) * speed * dir,
    Math.sin(angle) * speed,
    config.maxBallSpeed,
  );
  return { ...ball, vx, vy };
}

export function stepPong(
  state: PongState,
  config: PongConfig,
  dt: number,
  input: PongInput,
  rand: Rand = Math.random,
): PongState {
  if (state.over) return state;

  const timeLeft = Math.max(0, state.timeLeft - dt);
  const playerY = clampPaddle(input.targetY, config);

  // AI chases an incoming ball; once the ball turns away it drifts back to
  // center, slowly. Both speeds are capped so it stays beatable.
  const incoming = state.ball.vx > 0;
  const aiGoal = incoming ? state.ball.y : config.height / 2;
  const aiSpeed = incoming ? config.aiMaxSpeed : config.aiRecenterSpeed;
  const aiDelta = aiGoal - state.aiY;
  const aiStep = Math.min(Math.abs(aiDelta), aiSpeed * dt);
  const aiY = clampPaddle(state.aiY + Math.sign(aiDelta) * aiStep, config);

  const prev = state.ball;
  let ball: Ball = {
    ...prev,
    x: prev.x + prev.vx * dt,
    y: prev.y + prev.vy * dt,
  };

  // Paddles are tested as a swept crossing of the paddle face, not as an
  // overlap with a band: at full speed the ball covers more ground per frame
  // than the band is wide, so an overlap test lets it tunnel straight through.
  const reach = config.paddleHeight / 2 + config.ballRadius;
  const crossingY = (face: number): number => {
    const span = prev.x - ball.x;
    const t = span === 0 ? 0 : (prev.x - face) / span;
    return prev.y + (ball.y - prev.y) * Math.min(Math.max(t, 0), 1);
  };

  const playerFace = config.playerX + config.paddleWidth + config.ballRadius;
  if (prev.vx < 0 && prev.x > playerFace && ball.x <= playerFace) {
    const hitY = crossingY(playerFace);
    if (Math.abs(hitY - playerY) <= reach) {
      ball = paddleBounce({ ...ball, x: playerFace, y: hitY }, playerY, 1, config);
    }
  }

  const aiFace = config.aiX - config.ballRadius;
  if (prev.vx > 0 && prev.x < aiFace && ball.x >= aiFace) {
    const hitY = crossingY(aiFace);
    if (Math.abs(hitY - aiY) <= reach) {
      ball = paddleBounce({ ...ball, x: aiFace, y: hitY }, aiY, -1, config);
    }
  }

  // Walls.
  if (ball.y < config.ballRadius) {
    ball = { ...ball, y: config.ballRadius, vy: Math.abs(ball.vy) };
  } else if (ball.y > config.height - config.ballRadius) {
    ball = { ...ball, y: config.height - config.ballRadius, vy: -Math.abs(ball.vy) };
  }

  let { playerScore, aiScore } = state;
  let scored: 1 | -1 | 0 = 0;
  if (ball.x < -config.ballRadius) {
    aiScore += 1;
    scored = -1; // player conceded → serve toward player
  } else if (ball.x > config.width + config.ballRadius) {
    playerScore += 1;
    scored = 1;
  }

  const next: PongState = {
    ball,
    playerY,
    aiY,
    playerScore,
    aiScore,
    timeLeft,
    over: timeLeft <= 0,
  };

  return scored === 0 ? next : servePongBall(next, config, scored, rand);
}
