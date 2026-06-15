export type DensityPreset = {
  maxNodes: number;
  maxEdges: number;
};

export const densityByBreakpoint = {
  mobile: {
    maxNodes: 7,
    maxEdges: 10,
  },
  tablet: {
    maxNodes: 12,
    maxEdges: 18,
  },
  desktop: {
    maxNodes: 18,
    maxEdges: 28,
  },
} as const satisfies Record<"mobile" | "tablet" | "desktop", DensityPreset>;

export type DensityControls = {
  showPractices: boolean;
  showEvidence: boolean;
};
