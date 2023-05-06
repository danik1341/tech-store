import { urlFor } from "@/sanity/config/client-config";
import { Banner } from "@/type/Banner";
import Link from "next/link";
import React from "react";

type HeroBannerProps = {
  heroBanner: Banner;
};

const HeroBanner: React.FC<HeroBannerProps> = ({ heroBanner }) => {
  return (
    <div className="relative h-[560px] w-full rounded-2xl bg-[#dcdcdc] px-10 py-24 leading-tight md:h-[500px] md:leading-[0.9]">
      {/* hero-banner-container */}
      <div>
        <p className="text-xl">{heroBanner.smallText}</p>
        <h3 className="mt-1 text-4xl font-bold md:text-6xl">
          {heroBanner.midText}
        </h3>
        <h1 className="ml-[-20px] text-5xl font-bold uppercase text-white md:text-[160px]">
          {heroBanner.largeText1}
        </h1>
        <img
          src={urlFor(heroBanner.image).url()}
          alt="headphones"
          className="absolute right-[5%] top-[25%] h-[50%] w-[50%] md:right-[10%] md:top-0 md:h-[450px] md:w-[450px]"
        />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button
              type="button"
              className="z-10000 mt-[90px] cursor-pointer rounded-2xl border-none bg-[#f02d34] px-4 py-3 text-lg font-medium text-white md:z-10000 md:mt-10"
            >
              {heroBanner.buttonText}
            </button>
          </Link>
          <div className="absolute md:bottom-[5%] bottom-[60px] right-[10%] flex w-[300px] flex-col leading-tight text-[#324d67]">
            {/* desc */}
            <h5 className="mb-3 self-end text-base font-bold">Description</h5>
            <p className="text-end font-thin text-[#5f5f5f]">
              {heroBanner.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroBanner;
