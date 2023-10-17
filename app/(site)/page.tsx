"use client";

import { getBannersData, getProducts } from "@/sanity/sanity-utils";
import { FooterBanner, HeroBanner, Product } from "../components";
import { useEffect, useState } from "react";
import { Product as ProductType } from "@/type/Product";
import { Banner } from "@/type/Banner";

export default function Home() {
  // const products = await getProducts();
  // const banners = await getBannersData();
  const [products, setProducts] = useState<ProductType[] | null>();
  const [banners, setBanners] = useState<Banner[] | null>();

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getBannersData();
      setBanners(data);
    }
    fetchData();
  }, []);

  return (
    <>
      {banners ? <HeroBanner heroBanner={banners[0]} /> : "Loading....."}

      <div className="mx-0 my-10 text-center text-[#324d67]">
        {/* products-heading */}
        <h2 className="text-4xl font-extrabold">Best Selling Products</h2>
        <p className="text-base font-extralight">
          speaker There are many variations passages
        </p>
      </div>

      <div className="flex flex-wrap justify-center w-full mt-5">
        {/* products-container */}
        {products &&
          products.map((product) => (
            <Product key={product._id} product_slug={product.slug} />
          ))}
      </div>

      {banners ? <FooterBanner footerBanner={banners[0]} /> : "Loading....."}
    </>
  );
}
