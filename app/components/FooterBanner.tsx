import { urlFor } from "@/sanity/config/client-config";
import { Banner } from "@/type/Banner";
import Link from "next/link";
import React from "react";

type FooterBannerProps = {
  footerBanner: Banner;
};

const FooterBanner: React.FC<FooterBannerProps> = ({ footerBanner }) => {
  return (
    <div className="py-24 px-10 bg-[#f02d34] rounded-2xl relative md:h-[400px] h-[570px] leading-none text-white w-full md:mt-[120px] mt-20">
      {/* footer-banner-container */}
      <div className="flex justify-between md:flex-nowrap md:gap-0 flex-wrap gap-5">
        {/* banner-desc */}
        <div>
          {/* left */}
          <p className="m-5">{footerBanner.discount}</p>
          <h3 className="text-5xl ml-1 font-black md:text-[80px] md:ml-6">
            {footerBanner.largeText1}
          </h3>
          <h3 className="text-5xl ml-1 font-black md:text-[80px] md:ml-6">
            {footerBanner.largeText2}
          </h3>
          <p className="m-5">{footerBanner.saleTime}</p>
        </div>
        <div className="leading-snug">
          {/* right */}
          <p className="text-lg">{footerBanner.smallText}</p>
          <h3 className="text-5xl md:font-extrabold md:text-6xl">
            {footerBanner.midText}
          </h3>
          <p className="text-lg">{footerBanner.desc}</p>
          <Link href={`/product/${footerBanner.product}`}>
            <button
              type="button"
              className="rounded-2xl py-[10px] px-4 bg-white text-[#f02d34] border-none mt-10 text-lg font-medium cursor-pointer"
            >
              {footerBanner.buttonText}
            </button>
          </Link>
        </div>
        <img
          src={urlFor(footerBanner.image).url()}
          alt="headphones"
          className="left-[50%] top-[6%] h-[50%] w-[50%] absolute md:top-[-10%] md:left-[25%] md:h-[350px] md:w-[350px]"
        />
      </div>
    </div>
  );
};
export default FooterBanner;
