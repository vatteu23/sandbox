import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import React from "react";
import HeadWithMetas from "@/components/HeadWithMetas";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import Eyebrow from "@/components/Eyebrow";

const About = () => {
  return (
    <Layout className="bg-neutral-950 min-h-screen">
      <HeadWithMetas
        title="About | Uday Vatti"
        description="Senior Web Developer & Designer crafting performant, accessible digital experiences with React, Next.js, and TypeScript"
        url="https://udayvatti.com/about"
        image="/images/uv-port.png"
      />
      <Container className="">
        <div className="py-20 md:py-32 flex flex-col md:flex-row gap-y-12 md:gap-x-6 lg:gap-12">
          <div className="md:sticky md:top-[90px] w-full md:w-1/3 lg:w-1/4 h-fit  rounded-xl hover:rounded-3xl transition-all duration-300 ease-in-out  overflow-hidden group">
            <div className="bg-purple-300 mb-1">
              <div className="rounded-xl overflow-hidden">
                <div className="h-28 bg-purple-200"></div>
                <img
                  src="/images/picofme-4.png"
                  alt="Uday Vatti"
                  className="rounded-full max-w-36 mr-auto ml-4 -mt-24 rotate-12 group-hover:rotate-0 transition-all duration-300 ease-in-out"
                />
              </div>
              <div className="p-4">
                <Typography
                  variant="h5"
                  fontWeight="semibold"
                  className="mb-3 text-purple-900 tracking-wide "
                  fontFamily="mono"
                >
                  Uday Vatti
                </Typography>
                <Typography variant="p" className="text-purple-900">
                  Sr. Web Developer and Designer at{" "}
                  <Link
                    href="https://www.labelbox.com/"
                    className="text-purple-950 hover:text-purple-800/90 transition-all duration-300 ease-in-out underline"
                  >
                    Labelbox
                  </Link>
                </Typography>
              </div>
            </div>

            <div className="p-4 bg-purple-300 mb-1">
              <Typography
                variant="p"
                className="text-purple-900 flex items-center gap-2"
              >
                <FiMapPin className="w-4 h-4" /> San Francisco, CA
              </Typography>
            </div>
            <div className="p-4 flex flex-wrap flex-row gap-4 bg-purple-300">
              <Link
                href="mailto:vuday23@gmail.com"
                className="text-purple-900 hover:text-purple-800 transition-all duration-300 ease-in-out underline font-mono"
              >
                Email
              </Link>
              <Link
                href="https://www.linkedin.com/in/vattiu/"
                target="_blank"
                className="text-purple-900 hover:text-purple-800 transition-all duration-300 ease-in-out underline font-mono"
              >
                LinkedIn
              </Link>
            </div>
          </div>

          <div className="md:w-2/3 lg:w-3/4 max-w-4xl">
            {/* Introduction */}
            <div className="mb-16">
              <Eyebrow>
                Nice to meet you
              </Eyebrow>
              <Typography
                variant="h3"
                className="!leading-tight mb-8 text-purple-300"
                fontWeight="bold"
                fontFamily="display"
              >
                I'm Uday — a web developer and designer crafting thoughtful
                digital experiences
              </Typography>
              <Typography
                variant="p"
                fontWeight="normal"
                className="text-lg text-purple-200 leading-relaxed mb-4"
                fontFamily="primary"
              >
                With 9+ years of experience, I specialize in React, Next.js, and
                TypeScript. At Labelbox, I lead web development across marketing
                websites and evaluation studio.
              </Typography>
              <a
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-800 text-purple-50 rounded-lg hover:rounded-3xl hover:bg-purple-300 hover:text-purple-800 transition-all duration-300 ease-in-out mb-8 font-medium"
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
                    className="mb-4 text-purple-200 "
                    fontWeight="semibold"
                    fontFamily="primary"
                  >
                    What I Do
                  </Typography>
                  <ul className="space-y-3 text-purple-300">
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-purple-200 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        UI/UX design in Figma and design systems
                      </Typography>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-purple-200 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Component architecture and development
                      </Typography>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-purple-200 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Performance optimization and monitoring
                      </Typography>
                    </li>
                  </ul>
                </div>
                <div>
                  <Typography
                    variant="h6"
                    className="mb-4 text-purple-200"
                    fontWeight="semibold"
                    fontFamily="primary"
                  >
                    Recent Projects
                  </Typography>
                  <ul className="space-y-3 text-purple-300">
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-purple-200 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Labelbox Evaluation Studio
                      </Typography>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-purple-200 rounded-full"></span>
                      <Typography variant="p" className="text-base">
                        Next.js App Router implementation
                      </Typography>
                    </li>
                    <li className="flex items-start">
                      <span className="block w-2 h-2 mt-2 mr-3 bg-purple-200 rounded-full"></span>
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
                className="mb-6 text-purple-200"
                fontWeight="semibold"
                fontFamily="primary"
              >
                Beyond Code
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Typography
                  variant="p"
                  className="text-base text-purple-300 leading-relaxed"
                  fontFamily="primary"
                >
                  Outside of work, cars are what I like to talk about. How
                  they're built, why some feel special, what makes people
                  obsess over them. It's the kind of stuff I can go on about
                  for hours.
                </Typography>
                <Typography
                  variant="p"
                  className="text-base text-purple-300 leading-relaxed"
                  fontFamily="primary"
                >
                  Photography is my way of slowing down. Whether it's a car
                  meet, a walk through the city, or just chasing good light, I
                  like capturing small moments.
                </Typography>
              </div>
            </div>

            {/* Contact */}
            <div className="border-t border-purple-200 pt-8">
              <Typography
                variant="p"
                className="text-xl text-purple-300 leading-relaxed"
                fontFamily="primary"
              >
                I believe the best digital experiences are built with a blend of
                <b> curiosity</b> and <b>craft</b>. If you're tackling an
                ambitious project where every detail matters, I'd love to help
                bring it to life.
              </Typography>
              <a
                href="mailto:vuday23@gmail.com"
                className="inline-block mt-8 text-purple-200 hover:text-purple-300 border-b-2 border-purple-300 pb-1 hover:opacity-80 transition-opacity"
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
