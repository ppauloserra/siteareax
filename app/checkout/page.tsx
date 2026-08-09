"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CartItem, loadCart, saveCart } from "../cart";
import StoreHeader from "../components/StoreHeader";
import { Customer, makeOrderId, saveOrder } from "../orders";

const emptyCustomer: Customer = { name: "", email: "", phone: "", cpf: "", address: "", city: "Santa Inês", notes: "" };

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setItems(loadCart());
      try {
        const stored = window.localStorage.getItem("area-x-customer-v1");
        if (stored) setCustomer(JSON.parse(stored));
      } catch { /* prévia sem dados salvos */ }
      setReady(true);
    });
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const submitQuote = () => {
    const id = makeOrderId();
    saveOrder({ id, createdAt: new Date().toISOString(), status: "aguardando_orcamento", items, customer, paymentMethod });
    saveCart([]);
    window.location.href = `/minhas-compras?pedido=${encodeURIComponent(id)}`;
  };

  if (!ready) return null;

  return (
    <main className="checkout-page">
      <StoreHeader />
      <nav className="checkout-progress" aria-label="Etapas da compra"><span className="done">1 Carrinho</span><span className="done">2 Dados</span><span className="active">3 Pagamento</span></nav>

      {items.length === 0 ? (
        <section className="empty-cart"><span className="empty-cart-icon">0</span><h2>Nenhum pedido para finalizar.</h2><p>Adicione um produto ao carrinho para abrir o checkout.</p><Link className="next-button" href="/#produtos">Ver produtos</Link></section>
      ) : (
        <section className="checkout-layout">
          <div className="checkout-main">
            <div className="checkout-title"><span>Finalização segura</span><h1>Pagamento e confirmação</h1><p>Revise os dados. Produtos com preço tabelado poderão ser pagos imediatamente; projetos sob medida seguem para orçamento antes da cobrança.</p></div>

            <section className="checkout-panel customer-review">
              <div className="checkout-panel-heading"><div><span>01</span><h2>Dados do comprador</h2></div><Link href="/carrinho">Editar</Link></div>
              <div className="customer-review-grid"><p><small>Nome</small><strong>{customer.name || "Não informado"}</strong></p><p><small>CPF</small><strong>{customer.cpf || "Não informado"}</strong></p><p><small>Contato</small><strong>{customer.phone || customer.email || "Não informado"}</strong></p><p><small>Recebimento</small><strong>{items[0]?.delivery || "A definir"}</strong></p></div>
            </section>

            <section className="checkout-panel">
              <div className="checkout-panel-heading"><div><span>02</span><h2>Forma de pagamento</h2></div><span className="secure-chip">Mercado Pago</span></div>
              <div className="payment-options">
                <button type="button" className={paymentMethod === "pix" ? "selected" : ""} onClick={() => setPaymentMethod("pix")}><span>PIX</span><strong>Pix</strong><small>Confirmação rápida após a liberação do valor.</small></button>
                <button type="button" className={paymentMethod === "card" ? "selected" : ""} onClick={() => setPaymentMethod("card")}><span>••••</span><strong>Cartão</strong><small>Crédito ou débito, processado pelo Mercado Pago.</small></button>
              </div>
              <div className="payment-lock"><strong>Pagamento protegido</strong><p>O site não armazenará número do cartão nem senha. Esses dados serão tratados diretamente pelo checkout oficial do Mercado Pago.</p></div>
            </section>
          </div>

          <aside className="checkout-summary">
            <span>Resumo do pedido</span><h2>{itemCount} {itemCount === 1 ? "produto" : "produtos"}</h2>
            <div className="checkout-products">{items.map((item) => <div key={item.id}><img src={item.productImage} alt="" /><p><strong>{item.quantity}× {item.productTitle}</strong><small>{item.model}</small></p><b>A calcular</b></div>)}</div>
            <div className="quote-total"><span>Total</span><strong>Aguardando cálculo</strong><small>A Área X conferirá medidas, material, arte, entrega e instalação antes de liberar a cobrança.</small></div>
            <button className="next-button checkout-submit" type="button" onClick={submitQuote}>Enviar pedido para análise</button>
            <p className="checkout-explain">Quando o valor estiver confirmado, o botão <b>“Pagar com Mercado Pago”</b> aparecerá em Minhas compras. Produtos com preço tabelado irão direto para o pagamento.</p>
          </aside>
        </section>
      )}
    </main>
  );
}
