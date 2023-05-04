"use client";

import { urlFor } from "@/sanity/config/client-config";
import { getProduct } from "@/sanity/sanity-utils";
import { Product } from "@/type/Product";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiDollar } from "react-icons/bi";

type ProductProps = {
  product_slug: string;
};

const Product: React.FC<ProductProps> = ({ product_slug }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const productData = await getProduct(product_slug);
      setProduct(productData);
    }

    fetchProduct();
  }, [product_slug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:ms-8 md:me-8 ms-3 me-3 py-14">
      <Link href={`product/${product.slug}`}>
        <div className="md:h-64 md:w-64 h-32 w-40 cursor-pointer scale-100 transform text-[#324d67] transition-transform duration-500 ease-linear hover:scale-110">
          {/* product-card */}
          <img
            src={urlFor(product.images && product.images[0].url).url()}
            className="md:h-64 md:w-64 h-32 w-40 rounded-2xl bg-[#ebebeb] transform scale-110 transition-transform duration-500 ease-linear"
          />
          <p className="font-medium mt-3">{product.name}</p>
          <p className="font-extrabold mt-[6px] text-black flex flex-row items-center">
            <BiDollar />
            {product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
