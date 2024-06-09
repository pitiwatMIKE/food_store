export interface FoodProduct {
  id: number;
  name: string;
  price: number;
  currency: string;
  colorCode: string;
}

export interface ProductQuantity {
  itemDetail: FoodProduct;
  quantity: number;
}

export interface ShoppingCartDetail extends ProductQuantity {
  totalPrice: number;
}

export class ShoppingCart {
  private items: ShoppingCartDetail[] = [];

  constructor(items: ShoppingCartDetail[]) {
    this.items = items;
  }

  addToCart(item: ProductQuantity): ShoppingCartDetail[] {
    const idx = this.items.findIndex(
      (x) => x.itemDetail.id === item.itemDetail.id
    );

    if (idx !== -1) {
      const newQuantity = this.items[idx].quantity + item.quantity;
      this.items[idx].quantity = newQuantity;
      this.items[idx].totalPrice = item.itemDetail.price * newQuantity;
    } else {
      const totalPrice = item.itemDetail.price * item.quantity;
      this.items.push({ ...item, totalPrice });
    }
    return this.items;
  }

  deleteFromCart(item: ProductQuantity): ShoppingCartDetail[] {
    this.items = this.items.filter(
      (c) => c.itemDetail.id !== item.itemDetail.id
    );
    return this.items;
  }
}
