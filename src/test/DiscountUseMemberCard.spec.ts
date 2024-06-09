import { DiscountMemberCard } from "../logic/promotion/condition/DiscountUseMemberCard.promotions";
import { DiscountDtail } from "../logic/promotion/interface/Interface.promotion";


describe('DiscountMemberCard', () => {
  it('should correctly implement the optional discount', () => {
    const discountData = {
      totalPrice: 100,
      discount: 10
    };

    const discountMemberCard = new DiscountMemberCard(discountData);

    const expectedDiscountDetail: DiscountDtail = {
      promotionName: "Use Member Card",
      basePrice: 100,
      discountPercent: 10,
      discountPrice: 10
    };

    expect(discountMemberCard.implementOptionalDiscount()).toEqual(expectedDiscountDetail);
  });

  it('should handle zero discount correctly', () => {
    const discountData = {
      totalPrice: 100,
      discount: 0
    };

    const discountMemberCard = new DiscountMemberCard(discountData);

    const expectedDiscountDetail: DiscountDtail = {
      promotionName: "Use Member Card",
      basePrice: 100,
      discountPercent: 0,
      discountPrice: 0
    };

    expect(discountMemberCard.implementOptionalDiscount()).toEqual(expectedDiscountDetail);
  });

  it('should handle 100% discount correctly', () => {
    const discountData = {
      totalPrice: 100,
      discount: 100
    };

    const discountMemberCard = new DiscountMemberCard(discountData);

    const expectedDiscountDetail: DiscountDtail = {
      promotionName: "Use Member Card",
      basePrice: 100,
      discountPercent: 100,
      discountPrice: 100
    };

    expect(discountMemberCard.implementOptionalDiscount()).toEqual(expectedDiscountDetail);
  });

  it('should handle fractional discounts correctly', () => {
    const discountData = {
      totalPrice: 100,
      discount: 12.5
    };

    const discountMemberCard = new DiscountMemberCard(discountData);

    const expectedDiscountDetail: DiscountDtail = {
      promotionName: "Use Member Card",
      basePrice: 100,
      discountPercent: 12.5,
      discountPrice: 12.5
    };

    expect(discountMemberCard.implementOptionalDiscount()).toEqual(expectedDiscountDetail);
  });
});
