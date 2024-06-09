import { ShoppingCartDetail } from "../../class/ShoppingCart.class";
import {
  DiscountDtail,
  PredefinedDiscount,
} from "../interface/Interface.promotion";

interface IDiscountProductIdWhenBuyMoreThan {
  productId: number;
  buyMoreThan: number;
  discount: number;
}

export class DiscountProductIdWhenBuyMoreThan implements PredefinedDiscount {
  constructor(private data: IDiscountProductIdWhenBuyMoreThan) {}
  implementPredefinedDiscount(
    items: ShoppingCartDetail[]
  ): DiscountDtail | null {
    for (let item of items) {
      if (
        item.itemDetail.id === this.data.productId &&
        item.quantity > this.data.buyMoreThan
      ) {
        return {
          promotionName: `Buy ${item.itemDetail.name} more than ${this.data.buyMoreThan}`,
          basePrice: item.totalPrice,
          discountPercent: this.data.discount,
          discountPrice: item.totalPrice * (this.data.discount / 100),
        };
      }
    }
    return null;
  }
}
