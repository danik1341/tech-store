"use client";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { BiDollar } from "react-icons/bi";
import { urlFor } from "@/sanity/config/client-config";
import { getProduct, getProducts } from "@/sanity/sanity-utils";
import { Product as ProductType } from "@/type/Product";
import React, { useEffect, useState } from "react";
import { Product } from "@/app/components";
import { useStateContext } from "@/context/StateContext";

type ProductDetailsProps = {
  params: { slug: string };
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const slug = params.slug;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [index, setIndex] = useState(0);
  const [productsList, setProductsList] = useState<ProductType[] | null>(null);
  const { decQty, incQty, qty, onAdd } = useStateContext();

  useEffect(() => {
    async function fetchData() {
      const fetchedProduct = await getProduct(slug);
      setProduct(fetchedProduct);
    }

    fetchData();
  }, [slug]);

  useEffect(() => {
    async function fetchData() {
      const fetchedProductsList = await getProducts();
      setProductsList(fetchedProductsList);
    }

    fetchData();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex gap-14 md:m-16 m-5 mt-[60px] text-[#324d67] md:flex-nowrap flex-wrap justify-center">
        {/* product-detail-container */}
        <div>
          <div className="w-[350px] h-[350px] rounded-2xl bg-[#ebebeb] md:w-[400px] md:h-[400px] cursor-pointer transition duration-300 ease-in-out hover:bg-[#f02d34]">
            {/* image-container */}
            <img
              src={urlFor(product.images && product.images[index].url).url()}
              className="w-[350px] h-[350px] rounded-2xl bg-[#ebebeb] md:w-[400px] md:h-[400px] cursor-pointer transition duration-300 ease-in-out hover:bg-[#f02d34]"
            />
            {/* product-detail-image */}
          </div>
          <div className="flex gap-3 mt-5">
            {/* small-images-container */}
            {product.images?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item.url).url()}
                className={
                  i === index
                    ? "bg-[#f02d34] rounded-lg w-[70px] h-[70px]"
                    : "rounded-lg bg-[#ebebeb] w-[70px] h-[70px] cursor-pointer"
                }
                // small-image selected-image : small-image
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col text-[#324d67] md:flex-nowrap flex-wrap self-end justify-center">
          {/* product-detail-desc */}
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex flex-row items-center gap-1 mt-3 text-[#f02d34]">
            {/* reviews */}
            <div className="flex flex-row">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p className="mt-0 text-[#324d67]">(20)</p>
          </div>
          <h4 className="mt-3 text-lg font-medium">Details: </h4>
          <p className="mt-3">{product.details}</p>
          <p className="mt-3 font-bold text-xl flex flex-row items-center">
            <BiDollar />
            {product.price}
          </p>
          {/* price */}
          <div className="flex flex-col gap-5 mt-3 items-center">
            {/* quantity */}
            <h3 className=" text-xl font-medium">Quantity:</h3>
            <p className="text-center p-2 border-solid border-[1px] border-gray-500 flex flex-row justify-evenly gap-2 min-w-[200px] md:flex-grow md:w-[300px]">
              {/* quantity-desc */}
              <span
                className="cursor-pointer py-2 px-3 text-base border-r-[1px] border-gray-500 text-center w-[60px] self-center"
                onClick={decQty}
              >
                <AiOutlineMinus className="text-red-400" />
              </span>
              {/* minus */}
              <span className="text-xl px-2 text-center self-center mx-2">
                {qty}
              </span>
              {/* num */}
              <span
                className="cursor-pointer py-2 px-3 text-base text-center w-[60px] self-center border-solid border-l-[1px] border-gray-500"
                onClick={incQty}
              >
                <AiOutlinePlus className="text-[#31a831]" />
              </span>
              {/* plus */}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start md:gap-5 gap-2">
            {/* buttons */}
            <button
              type="button"
              className="py-3 px-5 border-solid border-[1px] border-[#f02d34] mt-10 text-lg font-medium bg-white text-[#f02d34] cursor-pointer w-[200px] scale-100 transform transition-transform duration-500 ease-linear hover:scale-110"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            {/* add-to-cart */}
            <button
              type="button"
              className="w-[200px] py-3 px-5 bg-[#f02d34] text-white border-none md:mt-10 mt-5 text-lg font-medium cursor-pointer scale-100 transform transition-transform duration-500 ease-linear hover:scale-110"
              // onClick={handleBuyNow}
            >
              Buy Now
            </button>
            {/* buy-now */}
          </div>
        </div>
      </div>

      <div className="mt-[120px]">
        {/* maylike-products-wrapper */}
        <h2 className="text-center m-12 text-[#324d67] text-3xl">
          You may also like
        </h2>
        <div className="relative w-full md:h-[450px] h-[250px] overflow-x-hidden">
          {/* marquee */}
          <div className="flex flex-nowrap justify-center gap-4 mt-5">
            {/* maylike-products-container track */}
            <div className="track animate-marquee whitespace-nowrap mr-4 flex flex-row gap-10">
              {productsList ? (
                productsList.map((item) => (
                  <Product key={item._id} product_slug={item.slug} />
                ))
              ) : (
                <div>Loading.....</div>
              )}
              {/* duplicate the productsList to create an endless scroll effect */}
              {productsList ? (
                productsList.map((item) => (
                  <Product key={item._id} product_slug={item.slug} />
                ))
              ) : (
                <div>Loading.....</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
