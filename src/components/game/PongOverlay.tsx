"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DEFAULT_PONG_CONFIG as CFG,
  createPongState,
  servePongBall,
  stepPong,
  type PongState,
} from "@/lib/pong/engine";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BEST_KEY = "psii-pong-best";
const COUNTDOWN_MS = 1800;

const COLORS = {
  line: "rgba(250, 250, 248, 0.14)",
  paddle: "#FAFAF8",
  ball: "#E8735A",
  aiPaddle: "#2D9B9B",
};

/**
 * Square crop of public/images/headshot.jpg centered on the face, in source
 * pixels. The photo is a 2838×2567 half-body shot, so drawing it whole would
 * put a torso in the ball.
 */
const FACE_CROP = { sx: 860, sy: 445, size: 1120 };

type Phase = "ready" | "countdown" | "playing" | "over";

function readBest(): number {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeBest(score: number): void {
  try {
    window.localStorage.setItem(BEST_KEY, String(score));
  } catch {
    /* private mode — best score just doesn't persist */
  }
}

function drawCourt(
  ctx: CanvasRenderingContext2D,
  s: PongState,
  face: HTMLImageElement | null,
) {
  ctx.clearRect(0, 0, CFG.width, CFG.height);

  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 14]);
  ctx.beginPath();
  ctx.moveTo(CFG.width / 2, 0);
  ctx.lineTo(CFG.width / 2, CFG.height);
  ctx.stroke();
  ctx.setLineDash([]);

  const half = CFG.paddleHeight / 2;
  ctx.fillStyle = COLORS.paddle;
  ctx.beginPath();
  ctx.roundRect(CFG.playerX, s.playerY - half, CFG.paddleWidth, CFG.paddleHeight, 7);
  ctx.fill();
  ctx.fillStyle = COLORS.aiPaddle;
  ctx.beginPath();
  ctx.roundRect(CFG.aiX, s.aiY - half, CFG.paddleWidth, CFG.paddleHeight, 7);
  ctx.fill();

  const r = CFG.ballRadius;
  if (face) {
    // Lean into the direction of travel — enough to read as motion, not so
    // much that the face stops being a face.
    const tilt = Math.max(-0.4, Math.min(0.4, s.ball.vy / 1400));
    ctx.save();
    ctx.translate(s.ball.x, s.ball.y);
    ctx.rotate(tilt);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(
      face,
      FACE_CROP.sx,
      FACE_CROP.sy,
      FACE_CROP.size,
      FACE_CROP.size,
      -r,
      -r,
      r * 2,
      r * 2,
    );
    ctx.restore();
    ctx.beginPath();
    ctx.arc(s.ball.x, s.ball.y, r, 0, Math.PI * 2);
    ctx.strokeStyle = COLORS.ball;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  } else {
    ctx.fillStyle = COLORS.ball;
    ctx.beginPath();
    ctx.arc(s.ball.x, s.ball.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function PongOverlay({
  onClose,
  intro = false,
}: {
  onClose: () => void;
  /** True when this opened itself on page load rather than from the pill. */
  intro?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);
  const faceRef = useRef<HTMLImageElement | null>(null);
  const stateRef = useRef<PongState>(createPongState(CFG));
  const targetYRef = useRef(CFG.height / 2);
  const keysRef = useRef({ up: false, down: false });
  const phaseRef = useRef<Phase>("ready");
  const [phase, setPhase] = useState<Phase>("ready");
  const [hud, setHud] = useState({ you: 0, ai: 0, seconds: CFG.roundSeconds });
  // Client-only component, so reading storage during init is safe.
  const [best, setBest] = useState(readBest);
  const [countdown, setCountdown] = useState(3);

  const setPhaseBoth = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  // Load the face once; the game falls back to a coral dot if it fails.
  useEffect(() => {
    const img = new Image();
    img.src = "/images/headshot.jpg";
    img.decoding = "async";
    const onLoad = () => {
      faceRef.current = img;
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx && phaseRef.current !== "playing") {
        drawCourt(ctx, stateRef.current, img);
      }
    };
    img.addEventListener("load", onLoad);
    return () => img.removeEventListener("load", onLoad);
  }, []);

  const startRound = useCallback(() => {
    stateRef.current = servePongBall(createPongState(CFG), CFG, 1);
    setHud({ you: 0, ai: 0, seconds: CFG.roundSeconds });
    setCountdown(3);
    setPhaseBoth("countdown");
    const t0 = performance.now();
    const tick = () => {
      const elapsed = performance.now() - t0;
      if (elapsed >= COUNTDOWN_MS) {
        setPhaseBoth("playing");
        return;
      }
      setCountdown(Math.max(1, Math.ceil((COUNTDOWN_MS - elapsed) / (COUNTDOWN_MS / 3))));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [setPhaseBoth]);

  // Keyboard: ESC leaves, arrows steer, space/enter starts.
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowUp") keysRef.current.up = true;
      if (e.key === "ArrowDown") keysRef.current.down = true;
      if (
        (e.key === " " || e.key === "Enter") &&
        (phaseRef.current === "ready" || phaseRef.current === "over")
      ) {
        startRound();
      }
      if (["ArrowUp", "ArrowDown", " "].includes(e.key)) e.preventDefault();
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") keysRef.current.up = false;
      if (e.key === "ArrowDown") keysRef.current.down = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [onClose, startRound]);

  // A modal that opens on page load must take focus and keep it, or a
  // keyboard user lands on a page they cannot see behind it.
  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null;
    primaryRef.current?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", trap);
      document.body.style.overflow = prevOverflow;
      returnTo?.focus?.();
    };
  }, []);

  // Move focus to whatever the new primary action is between phases.
  useEffect(() => {
    if (phase === "ready" || phase === "over") primaryRef.current?.focus();
  }, [phase]);

  // Game loop.
  useEffect(() => {
    if (phase !== "playing") return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let lastSecond = -1;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      if (keysRef.current.up) targetYRef.current -= 620 * dt;
      if (keysRef.current.down) targetYRef.current += 620 * dt;
      targetYRef.current = Math.min(Math.max(targetYRef.current, 0), CFG.height);

      const next = stepPong(stateRef.current, CFG, dt, {
        targetY: targetYRef.current,
      });
      stateRef.current = next;
      drawCourt(ctx, next, faceRef.current);

      const secs = Math.ceil(next.timeLeft);
      if (secs !== lastSecond) {
        lastSecond = secs;
        setHud({ you: next.playerScore, ai: next.aiScore, seconds: secs });
      }

      if (next.over) {
        setHud({ you: next.playerScore, ai: next.aiScore, seconds: 0 });
        if (next.playerScore > readBest()) {
          writeBest(next.playerScore);
          setBest(next.playerScore);
        }
        setPhaseBoth("over");
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    drawCourt(ctx, stateRef.current, faceRef.current);
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase, setPhaseBoth]);

  // Paint the idle court behind the ready card.
  useEffect(() => {
    if (phase === "playing") return;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawCourt(ctx, stateRef.current, faceRef.current);
  }, [phase]);

  const handlePointer = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetYRef.current = ((e.clientY - rect.top) / rect.height) * CFG.height;
  }, []);

  const won = hud.you > hud.ai;
  const tied = hud.you === hud.ai;
  const showCard = phase === "ready" || phase === "over";

  return (
    <motion.div
      ref={dialogRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease } }}
      transition={{ duration: 0.4, ease }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-bg-dark"
      role="dialog"
      aria-modal="true"
      aria-label="Pong — a 30 second game"
    >
      <div className="absolute top-0 inset-x-0 flex items-start justify-between p-5 md:p-8 text-text-inverse font-mono text-sm">
        <div className="flex items-baseline gap-6 tabular-nums">
          <span>
            <span className="text-text-inverse/50">you </span>
            <span className="text-accent-coral text-2xl font-bold">{hud.you}</span>
          </span>
          <span>
            <span className="text-text-inverse/50">claude </span>
            <span className="text-accent-teal text-2xl font-bold">{hud.ai}</span>
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="tabular-nums text-2xl font-bold" aria-live="polite">
            :{String(hud.seconds).padStart(2, "0")}
          </span>
          <button
            onClick={onClose}
            aria-label={intro ? "Skip intro and view the site" : "Close game"}
            className="w-11 h-11 -m-1 flex items-center justify-center rounded-full text-text-inverse/60 hover:text-text-inverse transition-colors duration-200 active:scale-[0.96]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={CFG.width}
        height={CFG.height}
        onPointerMove={handlePointer}
        onPointerDown={handlePointer}
        className="w-[min(92vw,1100px)] max-h-[70svh] aspect-[5/3] touch-none cursor-none rounded-2xl border border-text-inverse/10"
      />

      <AnimatePresence>
        {phase !== "playing" && (
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease } }}
            transition={{ duration: 0.45, ease }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center bg-bg-dark/70 backdrop-blur-[2px] px-6"
          >
            {phase === "countdown" ? (
              <span
                key={countdown}
                className="font-heading font-black text-accent-coral text-8xl tabular-nums"
              >
                {countdown}
              </span>
            ) : null}

            {showCard && (
              <>
                <h2 className="font-heading font-black text-text-inverse text-4xl md:text-6xl mb-3 text-balance">
                  {phase === "ready" ? (
                    <>
                      Got 30 seconds<span className="text-accent-coral">?</span>
                    </>
                  ) : won ? (
                    <>
                      You win<span className="text-accent-coral">.</span>
                    </>
                  ) : tied ? (
                    <>
                      Dead heat<span className="text-accent-teal">.</span>
                    </>
                  ) : (
                    <>
                      Claude wins<span className="text-accent-teal">.</span>
                    </>
                  )}
                </h2>
                <p className="font-body text-text-inverse/60 mb-8 max-w-md mx-auto text-pretty">
                  {phase === "ready"
                    ? "Pong, except the ball is my face. Mouse, touch, or arrow keys — or head straight to the site."
                    : `Final score ${hud.you}–${hud.ai}. Best run: ${best}.`}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    ref={primaryRef}
                    onClick={startRound}
                    className="px-8 py-3.5 rounded-full bg-accent-coral text-text-inverse font-body font-semibold transition-[scale,background-color] duration-200 hover:bg-accent-coral-light active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse"
                  >
                    {phase === "ready" ? "Play" : "Run it back"}
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3.5 rounded-full text-text-inverse/60 font-body hover:text-text-inverse transition-colors duration-200 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse"
                  >
                    {intro ? "Skip to the site" : "Back to work"}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
