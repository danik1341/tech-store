"use client";

import { getBannersData, getProducts } from "@/sanity/sanity-utils";
import { FooterBanner, HeroBanner, Product } from "../components";

export default async function Home() {
  const products = await getProducts();
  const banners = await getBannersData();

  return (
    <>
      <HeroBanner heroBanner={banners && banners[0]} />

      <div className="mx-0 my-10 text-center text-[#324d67]">
        {/* products-heading */}
        <h2 className="text-4xl font-extrabold">Best Selling Products</h2>
        <p className="text-base font-extralight">
          speaker There are many variations passages
        </p>
      </div>

      <div className="mt-5 flex w-full flex-wrap justify-center">
        {/* products-container */}
        {products.map((product) => (
          <Product key={product._id} product_slug={product.slug} />
        ))}
      </div>

      <FooterBanner footerBanner={banners && banners[0]} />
    </>
  );
}
