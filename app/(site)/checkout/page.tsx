"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useStateContext } from "@/context/StateContext";
import { BiDollar } from "react-icons/bi";
import { urlFor } from "@/sanity/config/client-config";

const initialOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
  currency: "USD",
  intent: "capture",
};

export default function Checkout() {
  const { cartItems, totalPrice, showToast } = useStateContext();

  interface MyPurchaseItem {
    purchase_units: {
      amount: {
        currency_code: string;
        value: string;
        breakdown: {
          item_total: {
            currency_code: string;
            value: string;
          };
        };
      };
      items: {
        name: string;
        description: string;
        quantity: string;
        category: "PHYSICAL_GOODS" | "DIGITAL_GOODS" | "DONATION";
        unit_amount: {
          currency_code: string;
          value: string;
        };
        image_url?: string;
      }[];
    }[];
  }

  const productDetails: MyPurchaseItem = {
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: totalPrice.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: totalPrice.toFixed(2),
            },
          },
        },
        items: cartItems.map((item) => ({
          name: item.name,
          description: item.details,
          quantity: item.quantity.toString(),
          category: "PHYSICAL_GOODS",
          unit_amount: {
            currency_code: "USD",
            value: item.price.toFixed(2),
          },
          image_url: item.images[0]?.url ?? "",
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col items-center w-full py-20 px-10">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          className="flex flex-col items-center w-3/4"
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: productDetails.purchase_units,
              })
              .then((orderId) => {
                showToast("You order has been accepted", "success");
                return orderId;
              });
          }}
        />
      </PayPalScriptProvider>
      <div>
        <h1 className="text-4xl text-[#324d67] py-6">You Order:</h1>
      </div>
      <div className="mt-5 flex w-full flex-wrap justify-center">
        {/* products-container */}
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col justify-center items-center w-[200px]"
          >
            <img
              src={urlFor(item?.images[0].url).url()}
              // cart-product-image
              className="p-3 md:w-[180px] md:h-[150px] w-[60%] h-[60%] rounded-2xl bg-[#ebebeb] self-center md:self-start "
            />
            <div className="flex flex-col items-center md:flex-none">
              {/* item-desc */}
              <div className="flex flex-col md:justify-between items-center w-fit text-[#324d67] p-3 mr-4">
                {/* flex top */}
                <h5 className="text-2xl">{item.name}</h5>
                <h4 className="text-xl flex flex-row items-center">
                  <BiDollar />
                  {item.price}
                </h4>
                <h4 className="text-xl flex flex-row items-center">
                  Quantity {item.quantity}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
