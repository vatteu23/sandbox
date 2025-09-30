import { useParams } from "next/navigation";
import { Freelance, handleUrlClick, PorjectProps, Porjects } from "..";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import Container from "@/components/Container";
import HeadWithMetas from "@/components/HeadWithMetas";
import Footer from "@/components/Footer";
import { FiCalendar } from "react-icons/fi";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const Work = ({ work }: { work: PorjectProps | null }) => {
  if (!work) {
    return <div>Work not found</div>;
  }
  return (
    <Layout className="bg-purple-50 min-h-screen">
      <HeadWithMetas
        title={work.name + " | " + work.role}
        description={work.role || "Web Developer and Designer"}
        url={`https://udayvatti.com/work/${work.id}`}
        image="/images/uv-port.png"
      />
      <Container className=" py-20">
       
        <div className="flex flex-col md:flex-row gap-y-12 md:gap-x-6 lg:gap-12 relative">
          <div className="md:sticky md:top-[90px] w-full md:w-1/3 lg:w-1/4 h-fit  rounded-xl hover:rounded-3xl transition-all duration-300 ease-in-out  overflow-hidden group">
            <div className="bg-purple-100 mb-1">
            
              <div className="p-4">
                <Typography
                  variant="h3"
                  fontWeight="semibold"
                  className="mb-3 text-purple-600 tracking-wide  "
                  fontFamily="mono"
                >
                    {work.name}
                </Typography>
                <Typography variant="p" className="text-purple-600">
                  {work.role}
                
                </Typography>
              </div>
            </div>

            <div className="p-4 bg-purple-100 mb-1">
              <Typography
                variant="p"
                className="text-purple-600 flex items-center gap-2"
              >
                <FiCalendar className="w-4 h-4" /> {work.year}
              </Typography>
            </div>
            <Link className="group flex p-4  items-center justify-start gap-4 bg-purple-800 hover:bg-purple-800/90 transition-all duration-300 ease-in-out hover:rounded-[40px] text-purple-200" href={work.link} target="_blank">
            Visit Website <ArrowTopRightOnSquareIcon className="w-5 h-5 " />
            </Link>
          </div>
          <div className="md:w-2/3 lg:w-3/4 max-w-2xl space-y-8 py-4">
            {/* Description */}
            <div>
              <Typography
                variant="h6"
                fontWeight="bold"
                className="text-purple-800 mb-3"
                fontFamily="primary"
              >
                Overview
              </Typography>
              <Typography
                variant="p"
                className="text-purple-600 leading-relaxed"
                fontFamily="primary"
              >
                {work.description}
              </Typography>
            </div>

            {/* Key Achievements */}
            {work.achievements && (
              <div>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="text-purple-800 mb-4"
                  fontFamily="primary"
                >
                  Key Achievements
                </Typography>
                <div className="grid gap-3">
                  {work.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-800 rounded-full mt-2 flex-shrink-0"></div>
                      <Typography
                        variant="p"
                        className="text-purple-600"
                        fontFamily="primary"
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: achievement }}
                        />
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {work.technologies && (
              <div>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="text-purple-800 mb-4"
                  fontFamily="primary"
                >
                  Technologies Used
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {work.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-800 rounded-full text-sm text-purple-200 font-medium font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Team Size */}
            {work.teamSize && (
              <div>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="text-purple-800 mb-2"
                  fontFamily="primary"
                >
                  Team Collaboration
                </Typography>
                <Typography
                  variant="p"
                  className="text-purple-600"
                  fontFamily="primary"
                >
                  {work.teamSize}
                </Typography>
              </div>
            )}

            {/* Project Highlights */}
            {work.highlights && (
              <div>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="text-purple-800 mb-4"
                  fontFamily="primary"
                >
                  Project Highlights
                </Typography>
                <div className="grid gap-3">
                  {work.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-800 rounded-full mt-2 flex-shrink-0"></div>
                      <Typography
                        variant="p"
                        className="text-purple-600"
                        fontFamily="primary"
                      >
                        {highlight}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      ...Porjects.map((work) => ({ params: { id: work.id } })),
      ...Freelance.map((work) => ({ params: { id: work.id } })),
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const work =
    Porjects.find((work) => work.id === params.id) ||
    Freelance.find((work) => work.id === params.id);
  return {
    props: {
      work: work,
    },
  };
}

export default Work;
