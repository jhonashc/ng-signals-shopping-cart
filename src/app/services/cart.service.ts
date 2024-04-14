import { computed, effect, Injectable, signal } from '@angular/core';

import { CartItem, Product } from '../interfaces';

interface CartState {
  items: CartItem[];
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private CART_LOCAL_STORAGE_KEY = 'shopping-cart';

  private state = signal<CartState>({
    items: [],
  });

  public cartItems = computed(() => this.state().items);

  public totalItems = computed(() => this.cartItems().length);

  public totalPrice = computed(() =>
    this.cartItems().reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    )
  );

  constructor() {
    effect(() => this.loadFromLocalStorage(), { allowSignalWrites: true });
    effect(() => this.saveToLocalStorage());
  }

  addItem(cartItem: CartItem): void {
    this.state.update((state) => ({
      items: [...state.items, cartItem],
    }));
  }

  removeItem(cartItemId: number): void {
    this.state.update((state) => ({
      items: state.items.filter((cartItem) => cartItem.id !== cartItemId),
    }));
  }

  changeQuantity(cartItemId: number, quantity: number): void {
    const cartItems: CartItem[] = this.cartItems();

    const cartItemIndex: number = this.cartItems().findIndex(
      (item) => item.id === cartItemId
    );

    if (cartItemIndex === -1) return;

    const newCartItems: CartItem[] = [
      ...cartItems.slice(0, cartItemIndex),
      {
        ...cartItems[cartItemIndex],
        quantity: cartItems[cartItemIndex].quantity + quantity,
      },
      ...cartItems.slice(cartItemIndex + 1),
    ].filter((item) => item.quantity > 0);

    this.state.update(() => ({
      items: newCartItems,
    }));
  }

  clearCart(): void {
    this.state.update(() => ({
      items: [],
    }));
  }

  checkProductInCart(productId: number): boolean {
    return this.cartItems().some((cartItem) => cartItem.id === productId);
  }

  saveToLocalStorage(): void {
    localStorage.setItem(
      this.CART_LOCAL_STORAGE_KEY,
      JSON.stringify(this.cartItems())
    );
  }

  loadFromLocalStorage(): void {
    const cartItems: string | null = localStorage.getItem(
      this.CART_LOCAL_STORAGE_KEY
    );

    if (!cartItems) return;

    this.state.update(() => ({
      items: JSON.parse(cartItems),
    }));
  }

  mapToCartItem(product: Product): CartItem {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };
  }
}
