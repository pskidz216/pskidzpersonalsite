import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Paul Skidmore",
    short_name: "Paul Skidmore",
    description: "Revenue operator and brand builder, Miami.",
    start_url: "/",
    display: "browser",
    background_color: "#FAFAF8",
    theme_color: "#FAFAF8",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
