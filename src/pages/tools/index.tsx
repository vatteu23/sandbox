import Container from "@/components/Container";
import Layout from "@/components/Layout";
import HeadWithMetas from "@/components/HeadWithMetas";
import Footer from "@/components/Footer";
import ToolsHero from "@/tools/components/hub/ToolsHero";
import ToolCard from "@/tools/components/hub/ToolCard";
import { TOOLS } from "@/tools/registry";
import type { ToolDefinition } from "@/tools/types";

function ToolSection({ label, tools }: { label: string; tools: ToolDefinition[] }) {
  if (tools.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
          {label}
        </span>
        <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool, index) => (
          <ToolCard key={tool.slug} tool={tool} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function ToolsIndexPage() {
  const availableTools = TOOLS.filter((tool) => tool.status === "available");
  const comingSoonTools = TOOLS.filter((tool) => tool.status === "coming-soon");

  return (
    <Layout className="bg-white dark:bg-neutral-950 min-h-screen" showAssistant={false}>
      <HeadWithMetas
        title="Tools | Uday Vatti"
        description="High-quality, day-to-day utilities for engineering, design, and architecture analysis."
        url="https://udayvatti.com/tools"
        image="/images/uv-port.png"
      />

      <div className="pt-32 pb-20 md:pt-40 md:pb-24">
        <Container>
          <ToolsHero />

          <ToolSection label="Available" tools={availableTools} />
          <ToolSection label="Coming soon" tools={comingSoonTools} />
        </Container>
      </div>

      <Footer />
    </Layout>
  );
}
