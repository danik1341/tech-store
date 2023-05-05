import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="flex justify-between my-[6px] mx-5 relative">
      {/* navbar-container */}
      <p className="text-gray-500 text-lg">
        {/* logo */}
        <Link href="/">TechStore</Link>
      </p>

      <button
        type="button"
        onClick={() => setShowCart((prev: boolean) => !prev)}
        className=" text-2xl text-gray-500 cursor-pointer relative transition-transform duration-500 ease-linear hover:scale-110"
      >
        {/* cart-icon */}
        <AiOutlineShopping />
        <span className="absolute right-[-9px] top-[-5px] text-xs text-[#eee] bg-[#f02d34] w-5 h-5 rounded-[50%] text-center font-semibold">
          {/* cart-item-qty */}
          {totalQuantities}
        </span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};
export default Navbar;
