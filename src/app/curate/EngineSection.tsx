import { MorningList } from "./MorningList";
import { curatePlan } from "./content";

/** The Ramp-style outbound engine: eight steps, a working sample of the morning list, guardrails and the scoreboard. */
export function EngineSection() {
  const e = curatePlan.engine;
  return (
    <section
      id="outbound-engine"
      className="px-6 md:px-12 lg:px-20 py-16 md:py-24 bg-bg-dark text-text-inverse scroll-mt-8"
      aria-labelledby="h-engine"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10 md:mb-14">
          <span className="block w-1.5 h-1.5 rounded-full bg-accent-coral" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">{e.label}</span>
          <span className="h-[1px] flex-1 bg-white/15" aria-hidden />
        </div>

        <div className="grid md:grid-cols-[1fr_1fr] gap-6 md:gap-16 md:items-end mb-12 md:mb-16">
          <h2
            id="h-engine"
            className="font-heading font-black tracking-[-0.03em] leading-[0.95] [text-wrap:balance] m-0"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
          >
            {e.title}
          </h2>
          <p className="font-body text-lg leading-relaxed text-white/75 m-0 max-w-xl">{e.intro}</p>
        </div>

        <ol className="m-0 p-0 list-none grid sm:grid-cols-2 lg:grid-cols-4 border-t border-white/15">
          {e.steps.map((step, i) => (
            <li key={step.title} className="py-6 pr-6 border-b border-white/15 lg:[&:nth-child(n+5)]:border-b-0">
              <span className="block font-heading font-black text-2xl tracking-[-0.02em] tabular-nums text-accent-coral mb-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-body font-semibold text-lg leading-snug mb-1.5">{step.title}</h3>
              <p className="font-body text-[15px] leading-relaxed text-white/70 m-0">{step.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 md:mt-20">
          <MorningList label={e.sample.label} title={e.sample.title} rows={e.sample.rows} />
        </div>

        <ul className="m-0 p-0 list-none flex flex-wrap gap-2 mt-8">
          {e.guardrails.map((g) => (
            <li
              key={g}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] px-3 py-2 border border-white/20 rounded-full text-white/80"
            >
              <span className="block w-1.5 h-1.5 bg-accent-teal" aria-hidden />
              {g}
            </li>
          ))}
        </ul>

        <div className="mt-14 md:mt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted mb-5">{e.scoreboard.label}</p>
          <dl className="m-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8">
            {e.scoreboard.items.map((item) => (
              <div key={item.metric} className="border-l border-white/15 pl-4 md:pl-6 pr-4">
                <dt className="font-heading font-bold text-xl tracking-[-0.02em] leading-tight mb-2">{item.metric}</dt>
                <dd className="m-0 font-body text-[15px] leading-relaxed text-white/70">{item.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
