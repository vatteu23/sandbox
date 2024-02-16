'use client';
import Container from "@/components/Container";
import HeadWithMetas from "@/components/HeadWithMetas";
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import { gsap } from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";


export default function Home() {

  const component = useRef<any>(null);
  useEffect(() => {
    let ctx = gsap.context(()=>{
      const t1 = gsap.timeline();
      t1.fromTo('.name-anim',
      {
        x: -100, opacity: 0,rotate: -10
      },{
        x: 0, opacity: 1,rotate: 0,
        ease:"elastic.out(1,0.7)",
        duration: 1,
        transformOrigin: "left top",
        stagger: {
          each: 0.1,
          from: "random"
        }
      })

    },component);
    return () => ctx.revert();
  }, []);
  const renderLetters = (text: string) => {
    return text.split('').map((letter, index) => {
      return <span key={index} className={`inline-block name-anim name-anim-${index}`}> {letter}</span>
    })
  }
  return (
    <Layout className=" bg-zinc-100 h-screen">
      <HeadWithMetas
      title="Uday Vatti"
      description="Uday Vatti is a web developer and a designer at Labelbox."
      url="https://udayvatti.com"
      
      />
      <Container className="py-12 md:py-24">
        <div className="grid grid-cols-2">
          <div className="col-span-2 lg:col-span-1 text-left" ref={component}>
            <Typography variant="h2" wrapper="h1" className="!leading-tight" fontWeight="bold" color="dark" >
             {renderLetters(`Uday`)}{" "}
            <br/>
            {renderLetters(`Vatti`)}{" "}
            </Typography>
            <Typography variant="p" color="dark" className="mt-4">
              Web developer and a designer at 
              <Link className="text-sky-600 hover:text-sky-800" href="https://www.labelbox.com/">
              {" "}Labelbox
              </Link>
              .</Typography>
          </div>
        </div>
      </Container>
      <Container className="py-12 md:py-24">
        <div className="grid grid-cols-2">
          <div className="col-span-2 lg:col-span-1 text-left">
            <Typography variant="h4" fontWeight="bold" color="dark" >
             Little bit about my self
            </Typography>
          </div>
        </div>
      </Container>
    </Layout>

  );
}
