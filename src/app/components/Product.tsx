"use client";

import React, { useState } from "react";
import DisplayColor from "./DisplayColor";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { UNIT_NAME } from "@/constants/constants";
import { FoodProduct } from "@/logic/class/ShoppingCart.class";

interface ProductProps {
  product: FoodProduct;
}

export default function Product({ product }: ProductProps) {
  const { name, price, colorCode } = product;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useShoppingCart();

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <article className="flex flex-col gap-3 bg-white p-8 rounded-xl shadow-md text-center mb-6">
      <div className="flex justify-center">
        <DisplayColor colorCode={colorCode} size={80} />
      </div>
      <div className="text-lg">{name}</div>
      <div className="text-2xl font-semibold mt-auto">
        {price} <small>{UNIT_NAME}</small>
      </div>
      <div className="flex justify-around items-center mt-4 mb-2 ">
        <button
          onClick={decreaseQuantity}
          className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
        >
          -
        </button>
        <span className="w-10 text-center rounded-md mx-3">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="hover:text-emerald-500 hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
        >
          +
        </button>
      </div>
      <button
        onClick={() =>
          addToCart({
            quantity: quantity,
            itemDetail: product,
          })
        }
        className="bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 rounded-md px-5 py-2"
      >
        Add to cart
      </button>
    </article>
  );
}
