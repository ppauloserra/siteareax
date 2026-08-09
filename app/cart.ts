export const CART_STORAGE_KEY = "area-x-cart-v1";
export const CART_EVENT = "area-x-cart-updated";

export type CartItem = {
  id: string;
  productSlug: string;
  productTitle: string;
  productImage: string;
  model: string;
  values: Record<string, string>;
  artChoice: string;
  artBrief: string;
  fileName: string;
  delivery: string;
  quantity: number;
  createdAt: string;
};

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(CART_EVENT));
}

export function cartCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}
