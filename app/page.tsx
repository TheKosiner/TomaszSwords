import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Featured from "@/components/home/Featured";
import Anatomy from "@/components/home/Anatomy";
import Categories from "@/components/home/Categories";
import SteelTeaser from "@/components/home/SteelTeaser";
import TimelineTeaser from "@/components/home/TimelineTeaser";
import ProcessTeaser from "@/components/home/ProcessTeaser";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Featured />
      <Anatomy />
      <Categories />
      <SteelTeaser />
      <TimelineTeaser />
      <ProcessTeaser />
      <Testimonials />
      <CallToAction />
    </>
  );
}
