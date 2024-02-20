'use client';
import Container from "@/components/Container";
import GrainyBackgroundSVG from "@/components/GrainyBG";
import HeadWithMetas from "@/components/HeadWithMetas";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {Shapes} from "@/components/Shapes";


type PorjectProps = {
  name: string;
  link: string;
  src: string;
  role?: string;
  year?: string;
}

const Porjects: PorjectProps[] = [
  {
    name: "Labelbox",
    link: "https://www.labelbox.com/",
    src: "/images/lb.svg",
    role: "Web Developer and Designer",
    year: "Nov, 2021 - Present"
  },
  {
    name: "Triple Crown Products",
    link: "https://triplecrownproducts.com/",
    src: '/images/tcp.svg',
    role: "Full Stack Developer",
    year: "July, 2017 - Oct, 2021"
  },
  
  {
    name: "Center for Governmental Studies ",
    link: "https://www.cgs.niu.edu/",
    src: "/images/niu.svg",
    role: "Web Developer",
    year: "June, 2016 - May, 2017"
  }
]

const Freelance: PorjectProps[] = [
  {
    name: "Them Studios",
    link: "https://bythem.studio/",
    src: '/images/them.svg',
    role: "Full Stack Developer",
    year: "June, 2018"
  },
  {
    name: "Boodh",
    link: "https://www.boodh.org/",
    src: '/images/them.svg',
    role: "Full Stack Developer",
    year: "October, 2020"
  },
  {
    name: "Earthbound adventures",
    link: "https://incatrailhikes.com/",
    src: '/images/them.svg',
    role: "Full Stack Developer",
    year: "May, 2019"
  },
]


export default function Home() {

  const component = useRef<any>(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.fromTo('.name-anim',
        {
          x: -80, opacity: 0, rotate: -10
        }, {
        x: 0, opacity: 1, rotate: 0,
        ease: "elastic.out(1,0.7)",
        duration: 1,
        transformOrigin: "top",
        stagger: {
          each: 0.1,
          from: "random"
        }
      })

    }, component);
    return () => ctx.revert();
  }, []);
  const renderLetters = (text: string) => {
    return text.split('').map((letter, index) => {
      return <span key={index} className={`inline-block name-anim name-anim-${index}`}> {letter}</span>
    })
  }

  const handleUrlClick = (url: string) => {
    window.open(url, "_blank");
  }
  // Example us
  return (
    <Layout className="bg-zinc-100">
      <HeadWithMetas
        title="Uday Vatti"
        description="Uday Vatti is a web developer and a designer at Labelbox."
        url="https://udayvatti.com"
      />
      <div className="relative">



        <Container className="py-12">
          <div className="grid grid-cols-12">
            <div className="col-span-12 sm:col-span-4 order-2 md:order-1">
              <Shapes />
            </div>
            <div className="col-span-12 sm:col-span-6 text-left flex items-center order-1 md:order-2" ref={component}>

              <div>
                <Typography variant="h5" fontWeight="bold" color="dark" className="text-left mb-3">
                  Hello, I'm
                </Typography>
                <Typography variant="h1" className="!leading-tight" fontWeight="bold" color="dark" >
                  {renderLetters(`Uday`)}{" "}
                  {renderLetters(`Vatti`)}{" "}
                </Typography>
                <Typography variant="h5" fontWeight="normal" color="dark" className="mt-4">
                  Web developer and designer at
                  <Link className="text-sky-600 hover:text-sky-800" href="https://www.labelbox.com/">
                    {" "}Labelbox
                  </Link>
                </Typography>
              </div>

            </div>


          </div>

        </Container>
      </div>
      <Container className="py-12">

        <Typography fontWeight="bold" variant="h5" className="text-left mb-4">
          ABOUT ME
        </Typography>
        <Typography variant="h6" fontWeight="normal" color="dark" className="text-left max-w-2xl">
          <b>Web developer. Photographer. Bimmer enthusiast.</b> I craft clean, user-friendly web experiences and capture timeless portraits.
          Passionate about creating something special? <Link href="https://www.linkedin.com/in/vattiu/" className="text-sky-600 hover:text-sky-800">Let's chat.</Link>
        </Typography>

      </Container>

      <Container className="py-12 md:py-24">

        <Typography fontWeight="bold" variant="h5" className="text-left mb-4">
          EXPERIENCE
        </Typography>
        <div className="grid grid-cols-12 gap-6">
          {Porjects.map((project: PorjectProps, index: number) => {
            return <div onClick={() => { handleUrlClick(project.link) }} className="group cursor-pointer col-span-12 hover:-translate-y-1 
            hover:-translate-x-1
            transform 
            transition-all ease-in-out duration-500" key={index}>
              <div className="grid grid-cols-3 max-w-3xl gap-x-6 ">
                <div className="year col-span-2 md:col-span-1 order-2 md:order-1">
                  <Typography variant="p" fontWeight="bold" className="my-2 group-hover:text-zinc-500">
                    {project.year}
                  </Typography>
                </div>
                <div className="details col-span-3 md:col-span-2 flex flex-row order-1 md:order-2">
                  {/* <img src={project.src} alt="labelbox logo" className="w-12 h-12" /> */}
                  <div className="">
                    <Typography variant="h5" fontWeight="bold" color="dark" className="my-2 group-hover:text-zinc-500">
                      {project.name}
                    </Typography>
                    <Typography variant="h6" fontWeight="normal" color="dark" className="my-2">
                      {project.role}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>
      </Container>

      <Container className="py-12 md:py-24">

<Typography fontWeight="bold" variant="h5" className="text-left mb-4">
  FREELANCE PROJECTS
</Typography>
<div className="grid grid-cols-12 gap-6">
  {Freelance.map((project: PorjectProps, index: number) => {
    return <div onClick={() => { handleUrlClick(project.link) }} className="group cursor-pointer col-span-12 hover:-translate-y-1 
    hover:-translate-x-1
    transform 
    transition-all ease-in-out duration-500" key={index}>
      <div className="grid grid-cols-3 max-w-3xl gap-x-6 ">
        <div className="year col-span-2 md:col-span-1 order-2 md:order-1">
          <Typography variant="p" fontWeight="bold" className="my-2 group-hover:text-zinc-500">
            {project.year}
          </Typography>
        </div>
        <div className="details col-span-3 md:col-span-2 flex flex-row order-1 md:order-2">
          {/* <img src={project.src} alt="labelbox logo" className="w-12 h-12" /> */}
          <div className="">
            <Typography variant="h5" fontWeight="bold" color="dark" className="my-2 group-hover:text-zinc-500">
              {project.name}
            </Typography>
            <Typography variant="h6" fontWeight="normal" color="dark" className="my-2">
              {project.role}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  })}
</div>
</Container>

    </Layout>

  );
}
