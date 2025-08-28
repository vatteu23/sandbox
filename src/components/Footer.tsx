import { cn } from "@/functions/cn";
import React from "react";
import Container from "./Container";
import Button from "./Button";
import Typography from "./Typography";
import Link from "next/link";

interface ContainerProps {
  className?: string;
  bgColor?: string;
  lightText?: boolean;
}

const Footer: React.FC<ContainerProps> = ({
  className,
  bgColor,
  lightText,
}) => {
  return (
    <div>
      {/* Figma-style CTA section */}
      <div className="py-20 bg-purple-900">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Typography
              variant="h2"
              fontWeight="light"
              className="text-purple-200 mb-6"
              fontFamily="primary"
            >
              Let's work together
            </Typography>
            <Typography
              variant="h6"
              className="text-purple-100 mb-8 leading-relaxed"
              fontFamily="primary"
              fontWeight="light"
            >
              Interested in collaborating on your next project? I'd love to hear
              about your ideas and help bring them to life.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/vattiu/"
                className="bg-purple-50 text-purple-800 px-8 py-3 rounded-lg font-medium hover:bg-purple-200  transition-all duration-300 ease-in-out hover:rounded-3xl inline-block"
              >
                Get in touch
              </Link>
              <Link
                href="/photography"
                className="border border-purple-200 text-white px-8 py-3 rounded-lg font-medium  hover:bg-purple-200 hover:text-purple-800 ease-in-out hover:rounded-3xl transition-all duration-300 inline-block"
              >
                View photography
              </Link>
              <Link
                href="/resume-august-2025.pdf"
                target="_blank"
                className="border border-purple-200 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-200 hover:text-purple-800 ease-in-out hover:rounded-3xl transition-all duration-300 inline-block"
              >
                View resume
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
