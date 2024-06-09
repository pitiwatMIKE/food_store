import {
  DiscountDtail,
  OptionalDiscount,
} from "../interface/Interface.promotion";

interface IDiscountUseMemberCard {
  totalPrice: number;
  discount: number;
}

export class DiscountMemberCard implements OptionalDiscount {
  constructor(private data: IDiscountUseMemberCard) {}
  implementOptionalDiscount(): DiscountDtail | null {
    return {
      promotionName: "Use Member Card",
      basePrice: this.data.totalPrice,
      discountPercent: this.data.discount,
      discountPrice: this.data.totalPrice * (this.data.discount / 100),
    };
  }
}
