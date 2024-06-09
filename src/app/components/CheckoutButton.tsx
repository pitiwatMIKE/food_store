import { useRouter } from "next/navigation";
import React from "react";

export default function CheckoutButton() {
  const router = useRouter();
  return (
    <article className="mt-3 flex flex-col">
      <button
        onClick={() => router.push("/shoppingCartDatail")}
        className="bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors duration-500 text-emerald-500 py-3 px-5 rounded-md w-100"
      >
        Proceed to checkout
      </button>
    </article>
  );
}
