import { ProductCalculation } from "../logic/class/ProductCalculation.class";
import { DiscountProductIdWhenBuyMoreThan } from "../logic/promotion/condition/DiscountProductIdWhenBuyMoreThan.promotion";
import { initPredefinedDiscount } from "../logic/promotion/InitPredefinedDiscount";
import { PredefinedDiscount } from "../logic/promotion/interface/Interface.promotion";

describe("initPredefinedDiscount", () => {
  let productCalculation: ProductCalculation;

  beforeEach(() => {
    // Reset the singleton instance
    ProductCalculation["instance"] = null;
    productCalculation = ProductCalculation.getInstance();
    initPredefinedDiscount();
  });

  it("should initialize predefined discounts", () => {
    const predefinedDiscounts: PredefinedDiscount[] = (
      productCalculation as any
    ).predefinedDiscountCondition;

    expect(predefinedDiscounts.length).toBe(3);

    const discount1 =
      predefinedDiscounts[0] as DiscountProductIdWhenBuyMoreThan;
    expect(discount1).toBeInstanceOf(DiscountProductIdWhenBuyMoreThan);
    expect(discount1["data"]).toEqual({
      productId: 2,
      discount: 5,
      buyMoreThan: 2,
    });

    const discount2 =
      predefinedDiscounts[1] as DiscountProductIdWhenBuyMoreThan;
    expect(discount2).toBeInstanceOf(DiscountProductIdWhenBuyMoreThan);
    expect(discount2["data"]).toEqual({
      productId: 5,
      discount: 5,
      buyMoreThan: 2,
    });

    const discount3 =
      predefinedDiscounts[2] as DiscountProductIdWhenBuyMoreThan;
    expect(discount3).toBeInstanceOf(DiscountProductIdWhenBuyMoreThan);
    expect(discount3["data"]).toEqual({
      productId: 7,
      discount: 5,
      buyMoreThan: 2,
    });
  });
});
