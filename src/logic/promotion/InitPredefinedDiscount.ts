import { ProductCalculation } from "../class/ProductCalculation.class";
import { DiscountProductIdWhenBuyMoreThan } from "./condition/DiscountProductIdWhenBuyMoreThan.promotion";

export function initPredefinedDiscount() {
  ProductCalculation.getInstance()
    .addPredefinedDiscount(
      new DiscountProductIdWhenBuyMoreThan({
        productId: 2,
        discount: 5,
        buyMoreThan: 2,
      })
    )
    .addPredefinedDiscount(
      new DiscountProductIdWhenBuyMoreThan({
        productId: 5,
        discount: 5,
        buyMoreThan: 2,
      })
    )
    .addPredefinedDiscount(
      new DiscountProductIdWhenBuyMoreThan({
        productId: 7,
        discount: 5,
        buyMoreThan: 2,
      })
    );
}
