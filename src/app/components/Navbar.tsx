"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { STORE_NAME } from "../../constants/constants";
import ShoppingCart from "./ShoppingCart";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
  const [cartClick, setCartClick] = useState<boolean>(false);
  const { shoppingCartList } = useShoppingCart();
  const getAllQuantity = () => {
    return shoppingCartList.reduce((acc, item) => acc + item.quantity, 0);
  };

  useEffect(() => {
    if (pathName == "/shoppingCartDatail") setCartClick(false);
  }, [pathName]);

  return (
    <nav className="py-5 px-12 flex justify-between">
      <Link href="/">
        <p className="bg-white text-3xl font-bold underline underline-offset-4 decoration-wavy decoration-2 decoration-emerald-500">
          {STORE_NAME}
        </p>
      </Link>
      {pathName !== "/shoppingCartDatail" && (
        <>
          <button
            onClick={() => setCartClick((prev) => !prev)}
            className="relative"
          >
            <Image
              src="./cart.svg"
              width={40}
              height={40}
              alt="shopping cart icon"
            />
            <div className="rounded-full flex justify-center items-center bg-emerald-500 text-xs text-white absolute w-6 h-5 bottom-6 -right-1">
              {getAllQuantity()}
            </div>
          </button>

          {cartClick && <ShoppingCart />}
        </>
      )}
    </nav>
  );
}
