import React from "react";

import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

function Hero() {
  return (
    <div className="flex flex-col justify-center items-center px-4 py-8">
      <h1 className="text-4xl text-center font-bold md:text-6xl md:max-w-[600px] md:py-9">
        Where Coders Come to Level Up. Fast.
      </h1>
      <p className="text-center mt-5 mb-10 md:max-w-[800px] md:mt-0">
        Every challenge here is crafted to push you, train you, and transform
        you. If you're ready to code like a warrior, you're in the right place.
      </p>
      <ShimmerButton className="md:mb-0 mb-4">Get Started</ShimmerButton>
      <div className="flex md:min-h-screen flex-col items-center justify-center p-4 md:p-24">
        <HeroVideoDialog />
      </div>
    </div>
  );
}

export default Hero;
