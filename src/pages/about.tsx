import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import React from "react";
import HeadWithMetas from "@/components/HeadWithMetas";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <Layout className="bg-purple-50 min-h-screen">
      <HeadWithMetas
        title="About | Uday Vatti"
        description="Senior Web Developer & Designer crafting performant, accessible digital experiences with React, Next.js, and TypeScript"
        url="https://udayvatti.com/about"
        image="/images/uv-port.png"
      />
      <Container className="">
        <div className="py-20 md:py-32">
          <div className="max-w-4xl">
            {/* Introduction */}
            <div className="mb-16">
              <Typography
                variant="h5"
                fontWeight="semibold"
                className="mb-6 text-purple-600 tracking-wide uppercase"
                fontFamily="mono"
              >
                Nice to meet you
              </Typography>
              <Typography
                variant="h3"
                className="!leading-tight mb-8 text-purple-800"
                fontWeight="bold"
                fontFamily="display"
              >
                I'm Uday — a web developer and designer crafting thoughtful
                digital experiences
              </Typography>
              <Typography
                variant="p"
                fontWeight="normal"
                className="text-lg text-purple-600 leading-relaxed mb-4"
                fontFamily="primary"
              >
                With 9+ years of experience, I specialize in React, Next.js, and
                TypeScript. At Labelbox, I lead web development across marketing
                websites and evaluation studio.
              </Typography>
              <a
                href="/resume-august-2025.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-800 text-purple-200 rounded-lg hover:rounded-3xl hover:bg-purple-800/90 transition-all duration-300 ease-in-out mb-8 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                View Resume
              </a>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="">
                  <Typography
                    variant="h6"
                    className="mb-4 text-purple-800"
                    fontWeight="semibold"
                    fontFamily="display"
                  >
                    What I Do
                  </Typography>
                  <ul className="space-y-3 text-purple-600">
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-purple-800 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        UI/UX design in Figma and design systems
                      </Typography>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-purple-800 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Component architecture and development
                      </Typography>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-purple-800 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Performance optimization and monitoring
                      </Typography>
                    </li>
                  </ul>
                </div>
                <div>
                  <Typography
                    variant="h6"
                    className="mb-4 text-purple-800"
                    fontWeight="semibold"
                    fontFamily="display"
                  >
                    Recent Projects
                  </Typography>
                  <ul className="space-y-3 text-purple-600">
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-purple-800 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Labelbox Evaluation Studio
                      </Typography>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-purple-800 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Next.js App Router implementation
                      </Typography>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-purple-800 rounded-full"></span>
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
                className="mb-6 text-purple-800"
                fontWeight="semibold"
                fontFamily="display"
              >
                Beyond Code
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Typography
                  variant="p"
                  className="text-base text-purple-600 leading-relaxed"
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
                  className="text-base text-purple-600 leading-relaxed"
                  fontFamily="primary"
                >
                  Photography is my creative outlet — I love capturing light,
                  motion, and moments, whether it's automotive shots,
                  landscapes, or candid street scenes.
                </Typography>
              </div>
            </div>

            {/* Contact */}
            <div className="border-t border-purple-200 pt-8">
              <Typography
                variant="p"
                className="text-xl text-purple-600 leading-relaxed"
                fontFamily="primary"
              >
                I believe the best digital experiences are built with a blend of
                <b> curiosity</b> and <b>craft</b>. If you're tackling an
                ambitious project where every detail matters, I'd love to help
                bring it to life.
              </Typography>
              <a
                href="mailto:hello@udayvatti.com"
                className="inline-block mt-8 text-purple-800 hover:text-purple-800/90 border-b-2 border-purple-800 pb-1 hover:opacity-80 transition-opacity"
              >
                Let's Talk
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
