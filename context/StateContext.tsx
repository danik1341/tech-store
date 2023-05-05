"use client";

import { Product } from "@/type/Product";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastOptions, toast } from "react-hot-toast";

type StateContextType = {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
};

const defaultValues: StateContextType = {
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
  incQty: () => {},
  decQty: () => {},
  onAdd: (product: Product, quantity: number) => {},
};

type StateContextProps = {
  children: React.ReactNode;
};

type ToastType = "success" | "error" | "loading" | "blank";

const Context = createContext(defaultValues);

export default function StateContext({ children }: StateContextProps) {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const showToast = (
    message: string,
    type: ToastType = "blank",
    options?: ToastOptions
  ) => {
    switch (type) {
      case "success":
        toast.success(
          <div className="flex items-center">
            <span>{message}</span>
          </div>,
          options
        );
        break;
      case "error":
        toast.error(
          <div className="flex items-center">
            <span>{message}</span>
          </div>,
          options
        );
        break;
      case "loading":
        toast.loading(
          <div className="flex items-center">
            <span>{message}</span>
            <div className="loader w-4 h-4 ml-2"></div>
          </div>,
          options
        );
        break;
      default:
        toast(message, options);
    }
  };

  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantities((prev) => prev + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        } else {
          return cartProduct;
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    showToast(`${qty} ${product.name} added to the cart`, "success");
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const values: StateContextType = {
    showCart,
    setShowCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    incQty,
    decQty,
    onAdd,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export const useStateContext = () => useContext(Context);
