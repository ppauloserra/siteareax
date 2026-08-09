"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StoreHeader from "../components/StoreHeader";
import { CartItem, loadCart, saveCart } from "../cart";

const emptyCustomer = { name: "", email: "", phone: "", cpf: "", address: "", city: "Santa Inês", notes: "" };

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function isValidCpf(value: string) {
  const cpf = value.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  const digit = (length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i += 1) sum += Number(cpf[i]) * (length + 1 - i);
    const result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
  };
  return digit(9) === Number(cpf[9]) && digit(10) === Number(cpf[10]);
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setItems(loadCart());
      try {
        const saved = window.localStorage.getItem("area-x-customer-v1");
        if (saved) setCustomer(JSON.parse(saved));
      } catch { /* dados locais inválidos são ignorados */ }
    });
    return () => { active = false; };
  }, []);

  const itemCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

  const updateItems = (next: CartItem[]) => {
    setItems(next);
    saveCart(next);
  };

  const changeQuantity = (id: string, delta: number) => updateItems(items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const removeItem = (id: string) => updateItems(items.filter((item) => item.id !== id));

  const finish = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!customer.name.trim()) nextErrors.name = "Informe seu nome completo";
    if (!isValidCpf(customer.cpf)) nextErrors.cpf = "Informe um CPF válido";
    if (!/^\S+@\S+\.\S+$/.test(customer.email)) nextErrors.email = "Informe um e-mail válido";
    if (customer.phone.replace(/\D/g, "").length < 10) nextErrors.phone = "Informe um WhatsApp válido";
    if (!customer.address.trim()) nextErrors.address = "Informe seu endereço";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    window.localStorage.setItem("area-x-customer-v1", JSON.stringify(customer));
    window.location.href = "/checkout";
  };

  return (
    <main className="cart-page">
      <StoreHeader />
      <section className="cart-hero"><span className="customizer-kicker">Seu pedido</span><h1>Carrinho de compras</h1><p>Confira seus produtos, ajuste as quantidades e finalize seus dados uma única vez.</p></section>

      {items.length === 0 ? <section className="empty-cart"><span className="empty-cart-icon">0</span><h2>Seu carrinho está vazio.</h2><p>Escolha um produto, personalize do seu jeito e adicione aqui.</p><Link className="next-button" href="/#produtos">Ver produtos</Link></section> :
      <form className="cart-layout" onSubmit={finish}>
        <section className="cart-content">
          <div className="cart-heading"><div><span>{itemCount} {itemCount === 1 ? "item" : "itens"}</span><h2>Produtos personalizados</h2></div><Link href="/#produtos">+ Adicionar outro produto</Link></div>
          <div className="cart-items">
            {items.map((item) => <article className="cart-item" key={item.id}>
              <img src={item.productImage} alt={item.productTitle} />
              <div className="cart-item-copy"><span>{item.model}</span><h3>{item.productTitle}</h3><p>{item.artChoice} · {item.delivery}</p><div className="cart-item-actions"><Link href={`/personalizar?produto=${item.productSlug}&editar=${item.id}`}>Editar personalização</Link><button type="button" onClick={() => removeItem(item.id)}>Remover</button></div></div>
              <div className="quantity-control" aria-label={`Quantidade de ${item.productTitle}`}><button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label="Diminuir quantidade">−</button><strong>{item.quantity}</strong><button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label="Aumentar quantidade">+</button></div>
            </article>)}
          </div>

          <section className="checkout-data"><div className="panel-heading"><span>Dados do comprador</span><h2>Preencha uma única vez</h2><p>Esses dados valem para todos os produtos do carrinho. O CPF é obrigatório para identificar o pedido.</p></div>
            <div className="customer-fields">
              <CartInput label="Nome completo" value={customer.name} error={errors.name} onChange={(value) => setCustomer({ ...customer, name: value })} placeholder="Nome e sobrenome" />
              <CartInput label="CPF" value={customer.cpf} error={errors.cpf} onChange={(value) => setCustomer({ ...customer, cpf: formatCpf(value) })} placeholder="000.000.000-00" note="Obrigatório" />
              <CartInput label="E-mail" value={customer.email} error={errors.email} onChange={(value) => setCustomer({ ...customer, email: value })} placeholder="seuemail@exemplo.com" type="email" />
              <CartInput label="WhatsApp" value={customer.phone} error={errors.phone} onChange={(value) => setCustomer({ ...customer, phone: formatPhone(value) })} placeholder="(98) 99999-9999" />
              <CartInput label="Endereço" value={customer.address} error={errors.address} onChange={(value) => setCustomer({ ...customer, address: value })} placeholder="Rua, número e bairro" full />
              <CartInput label="Cidade" value={customer.city} onChange={(value) => setCustomer({ ...customer, city: value })} placeholder="Cidade" />
              <label className="field full"><span>Observações <small>Opcional</small></span><textarea value={customer.notes} onChange={(event) => setCustomer({ ...customer, notes: event.target.value })} placeholder="Informações para entrega, instalação ou atendimento." /></label>
            </div>
          </section>
        </section>

        <aside className="cart-summary"><span>Resumo do pedido</span><h2>{itemCount} {itemCount === 1 ? "produto" : "produtos"}</h2><div className="cart-summary-list">{items.map((item) => <div key={item.id}><span>{item.quantity}× {item.productTitle}</span><strong>A calcular</strong></div>)}</div><div className="price-note"><span>Total</span><strong>Calculado após as escolhas</strong><small>Itens tabelados mostrarão o preço; projetos técnicos serão confirmados pela equipe.</small></div><label className="terms"><input type="checkbox" required /><span>Revisei o carrinho e autorizo o contato da Área X sobre este pedido.</span></label><button className="next-button cart-finish" type="submit">Continuar para pagamento</button><Link href="/#produtos">Continuar comprando</Link></aside>
      </form>}
    </main>
  );
}

function CartInput({ label, value, error, onChange, placeholder, type = "text", note, full }: { label: string; value: string; error?: string; onChange: (value: string) => void; placeholder: string; type?: string; note?: string; full?: boolean }) {
  return <label className={`field ${full ? "full" : ""} ${error ? "has-error" : ""}`}><span>{label} <b>*</b>{note && <small>{note}</small>}</span><input value={value} type={type} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />{error && <small className="field-error">{error}</small>}</label>;
}
