"use client";
import { CURRENCY, UNIT_NAME } from "@/constants/constants";
import { useShoppingCart } from "@/app/context/ShoppingCartContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProductCalculation } from "@/logic/class/ProductCalculation.class";
import { DiscountMemberCard } from "@/logic/promotion/condition/DiscountUseMemberCard.promotions";
import { DiscountDtail } from "@/logic/promotion/interface/Interface.promotion";
import MemberCard from "../components/MemberCard";

const headerPorductList = [
  "product name",
  `price (${UNIT_NAME})`,
  "quantity",
  `total (${CURRENCY})`,
];

const headerDiscountList = [
  "promotion name",
  `from price (${CURRENCY})`,
  "discount (%)",
  `discount (${CURRENCY})`,
];

export default function ShopingCartDetail() {
  const router = useRouter();
  const { shoppingCartList } = useShoppingCart();
  const [isUseMemberCard, setIsUsememberCard] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discoutDetail, setDeiscountDetail] = useState<DiscountDtail[]>([]);

  useEffect(() => {
    if (!shoppingCartList.length) {
      router.push("/");
      return;
    }
    const instanctProductCal = ProductCalculation.getInstance();
    instanctProductCal.calculation(shoppingCartList);
    setTotalPrice(instanctProductCal.totalPrice);
    setDeiscountDetail(instanctProductCal.discountDetail);
  }, []);

  if (!shoppingCartList?.length) {
    return <></>;
  }

  const handleUserMember = () => {
    const instanctProductCal = ProductCalculation.getInstance();

    if (!isUseMemberCard == true) {
      instanctProductCal.useOptionalDiscount(
        new DiscountMemberCard({ totalPrice, discount: 10 })
      );
      instanctProductCal.calculation(shoppingCartList);
    } else {
      instanctProductCal.calculation(shoppingCartList);
    }

    setIsUsememberCard(!isUseMemberCard);
    setTotalPrice(instanctProductCal.totalPrice);
    setDeiscountDetail(instanctProductCal.discountDetail);
  };

  const handleNumber = (num: number) => {
    return num.toFixed(2);
  };

  return (
    <>
      <h2 className="mb-4">PRODUCT LIST</h2>
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              {headerPorductList.map((header) => (
                <th key={header} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shoppingCartList.map((item) => (
              <tr key={item.itemDetail.id} className="bg-white border-b  ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.itemDetail.name}
                </th>
                <td className="px-6 py-4">{handleNumber(item.itemDetail.price)} </td>
                <td className="px-6 py-4">{handleNumber(item.quantity)}</td>
                <td className="px-6 py-4">{handleNumber(item.totalPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {discoutDetail.length ? (
        <>
          <h2 className="mt-8 mb-4">DISCOUNT LIST</h2>
          <div className="relative overflow-x-auto shadow-md rounded-lg ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  {headerDiscountList.map((header) => (
                    <th key={header} scope="col" className="px-6 py-3">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {discoutDetail.map((item) => (
                  <tr key={item.promotionName} className="bg-white border-b  ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.promotionName}
                    </th>
                    <td className="px-6 py-4">{handleNumber(item.basePrice)} </td>
                    <td className="px-6 py-4">{handleNumber(item.discountPercent)}</td>
                    <td className="px-6 py-4">{handleNumber(item.discountPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className=" flex justify-between mt-5 px-10 py-3 text-base bg-white rounded-lg shadow-md">
        <div>TOTAL PRICE</div>
        <div>
          {handleNumber(totalPrice)} {CURRENCY}
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <MemberCard isActive={isUseMemberCard} setIsActive={handleUserMember} />
      </div>
    </>
  );
}
