import CartButton from "./CartButton";
import Link from "next/link";

export default function StoreHeader({ showCart = true }: { showCart?: boolean }) {
  return (
    <header className="customizer-header">
      <Link href="/" aria-label="Voltar para a página inicial"><img src="/logo-area-x.png" alt="Área X Comunicação Visual" /></Link>
      <nav className="store-nav" aria-label="Área do cliente">
        <Link className="orders-button" href="/minhas-compras">Minhas compras</Link>
        {showCart && <CartButton />}
      </nav>
    </header>
  );
}
