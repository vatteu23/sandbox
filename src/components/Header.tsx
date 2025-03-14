import { cn } from "@/functions/cn";
import React from "react";
import Container from "./Container";
import Button from "./Button";

interface ContainerProps {
  className?: string;
  bgColor?: string;
  lightText?: boolean;
}

const Header: React.FC<ContainerProps> = ({
  className,
  bgColor,
  lightText,
}) => {
  return (
    <div className={cn("sticky top-0 bg-center bg-orange-500 z-50", className)}>
      <Container className="py-4 flex flex-row justify-between">
        <Button
          href="/"
          className=" text-2xl 
          hover:bg-amber-300 hover:px-2
          transition-all duration-300 ease-in-out
        "
          color="light"
        >
          UV
        </Button>
        <div className="flex gap-x-2 md:gap-x-4">
          <Button
            size="sm"
            variant="text"
            color="dark"
            href="/photography"
            className="hover:bg-amber-300 transition-all duration-300 ease-in-out px-2 py-1 hover:px-4"
          >
            Photography
          </Button>
          <Button
            size="sm"
            color="dark"
            href="https://www.linkedin.com/in/vattiu/"
            target="_blank"
            className="hover:bg-amber-300 transition-all duration-300 ease-in-out px-2 py-1 hover:px-4"
          >
            Get in touch
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Header;
