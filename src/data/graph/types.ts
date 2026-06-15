export type GraphNodeCategory =
  | "identity"
  | "domain"
  | "practice"
  | "evidence";

export type GraphNodeEvidence = {
  projectId: string;
  title: string;
  detail: string;
  href?: string;
};

export type GraphNodeExperiment = {
  title: string;
  detail: string;
};

export type GraphNode = {
  id: string;
  title: string;
  category: GraphNodeCategory;
  summary: string;
  philosophy: string;
  relatedNodes: string[];
  examples: GraphNodeEvidence[];
  experiments: GraphNodeExperiment[];
  position: {
    x: number;
    y: number;
  };
};

export type GraphEdge = {
  id: string;
  source: string;
  target: string;
  reason: string;
};

export type GraphSearchItem = {
  id: string;
  title: string;
  summary: string;
  type: "node" | "project" | "path";
  href?: string;
};

export type GraphPathStep = {
  nodeId: string;
  label: string;
  reason: string;
};

export type GraphPathEvidence = {
  projectId: string;
  title: string;
  href: string;
  summary: string;
};

export type GraphPath = {
  id: string;
  title: string;
  whyItMatters: string;
  startNodeId: string;
  endNodeId: string;
  steps: GraphPathStep[];
  evidence: GraphPathEvidence[];
};
