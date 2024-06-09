import { CURRENCY } from '../constants/constants';
import { FoodProduct, ProductQuantity, ShoppingCart, ShoppingCartDetail } from '../logic/class/ShoppingCart.class';


describe('ShoppingCart', () => {
  let cart: ShoppingCart;

  const item1: FoodProduct = {
    id: 1,
    name: "Red set",
    price: 50,
    currency: CURRENCY,
    colorCode: "#F62F05",
  }

  const item2: FoodProduct = {
    id: 2,
    name: "Green set",
    price: 40,
    currency: CURRENCY,
    colorCode: "#6DE900",
  }

  beforeEach(() => {
    cart = new ShoppingCart([]);
  });

  it('should add a new item to the cart', () => {
    const productQuantity: ProductQuantity = {
      itemDetail: item1,
      quantity: 2,
    };

    const expectedCart: ShoppingCartDetail[] = [
      {
        itemDetail: item1,
        quantity: 2,
        totalPrice: 100,
      },
    ];

    expect(cart.addToCart(productQuantity)).toEqual(expectedCart);
  });

  it('should update quantity and total price if item already exists', () => {
    const initialProductQuantity: ProductQuantity = {
      itemDetail: item1,
      quantity: 2,
    };

    cart.addToCart(initialProductQuantity);

    const additionalProductQuantity: ProductQuantity = {
      itemDetail: item1,
      quantity: 3,
    };

    const expectedCart: ShoppingCartDetail[] = [
      {
        itemDetail: item1,
        quantity: 5,
        totalPrice: 250,
      },
    ];

    expect(cart.addToCart(additionalProductQuantity)).toEqual(expectedCart);
  });

  it('should add multiple different items to the cart', () => {
    const productQuantity1: ProductQuantity = {
      itemDetail: item1,
      quantity: 1,
    };

    const productQuantity2: ProductQuantity = {
      itemDetail: item2,
      quantity: 1,
    };

    const expectedCart: ShoppingCartDetail[] = [
      {
        itemDetail: item1,
        quantity: 1,
        totalPrice: 50,
      },
      {
        itemDetail: item2,
        quantity: 1,
        totalPrice: 40,
      },
    ];

    cart.addToCart(productQuantity1);
    expect(cart.addToCart(productQuantity2)).toEqual(expectedCart);
  });

  it('should delete an item from the cart', () => {
    const productQuantity1: ProductQuantity = {
      itemDetail: item1,
      quantity: 2,
    };

    const productQuantity2: ProductQuantity = {
      itemDetail: item2,
      quantity: 5,
    };

    cart.addToCart(productQuantity1);
    cart.addToCart(productQuantity2);

    const expectedCartAfterDeletion: ShoppingCartDetail[] = [
      {
        itemDetail: item1,
        quantity: 2,
        totalPrice: 100,
      },
    ];

    expect(cart.deleteFromCart(productQuantity2)).toEqual(expectedCartAfterDeletion);
  });

  it('should return an empty cart after deleting the only item', () => {
    const productQuantity: ProductQuantity = {
      itemDetail: item1,
      quantity: 2,
    };

    cart.addToCart(productQuantity);

    expect(cart.deleteFromCart(productQuantity)).toEqual([]);
  });
});
