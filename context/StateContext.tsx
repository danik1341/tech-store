"use client";

import { Product } from "@/type/Product";
import React, { createContext, useContext, useState } from "react";
import { ToastOptions, toast } from "react-hot-toast";

type ToastType = "success" | "error" | "loading" | "blank";

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
  toggleCartItemQuanitity: (id: string, value: string) => void;
  onRemove: (product: Product) => void;
  showToast: (message: string, type: ToastType, options?: ToastOptions) => void;
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
  toggleCartItemQuanitity: (id: string, value: string) => {},
  onRemove: (product: Product) => {},
  showToast: () => {},
};

type StateContextProps = {
  children: React.ReactNode;
};

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

  const onRemove = (product: Product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    if (foundProduct === undefined) return;

    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity = (id: string, value: string) => {
    const foundIndex = cartItems.findIndex((item) => item._id === id);
    if (foundIndex === -1) return;

    const foundProduct = { ...cartItems[foundIndex] };
    if (value === "inc") {
      foundProduct.quantity++;
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        foundProduct.quantity--;
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }

    const newCartItems = [...cartItems];
    newCartItems[foundIndex] = foundProduct;
    setCartItems(newCartItems);
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
    toggleCartItemQuanitity,
    onRemove,
    showToast,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export const useStateContext = () => useContext(Context);
