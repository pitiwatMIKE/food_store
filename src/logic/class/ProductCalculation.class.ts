import {
  DiscountDtail,
  OptionalDiscount,
  PredefinedDiscount,
} from "../promotion/interface/Interface.promotion";
import { ShoppingCartDetail } from "./ShoppingCart.class";

export class ProductCalculation {
  private static instance: ProductCalculation | null = null;
  private items: ShoppingCartDetail[] = [];
  private predefinedDiscountCondition: PredefinedDiscount[] = [];
  private predefinedDiscountDetail: DiscountDtail[] = [];
  private optionalDiscountCondition: OptionalDiscount[] = [];
  private optionalDiscountDetail: DiscountDtail[] = [];

  discountDetail: DiscountDtail[] = [];
  totalPrice: number = 0;

  private constructor() {}

  static getInstance(): ProductCalculation {
    if (this.instance !== null) {
      return this.instance;
    } else {
      this.instance = new ProductCalculation();
      return this.instance;
    }
  }

  calculation(items: ShoppingCartDetail[]) {
    this.items = items;
    this.predefinedDiscountDetail = [];
    this.optionalDiscountDetail = [];
    this.discountDetail = [];
    this.sumTotalPriceAllProducts();
    this.calculationWithDiscount();
    this.optionalDiscountCondition = [];
  }

  private sumTotalPriceAllProducts() {
    this.totalPrice = this.items.reduce((acc, item) => {
      if (item.totalPrice) {
        return acc + item.totalPrice;
      }
      return acc;
    }, 0);
  }

  private calculationWithDiscount() {
    this.calPredefinedDiscount();
    this.calOptionalDiscountCondition();

    this.discountDetail = [
      ...this.predefinedDiscountDetail,
      ...this.optionalDiscountDetail,
    ];

    this.discountDetail.forEach((item) => {
      this.totalPrice -= item.discountPrice;
    });
  }

  private calPredefinedDiscount() {
    for (let condition of this.predefinedDiscountCondition) {
      const data = condition.implementPredefinedDiscount(this.items);
      if (data == null) continue;
      this.predefinedDiscountDetail.push(data);
    }
  }

  private calOptionalDiscountCondition() {
    for (let condition of this.optionalDiscountCondition) {
      const data = condition.implementOptionalDiscount();
      if (data == null) continue;
      this.optionalDiscountDetail.push(data);
    }
  }

  addPredefinedDiscount(condition: PredefinedDiscount) {
    this.predefinedDiscountCondition.push(condition);
    return this;
  }

  useOptionalDiscount(condition: OptionalDiscount) {
    this.optionalDiscountCondition.push(condition);
    return this;
  }
}
