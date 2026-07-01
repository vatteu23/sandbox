import Container from "@/components/Container";
import Layout from "@/components/Layout";
import HeadWithMetas from "@/components/HeadWithMetas";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { useRouter } from "next/router";
import { getToolBySlug } from "@/tools/registry";
import ToolShell from "@/tools/components/shell/ToolShell";

function ToolLoadingFallback() {
  return (
    <div className="h-96 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-900" />
  );
}

export default function ToolSlugPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";
  const tool = slug ? getToolBySlug(slug) : undefined;

  if (!router.isReady) {
    return (
      <Layout className="bg-white dark:bg-neutral-950 min-h-screen" showAssistant={false}>
        <HeadWithMetas title="Loading… | Tools" description="" url="/tools" />
        <Container className="pt-32 pb-20">
          <ToolLoadingFallback />
        </Container>
      </Layout>
    );
  }

  if (!tool) {
    return (
      <Layout className="bg-white dark:bg-neutral-950 min-h-screen" showAssistant={false}>
        <HeadWithMetas title="Tool not found | Tools" description="" url="/tools" noIndex />
        <Container className="pt-32 pb-20 md:pt-40">
          <ToolShell
            eyebrow="Tools"
            title="Tool not found"
            description="That tool doesn't exist. Head back to browse what's available."
          >
            <a
              href="/tools"
              className="inline-flex text-sm font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              ← All tools
            </a>
          </ToolShell>
        </Container>
        <Footer />
      </Layout>
    );
  }

  const ToolComponent = tool.component;
  const isComingSoon = tool.status === "coming-soon";

  const renderTool = () => {
    const content = isComingSoon ? (
      <ToolShell eyebrow="Tools" title={tool.title} description={tool.description} clientSideOnly={tool.clientSideOnly}>
        <Suspense fallback={<ToolLoadingFallback />}>
          <ToolComponent />
        </Suspense>
      </ToolShell>
    ) : (
      <Suspense fallback={<ToolLoadingFallback />}>
        <ToolComponent />
      </Suspense>
    );

    return tool.fullBleed ? content : <Container>{content}</Container>;
  };

  return (
    <Layout className="bg-white dark:bg-neutral-950 min-h-screen" showAssistant={false}>
      <HeadWithMetas
        title={tool.meta.title}
        description={tool.meta.description}
        url={`https://udayvatti.com/tools/${tool.slug}`}
        image="/images/uv-port.png"
        noIndex={isComingSoon}
      />

      <div
        className={
          tool.fullBleed
            ? "h-[calc(100dvh-3.5rem)] min-h-[calc(100dvh-3.5rem)]"
            : "pt-32 pb-20 md:pt-40 md:pb-24"
        }
      >
        {renderTool()}
      </div>

      {!tool.fullBleed && <Footer />}
    </Layout>
  );
}
