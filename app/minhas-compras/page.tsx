"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StoreHeader from "../components/StoreHeader";
import { CustomerOrder, loadOrders, productionSteps, statusLabels, statusPosition } from "../orders";

const demoOrder: CustomerOrder = {
  id: "AX-20260807-1042",
  createdAt: "2026-08-07T12:30:00.000Z",
  status: "em_producao",
  customer: { name: "Cliente Área X", email: "cliente@exemplo.com", phone: "(98) 99999-9999", cpf: "***.***.***-**", address: "Santa Inês", city: "Santa Inês" },
  total: 189.9,
  paymentMethod: "pix",
  productionNote: "A arte foi aprovada e o material entrou na fila de produção.",
  items: [{ id: "demo", productSlug: "banners-lonas-paineis", productTitle: "Banner personalizado", productImage: "/products/banner-02.jpg", model: "Modelo 4 · Grandes formatos", values: { largura: "2,00", altura: "1,00", acabamento: "Ilhós" }, artChoice: "Tenho a arte", artBrief: "", fileName: "arte-final.pdf", delivery: "Retirada na loja", quantity: 1, createdAt: "2026-08-07T12:30:00.000Z" }],
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => { queueMicrotask(() => { setOrders(loadOrders()); setReady(true); }); }, []);
  const visibleOrders = useMemo(() => orders.length ? orders : [demoOrder], [orders]);

  if (!ready) return null;

  return (
    <main className="orders-page">
      <StoreHeader />
      <section className="orders-hero"><div><span>Área do cliente</span><h1>Minhas compras</h1><p>Acompanhe orçamento, pagamento, aprovação da arte, produção e entrega em um só lugar.</p></div><div className="orders-login-note"><strong>Acesso protegido na loja final</strong><small>O cliente entrará com o e-mail usado na compra. Também poderá consultar um pedido pelo número e e-mail.</small></div></section>

      <section className="orders-shell">
        {!orders.length && <div className="demo-banner"><strong>Exemplo de acompanhamento</strong><span>Este pedido serve para você visualizar como a área do cliente ficará.</span></div>}
        <div className="orders-toolbar"><div><span>{visibleOrders.length} {visibleOrders.length === 1 ? "pedido" : "pedidos"}</span><h2>Histórico de pedidos</h2></div><Link className="next-button" href="/#produtos">Fazer nova compra</Link></div>
        <div className="orders-list">{visibleOrders.map((order) => <OrderCard order={order} key={order.id} />)}</div>
        <section className="track-order"><div><span>Comprou sem criar conta?</span><h2>Consulte um pedido</h2><p>Na versão final, bastará informar o número do pedido e o e-mail usado no checkout.</p></div><form onSubmit={(event) => event.preventDefault()}><label>Número do pedido<input placeholder="Ex.: AX-20260807-1042" /></label><label>E-mail da compra<input type="email" placeholder="seuemail@exemplo.com" /></label><button type="submit">Consultar pedido</button></form></section>
      </section>
    </main>
  );
}

function OrderCard({ order }: { order: CustomerOrder }) {
  const position = statusPosition(order.status);
  const date = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(order.createdAt));
  return (
    <article className="order-card">
      <header><div><span>Pedido {order.id}</span><small>Realizado em {date}</small></div><strong className={`status status-${order.status}`}>{statusLabels[order.status]}</strong></header>
      <div className="order-timeline">{productionSteps.map((step, index) => <div className={index < position ? "done" : index === position ? "current" : ""} key={step.key}><i>{index < position ? "✓" : index + 1}</i><span>{step.short}</span></div>)}</div>
      <div className="order-body"><div className="order-items">{order.items.map((item) => <div key={item.id}><img src={item.productImage} alt="" /><p><strong>{item.quantity}× {item.productTitle}</strong><small>{item.artChoice} · {item.delivery}</small></p></div>)}</div><aside><span>Atualização</span><p>{order.productionNote || (order.status === "aguardando_orcamento" ? "Recebemos sua personalização. A equipe está calculando material, acabamento e entrega." : "Acompanhe aqui as próximas atualizações do pedido.")}</p>{order.total ? <strong>{order.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong> : <strong>Valor em análise</strong>}{order.status === "aguardando_pagamento" && <button type="button">Pagar com Mercado Pago</button>}</aside></div>
      <footer><a href={`https://wa.me/559899931619?text=${encodeURIComponent(`Olá, Área X! Gostaria de falar sobre o pedido ${order.id}.`)}`} target="_blank" rel="noreferrer">Falar sobre este pedido</a><span>As atualizações também serão enviadas por e-mail e WhatsApp.</span></footer>
    </article>
  );
}
