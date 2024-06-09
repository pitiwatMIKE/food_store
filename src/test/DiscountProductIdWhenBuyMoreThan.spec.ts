import { CURRENCY } from "../constants/constants";
import { ShoppingCartDetail } from "../logic/class/ShoppingCart.class";
import { DiscountProductIdWhenBuyMoreThan } from "../logic/promotion/condition/DiscountProductIdWhenBuyMoreThan.promotion";
import { DiscountDtail } from "../logic/promotion/interface/Interface.promotion";

describe("DiscountProductIdWhenBuyMoreThan", () => {
  const item1: ShoppingCartDetail = {
    itemDetail: {
      id: 1,
      name: "Red set",
      price: 50,
      currency: CURRENCY,
      colorCode: "#F62F05",
    },
    quantity: 4,
    totalPrice: 200,
  };

  const item2: ShoppingCartDetail = {
    itemDetail: {
      id: 2,
      name: "Green set",
      price: 40,
      currency: CURRENCY,
      colorCode: "#6DE900",
    },
    quantity: 3,
    totalPrice: 120,
  };

  it("should apply discount when product quantity is more than the specified amount", () => {
    const discountData = {
      productId: 1,
      buyMoreThan: 2,
      discount: 5,
    };

    const discount = new DiscountProductIdWhenBuyMoreThan(discountData);
    const result = discount.implementPredefinedDiscount([item1, item2]);

    const expectedDiscountDetail: DiscountDtail = {
      promotionName: "Buy Red set more than 2",
      basePrice: 200,
      discountPercent: 5,
      discountPrice: 10,
    };

    expect(result).toEqual(expectedDiscountDetail);
  });

  it("should not apply discount when product quantity is not more than the specified amount", () => {
    const discountData = {
      productId: 1,
      buyMoreThan: 4,
      discount: 5,
    };

    const discount = new DiscountProductIdWhenBuyMoreThan(discountData);
    const result = discount.implementPredefinedDiscount([item1, item2]);

    expect(result).toBeNull();
  });

  it("should not apply discount to the wrong product ID", () => {
    const discountData = {
      productId: 3,
      buyMoreThan: 2,
      discount: 5,
    };

    const discount = new DiscountProductIdWhenBuyMoreThan(discountData);
    const result = discount.implementPredefinedDiscount([item1, item2]);

    expect(result).toBeNull();
  });
});
