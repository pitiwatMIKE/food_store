import React from "react";
import Product from "./components/Product";
import { foodProducts } from "../data/foods";

export default function Home() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 justify-center mx-auto gap-4 place-center flex-wrap w-100 md:max-w-[900px]">
      {foodProducts.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
}
