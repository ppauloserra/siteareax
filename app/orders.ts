import type { CartItem } from "./cart";

export const ORDER_STORAGE_KEY = "area-x-orders-v1";

export type OrderStatus =
  | "aguardando_orcamento"
  | "aguardando_pagamento"
  | "pagamento_confirmado"
  | "arte_em_aprovacao"
  | "em_producao"
  | "pronto"
  | "concluido";

export type Customer = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: string;
  city: string;
  notes?: string;
};

export type CustomerOrder = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  customer: Customer;
  total?: number;
  paymentMethod?: "pix" | "card";
  productionNote?: string;
};

export function loadOrders(): CustomerOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(ORDER_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CustomerOrder[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: CustomerOrder) {
  const current = loadOrders();
  window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify([order, ...current.filter((item) => item.id !== order.id)]));
}

export function makeOrderId() {
  const date = new Date();
  const part = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return `AX-${part}-${String(Date.now()).slice(-4)}`;
}

export const statusLabels: Record<OrderStatus, string> = {
  aguardando_orcamento: "Orçamento em análise",
  aguardando_pagamento: "Aguardando pagamento",
  pagamento_confirmado: "Pagamento confirmado",
  arte_em_aprovacao: "Arte em aprovação",
  em_producao: "Em produção",
  pronto: "Pronto para retirada ou envio",
  concluido: "Concluído",
};

export const productionSteps: { key: OrderStatus; short: string }[] = [
  { key: "aguardando_orcamento", short: "Orçamento" },
  { key: "aguardando_pagamento", short: "Pagamento" },
  { key: "arte_em_aprovacao", short: "Arte" },
  { key: "em_producao", short: "Produção" },
  { key: "pronto", short: "Pronto" },
];

export function statusPosition(status: OrderStatus) {
  if (status === "pagamento_confirmado") return 1;
  if (status === "concluido") return productionSteps.length - 1;
  return Math.max(0, productionSteps.findIndex((step) => step.key === status));
}
