"use client";

import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { KernelSize, ToneMappingMode } from "postprocessing";

/**
 * Whisper postprocessing preset.
 *
 * Minimum-viable pipeline for atmospheric scenes (particles, soft geometry).
 * Subtle Bloom on accent particles + ACES Filmic tone mapping for natural
 * color rolloff. No N8AO (nothing to occlude), no ChromaticAberration
 * (would noise up small points), no SMAA (perf > marginal AA on points).
 *
 * ToneMapping is last — postprocessing v3 requirement.
 */
export function Whisper() {
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom
        mipmapBlur
        intensity={0.22}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.4}
        kernelSize={KernelSize.LARGE}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
