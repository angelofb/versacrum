export interface ImageOptions {
  responsive: {
    widths: readonly number[];
    formats: {
      avif: { quality: number; effort: number };
      webp: { quality: number };
      jpg: { quality: number; mozjpeg: boolean };
    };
  };
  og: {
    width: number;
    height: number;
    fit: "cover";
    position: "centre";
    jpg: { quality: number };
  };
  appleIcon: { width: number; height: number };
}

export const imageOptions = {
  responsive: {
    widths: [480, 800, 1200, 1600],
    formats: {
      avif: { quality: 52, effort: 4 },
      webp: { quality: 78 },
      jpg: { quality: 80, mozjpeg: true },
    },
  },
  og: {
    width: 1200,
    height: 630,
    fit: "cover",
    position: "centre",
    jpg: { quality: 85 },
  },
  appleIcon: { width: 180, height: 180 },
} as const satisfies ImageOptions;
