import Container from "@/components/Container";
import Layout from "@/components/Layout";
import React from "react";
import HeadWithMetas from "@/components/HeadWithMetas";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const About = () => {
  return (
    <Layout className="bg-white dark:bg-neutral-950 min-h-screen">
      <HeadWithMetas
        title="About | Uday Vatti"
        description="Sr. Design Engineer with 9+ years building the gap between Figma and production — design systems, motion, and full-stack platforms at Labelbox."
        url="https://udayvatti.com/about"
        image="/images/uv-port.png"
      />

      <Container>
        {/* Page-level two columns — card sticks through both hero and story */}
        <div className="flex flex-col md:flex-row md:items-start gap-y-10 md:gap-x-6 lg:gap-16">
          {/* Left: all content */}
          <div className=" min-w-0">
            {/* Hero */}
            <div className="pt-32 pb-16 md:pt-40 md:pb-20 border-b border-neutral-100 dark:border-neutral-900">
              <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-8">
                About
              </p>
              <h1
                className="font-display leading-[0.92] tracking-tight text-neutral-900 dark:text-neutral-100 mb-8"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Uday Vatti
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed mb-8">
                I build digital experiences during the week and study cars on
                the weekends. Both are about understanding form, function, and
                the details that make something memorable.
              </p>
              <div className="flex flex-wrap gap-6">
                <a
                  href="https://www.linkedin.com/in/vattiu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:opacity-50 transition-opacity"
                >
                  Get in touch →
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  Resume →
                </a>
              </div>
            </div>

            {/* Story */}
            <div className="py-20 md:py-24 max-w-2xl space-y-12">
              <div className="space-y-6">
                <p className="text-[1.0625rem] text-neutral-700 dark:text-neutral-200 leading-[1.8]">
                  I started out building things for the web — backends,
                  databases, eventually UIs. At some point I got obsessed with
                  the part that most engineers hand off: the last mile between a
                  design file and what a real person actually uses. That gap is
                  where I've lived ever since.
                </p>
                <p className="text-[1.0625rem] text-neutral-600 dark:text-neutral-300 leading-[1.8]">
                  At Labelbox I own multiple systems end-to-end — labelbox.com,
                  alignerr.com, a design system, an auth SDK, an ML evaluation
                  product, and a handful of internal tools. I design in Figma,
                  build in Next.js, ship to GCP, and care about how the final
                  thing moves and feels just as much as whether the API is
                  efficient.
                </p>
                <p className="text-[1.0625rem] text-neutral-600 dark:text-neutral-300 leading-[1.8]">
                  What drives me is the belief that great products don't come
                  from design and engineering working in sequence — they come
                  from people who can hold both at the same time. I've built
                  things that looked good but didn't work, and things that
                  worked but felt wrong. The goal is always both.
                </p>
              </div>

              {/* Beyond work */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                    Outside Work
                  </span>
                  <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
                </div>
                <div className="space-y-5">
                  <p className="text-[1.0625rem] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Cars are my other obsession. Not just driving them — the
                    engineering, the design philosophy, why certain cars feel
                    special and others don't despite the same spec sheet. It's
                    the same question I ask about software.
                  </p>
                  <p className="text-[1.0625rem] text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Photography is how I slow down. I shoot mostly in San
                    Francisco — car meets, city light, whatever catches my eye.
                    It's the same instinct as design: noticing what makes
                    something worth looking at.
                  </p>
                </div>
              </div>

              {/* Closing CTA */}
              <div className="border-t border-neutral-100 dark:border-neutral-800 pt-10">
                <p className="text-[1.0625rem] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                  If you're building something where the design and the code
                  both need to be right — I'd like to hear about it.
                </p>
                <a
                  href="https://www.linkedin.com/in/vattiu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 border-b border-neutral-300 dark:border-neutral-700 pb-0.5 hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors"
                >
                  Get in touch
                  <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: profile card — sticky for the entire page */}
          <div className="md:sticky md:top-[90px] w-full md:w-64 lg:w-72 h-fit flex-shrink-0 md:mt-40 rounded-lg overflow-hidden border border-neutral-100 dark:border-neutral-800">
            <div className="bg-neutral-50 dark:bg-neutral-900 overflow-hidden border-b border-neutral-100 dark:border-neutral-800">
              <div className="h-20 bg-neutral-200 dark:bg-neutral-800" />
              <img
                src="/images/picofme-4.png"
                alt="Uday Vatti"
                className="rounded-full max-w-24 ml-4 -mt-16 border-2 border-white dark:border-neutral-950 grayscale"
              />
              <div className="p-4 pt-3">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Sr. Design Engineer at{" "}
                  <Link
                    href="https://www.labelbox.com/"
                    target="_blank"
                    className="text-neutral-900 dark:text-neutral-100 hover:opacity-60 transition-opacity underline"
                  >
                    Labelbox
                  </Link>
                </p>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-900 flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800">
              <FiMapPin className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
              <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                San Francisco, CA
              </p>
            </div>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-900 flex flex-wrap gap-4">
              <a
                href="mailto:vuday23@gmail.com"
                className="text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors underline underline-offset-2"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/vattiu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors underline underline-offset-2"
              >
                LinkedIn
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                className="text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors underline underline-offset-2"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </Layout>
  );
};

export default About;
