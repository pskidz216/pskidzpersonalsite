import { reelBand } from "@/lib/data";
import { LoopingReel } from "@/components/ui/LoopingReel";

/** Full-width strip of Paul's weekly BoldX reels: the part, then the mission. */
export function ReelBand() {
  return (
    <section className="rd-reels" aria-label="Weekly cinematic reels">
      <div className="rd-reels_head">
        <div>
          <span className="rd-data rd-reels_eyebrow">{reelBand.eyebrow}</span>
          <h2 className="rd-reels_title">{reelBand.title}</h2>
        </div>
        <div className="rd-reels_side">
          <p>{reelBand.sub}</p>
          <a className="rd-btn-coral" href={reelBand.cta.href}>
            {reelBand.cta.label}
          </a>
        </div>
      </div>
      <div className="rd-reels_strip">
        {reelBand.tiles.map((tile, i) => (
          <figure
            key={tile.video}
            className={`rd-reels_tile${tile.onPhone ? "" : " rd-reels_tile--desktop"}`}
          >
            <LoopingReel src={tile.video} poster={tile.poster} label={tile.alt} preload="none" />
            <figcaption className="rd-data">
              <span className="rd-reels_num">{String(i + 1).padStart(2, "0")} </span>
              {tile.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
