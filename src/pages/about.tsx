import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import React from "react";
import HeadWithMetas from "@/components/HeadWithMetas";

const About = () => {
  return (
    <Layout className="bg-stone-100 min-h-screen">
      <HeadWithMetas
        title="About | Uday Vatti"
        description="Senior Web Developer & Designer crafting performant, accessible digital experiences with React, Next.js, and TypeScript"
        url="https://udayvatti.com/about"
        image="/images/uv-port.png"
      />
      <Container>
        <div className="py-20 md:py-32">
          <div className="max-w-4xl">
            {/* Introduction */}
            <div className="mb-16">
              <Typography
                variant="h5"
                fontWeight="semibold"
                className="mb-6 text-gray-600 tracking-wide uppercase"
                fontFamily="mono"
              >
                Nice to meet you
              </Typography>
              <Typography
                variant="h3"
                className="!leading-tight mb-8 text-gray-900"
                fontWeight="bold"
                fontFamily="display"
              >
                I'm Uday — a web developer and designer crafting thoughtful
                digital experiences
              </Typography>
              <Typography
                variant="p"
                fontWeight="normal"
                className="text-lg text-gray-700 leading-relaxed mb-8"
                fontFamily="primary"
              >
                With 9+ years of experience, I specialize in React, Next.js, and
                TypeScript. At Labelbox, I lead web development across marketing
                websites and evaluation studio.
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <Typography
                    variant="h6"
                    className="mb-4 text-gray-900"
                    fontWeight="semibold"
                    fontFamily="display"
                  >
                    What I Do
                  </Typography>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-gray-400 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        UI/UX design in Figma and design systems
                      </Typography>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-gray-400 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Component architecture and development
                      </Typography>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-gray-400 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Performance optimization and monitoring
                      </Typography>
                    </li>
                  </ul>
                </div>
                <div>
                  <Typography
                    variant="h6"
                    className="mb-4 text-gray-900"
                    fontWeight="semibold"
                    fontFamily="display"
                  >
                    Recent Projects
                  </Typography>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-gray-400 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Labelbox Evaluation Studio
                      </Typography>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-gray-400 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Next.js App Router implementation
                      </Typography>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-gray-400 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Design system with Figma and Tailwind
                      </Typography>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Beyond Code */}
            <div className="mb-16">
              <Typography
                variant="h4"
                className="mb-6 text-gray-900"
                fontWeight="semibold"
                fontFamily="display"
              >
                Beyond Code
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Typography
                  variant="p"
                  className="text-base text-gray-700 leading-relaxed"
                  fontFamily="primary"
                >
                  I'm deeply passionate about cars — from analyzing the
                  engineering behind a well-tuned inline-six to the unique charm
                  of rotary engines. The progression from straight-six
                  smoothness to the distinctive sound of Wankel engines never
                  fails to excite me.
                </Typography>
                <Typography
                  variant="p"
                  className="text-base text-gray-700 leading-relaxed"
                  fontFamily="primary"
                >
                  Photography is my creative outlet — I love capturing light,
                  motion, and moments, whether it's automotive shots,
                  landscapes, or candid street scenes.
                </Typography>
              </div>
            </div>

            {/* Contact */}
            <div className="border-t border-gray-200 pt-8">
              <Typography
                variant="p"
                className="text-xl text-gray-900 leading-relaxed"
                fontFamily="primary"
              >
                I believe the best digital experiences are built with a blend of
                <b> curiosity</b> and <b>craft</b>. If you're tackling an
                ambitious project where every detail matters, I'd love to help
                bring it to life.
              </Typography>
              <a
                href="mailto:hello@udayvatti.com"
                className="inline-block mt-8 text-gray-900 border-b-2 border-gray-900 pb-1 hover:opacity-80 transition-opacity"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default About;
