import { DiscountProductIdWhenBuyMoreThan } from "../logic/promotion/condition/DiscountProductIdWhenBuyMoreThan.promotion";
import { CURRENCY } from "../constants/constants";
import { ProductCalculation } from "../logic/class/ProductCalculation.class";
import { ShoppingCartDetail } from "../logic/class/ShoppingCart.class";
import { OptionalDiscount } from "../logic/promotion/interface/Interface.promotion";
import { DiscountMemberCard } from "../logic/promotion/condition/DiscountUseMemberCard.promotions";

describe("ProductCalculation", () => {
  let productCalculation: ProductCalculation;
  let item1: ShoppingCartDetail;
  let item2: ShoppingCartDetail;

  beforeEach(() => {
    productCalculation = ProductCalculation.getInstance();

    // Reset items and discounts before each test
    productCalculation["items"] = [];
    productCalculation["predefinedDiscountCondition"] = [];
    productCalculation["optionalDiscountCondition"] = [];
    productCalculation["predefinedDiscountDetail"] = [];
    productCalculation["optionalDiscountDetail"] = [];

    item1 = {
      itemDetail: {
        id: 1,
        name: "Red set",
        price: 50,
        currency: CURRENCY,
        colorCode: "#F62F05",
      },
      quantity: 3,
      totalPrice: 150,
    };

    item2 = {
      itemDetail: {
        id: 2,
        name: "Green set",
        price: 40,
        currency: CURRENCY,
        colorCode: "#6DE900",
      },
      quantity: 5,
      totalPrice: 200,
    };
  });

  it("should calculate total price without discounts", () => {
    productCalculation.calculation([item1, item2]);
    expect(productCalculation.totalPrice).toBe(350);
  });

  it("should apply predefined discounts", () => {
    productCalculation
      .addPredefinedDiscount(
        new DiscountProductIdWhenBuyMoreThan({
          productId: 2,
          discount: 5,
          buyMoreThan: 2,
        })
      )
      .calculation([item1, item2]);

    expect(productCalculation.discountDetail).toEqual([
      {
        promotionName: "Buy Green set more than 2",
        basePrice: 200,
        discountPercent: 5,
        discountPrice: 10,
      },
    ]);

    expect(productCalculation.totalPrice).toBe(340);
  });

  it("should apply optional discounts", () => {
    productCalculation
      .useOptionalDiscount(
        new DiscountMemberCard({ totalPrice: 350, discount: 10 })
      )
      .calculation([item1, item2]);

    expect(productCalculation.discountDetail).toEqual([
      {
        promotionName: "Use Member Card",
        basePrice: 350,
        discountPercent: 10,
        discountPrice: 35,
      },
    ]);

    expect(productCalculation.totalPrice).toBe(315);
  });

  it("should apply both predefined and optional discounts", () => {
    productCalculation
      .addPredefinedDiscount(
        new DiscountProductIdWhenBuyMoreThan({
          productId: 2,
          discount: 5,
          buyMoreThan: 2,
        })
      )
      .useOptionalDiscount(
        new DiscountMemberCard({ totalPrice: 350, discount: 10 })
      )
      .calculation([item1, item2]);

    expect(productCalculation.discountDetail).toEqual([
      {
        promotionName: "Buy Green set more than 2",
        basePrice: 200,
        discountPercent: 5,
        discountPrice: 10,
      },
      {
        promotionName: "Use Member Card",
        basePrice: 350,
        discountPercent: 10,
        discountPrice: 35,
      },
    ]);
    expect(productCalculation.totalPrice).toBe(305);
  });
});
