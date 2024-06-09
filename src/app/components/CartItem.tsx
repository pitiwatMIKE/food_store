import React from "react";
import Image from "next/image";
import DisplayColor from "./DisplayColor";
import {
  useShoppingCart,
} from "../context/ShoppingCartContext";
import { ShoppingCartDetail } from "@/logic/class/ShoppingCart.class";

interface CardItemProps {
  item: ShoppingCartDetail;
}

export default function CartItem({ item }: CardItemProps) {
  const { totalPrice, quantity } = item;
  const { name, colorCode, currency } = item.itemDetail;
  const { deleteFromCart } = useShoppingCart();

  const removeItemFromCart = () => {
    deleteFromCart(item);
  };

  return (
    <div className="flex items-center gap-4 mb-3">
      <DisplayColor colorCode={colorCode} size={20} />
      <div>
        {name} <span className="text-xs">({quantity})</span>
      </div>
      <div className="ml-auto">
        {totalPrice} <small>{currency}</small>
      </div>
      <button
        onClick={removeItemFromCart}
        className="hover:bg-emerald-50 transition-colors rounded-full duration-500 p-1"
      >
        <Image alt="delete icon" src="./trash.svg" width={20} height={20} />
      </button>
    </div>
  );
}
