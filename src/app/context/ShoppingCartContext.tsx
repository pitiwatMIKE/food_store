"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  ProductQuantity,
  ShoppingCart,
  ShoppingCartDetail,
} from "../../logic/class/ShoppingCart.class";

interface ShoppingCartType {
  shoppingCartList: ShoppingCartDetail[];
  addToCart: (item: ProductQuantity) => void;
  deleteFromCart: (item: ProductQuantity) => void;
}

const ShoppingCartContext = createContext<ShoppingCartType>({
  shoppingCartList: [],
  addToCart: () => {},
  deleteFromCart: () => {},
});

const ShoppingCartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [shoppingCartList, setShoppingCartList] = useState<
    ShoppingCartDetail[]
  >([]);

  const addToCart = (item: ProductQuantity) => {
    const shoppingCart = new ShoppingCart(shoppingCartList);
    setShoppingCartList([...shoppingCart.addToCart(item)]);
  };

  const deleteFromCart = (item: ProductQuantity) => {
    const shoppingCart = new ShoppingCart(shoppingCartList);
    setShoppingCartList([...shoppingCart.deleteFromCart(item)]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCartList, addToCart, deleteFromCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export { ShoppingCartProvider, useShoppingCart };
