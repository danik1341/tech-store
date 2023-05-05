import React from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/sanity/config/client-config";
import { BiDollar } from "react-icons/bi";

type CartProps = {};

const Cart: React.FC<CartProps> = () => {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();
  return (
    <div
      // ref={cartRef}
      className="w-[100vw] bg-black bg-opacity-30 fixed right-0 top-0 z-[100] transition-all duration-1000 ease-in-out"
    >
      {/* cart-wrapper */}
      <div className="h-[100vh] md:w-[600px] w-[415px] bg-white float-right md:py-10 md:px-3 p-2 relative  overflow-y-scroll">
        {/* cart-container */}
        <button
          type="button"
          onClick={() => setShowCart(false)}
          className="flex items-center text-lg font-medium cursor-pointer md:ml-3 ml-6 border-none bg-transparent md:mt-0 mt-9"
        >
          {/* cart-heading */}
          <AiOutlineLeft className="p-[2px]" />
          <span className="p-[2px] ml-3">
            {/* heading */}
            Your Cart
          </span>
          <span className="p-[2px] ml-3 text-[#f02d34]">
            {/* cart-num-items */}({totalQuantities} items)
          </span>
        </button>

        {cartItems.length < 1 && (
          <div className="text-center mt-10 flex flex-col items-center">
            {/* empty-cart */}
            <AiOutlineShopping size={150} />
            <h3 className="font-semibold text-xl">
              Your shopping bag is empty
            </h3>
            <Link href={"/"} className="md:w-[400px] m-auto w-[300px]">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="w-full mw-[400px] py-[10px] px-3 rounded-2xl border-none text-xl mt-3 md:mt-10 uppercase bg-[#f02d34] text-white cursor-pointer hover:transform hover:scale-110 transition-all duration-500 ease-in-out"
              >
                {/* btn */}
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="md:mt-4 mt-3 md:max-h-[76vh] max-h-[70vh] py-5 px-3 overflow-y-auto">
          {/* product-container */}
          {cartItems.length >= 1 &&
            cartItems.map((cartItem) => (
              <div
                key={cartItem._id}
                className="flex md:flex-row flex-col md:p-5 py-5 px-1"
              >
                {/* product */}
                <img
                  src={urlFor(cartItem?.images[0].url).url()}
                  // cart-product-image
                  className="p-8 md:w-[180px] md:h-[150px] w-[35%] h-[35%] rounded-2xl bg-[#ebebeb] self-center md:self-start "
                />
                <div className="flex flex-col items-center md:flex-none">
                  {/* item-desc */}
                  <div className="flex md:justify-between justify-evenly w-[350px] text-[#324d67] p-3">
                    {/* flex top */}
                    <h5 className="text-2xl">{cartItem.name}</h5>
                    <h4 className="text-xl flex flex-row items-center">
                      <BiDollar />
                      {cartItem.price}
                    </h4>
                  </div>
                  <div className="md:mt-7 mt-2">
                    {/* flex bottom */}
                    <div className="p-3 md:w-full w-1/2 flex flex-row">
                      <p className="text-center p-2 border-solid border-[1px] border-gray-500 flex flex-row justify-between w-[150px] md:flex-grow md:w-[200px]">
                        {/* quantity-desc */}
                        <span
                          className="cursor-pointer py-2 px-3 text-base border-r-[1px] border-gray-500 text-center flex justify-center w-[30%]"
                          onClick={() =>
                            toggleCartItemQuanitity(cartItem._id, "dec")
                          }
                        >
                          <AiOutlineMinus className="text-red-400" />
                        </span>
                        {/* minus */}
                        <span className="text-xl px-2 text-center self-center mx-2">
                          {/* {qty} */}
                          {cartItem.quantity}
                        </span>
                        {/* num */}
                        <span
                          className="cursor-pointer py-2 px-3 text-base text-center self-center border-solid border-l-[1px] border-gray-500 flex justify-center w-[30%]"
                          onClick={() =>
                            toggleCartItemQuanitity(cartItem._id, "inc")
                          }
                        >
                          <AiOutlinePlus className="text-[#31a831]" />
                        </span>
                        {/* plus */}
                      </p>
                      <button
                        type="button"
                        onClick={() => onRemove(cartItem)}
                        className="text-2xl text-[#f02d34] cursor-pointer bg-transparent border-none md:px-4 px-8"
                      >
                        {/* remove-item */}
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="absolute bottom-[12px] right-1 w-full md:py-8 md:px-16 p-8">
            {/* cart-bottom */}
            <div className="flex justify-between">
              {/* total */}
              <h3 className="md:text-2xl text-xl">Subtotal:</h3>
              <h3 className="md:text-2xl text-xl">{totalPrice}</h3>
            </div>
            <div>
              <Link href={"checkout"}>
                {/* btn-container */}
                <button
                  type="button"
                  className="w-full max-w-[400px] py-[10px] px-3 rounded-2xl border-none text-xl mt-3 md:mt-10 uppercase bg-[#f02d34] text-white cursor-pointer hover:transform hover:scale-110 transition-all duration-500 ease-in-out"
                  onClick={() => setShowCart(false)}
                >
                  {/* btn */}
                  Pay With PayPal
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
