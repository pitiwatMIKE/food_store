import React from "react";
import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";
import { useShoppingCart } from "@/app/context/ShoppingCartContext";

export default function ShoppingCart() {
  const { shoppingCartList } = useShoppingCart();

  return (
    <div className="bg-white flex flex-col absolute right-3 md:right-9 top-14 w-80 py-4 px-4 shadow-[0_5px_15px_0_rgba(0,0,0,.15)] rounded-md z-50">
      {shoppingCartList.length > 0 ? (
        <>
          {shoppingCartList.map((item) => (
            <CartItem item={item} key={item.itemDetail.id} />
          ))}
          <CheckoutButton />
        </>
      ) : (
        <div className="p-5">You have no items in your cart</div>
      )}
    </div>
  );
}
