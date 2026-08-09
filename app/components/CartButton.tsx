"use client";

import { useEffect, useState } from "react";
import { CART_EVENT, cartCount, loadCart } from "../cart";

export default function CartButton({ compact = false }: { compact?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(cartCount(loadCart()));
    update();
    window.addEventListener(CART_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(CART_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <a className={`cart-button ${compact ? "compact" : ""}`} href="/carrinho" aria-label={`Abrir carrinho com ${count} ${count === 1 ? "item" : "itens"}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20.5 7H6.2M9.5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" /></svg>
      {!compact && <span>Carrinho</span>}
      <strong>{count}</strong>
    </a>
  );
}
