import { FoodProduct } from "@/logic/class/ShoppingCart.class";
import { CURRENCY } from "../constants/constants";

export const foodProducts: FoodProduct[] = [
  {
    id: 1,
    name: "Red set",
    price: 50,
    currency: CURRENCY,
    colorCode: "#F62F05",
  },
  {
    id: 2,
    name: "Green set",
    price: 40,
    currency: CURRENCY,
    colorCode: "#6DE900",
  },
  {
    id: 3,
    name: "Blue set",
    price: 30,
    currency: CURRENCY,
    colorCode: "#049CEE",
  },
  {
    id: 4,
    name: "Yellow set",
    price: 50,
    currency: CURRENCY,
    colorCode: "#E7EE04",
  },
  {
    id: 5,
    name: "Pink set",
    price: 80,
    currency: CURRENCY,
    colorCode: "#EE049C",
  },
  {
    id: 6,
    name: "Purple set",
    price: 90,
    currency: CURRENCY,
    colorCode: "#B904EE",
  },
  {
    id: 7,
    name: "Orange set",
    price: 120,
    currency: CURRENCY,
    colorCode: "#EE6E04",
  },
];
