import { useParams } from "next/navigation";
import { Freelance, handleUrlClick, PorjectProps, Porjects } from "..";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import Container from "@/components/Container";
import HeadWithMetas from "@/components/HeadWithMetas";
import Footer from "@/components/Footer";

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
        {/* Project Header */}
        <div className=" p-8 py-6 border-b border-purple-200 bg-purple-50/30 backdrop-blur-2xl ">
          <div className="flex flex-col md:flex-row gap-y-3 items-start justify-between md:mt-8">
            <div>
              <Typography
                variant="h3"
                fontWeight="light"
                className="text-purple-800 mb-2 font-mono uppercase tracking-tighter"
                fontFamily="primary"
              >
                {work.name}
              </Typography>
              <Typography
                variant="h6"
                className="text-purple-600 mb-2"
                fontFamily="primary"
              >
                {work.role}
              </Typography>
              <Typography
                variant="p"
                className="text-purple-600"
                fontFamily="primary"
              >
                {work.year}
              </Typography>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUrlClick(work.link)}
                className="bg-purple-800 text-purple-200 px-6 py-2 rounded-lg hover:rounded-3xl hover:bg-purple-800/90 transition-all duration-300 ease-in-out font-medium"
              >
                Visit Website ↗
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8 mt-6 p-8">
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
                      <span dangerouslySetInnerHTML={{ __html: achievement }} />
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
