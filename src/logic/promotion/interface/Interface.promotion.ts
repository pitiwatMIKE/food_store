import { ShoppingCartDetail } from "../../class/ShoppingCart.class";

export interface DiscountDtail {
  promotionName: string;
  basePrice: number;
  discountPercent: number;
  discountPrice: number;
}

export interface OptionalDiscount {
  implementOptionalDiscount(): DiscountDtail | null;
}

export interface PredefinedDiscount {
  implementPredefinedDiscount(
    items: ShoppingCartDetail[]
  ): DiscountDtail | null;
}
