"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StoreHeader from "../components/StoreHeader";
import { CartItem, loadCart, saveCart } from "../cart";

type Option = { label: string; value: string; helper?: string };
type Field = {
  id: string;
  label: string;
  type: "choice" | "select" | "number" | "text" | "textarea";
  required?: boolean;
  placeholder?: string;
  suffix?: string;
  options?: Option[];
};
type ProductModel = {
  slug: string;
  title: string;
  model: string;
  eyebrow: string;
  description: string;
  image: string;
  fields: Field[];
};

const products: ProductModel[] = [
  {
    slug: "fachadas-em-acm",
    title: "Fachadas em ACM",
    model: "Modelo 1 · Fachadas",
    eyebrow: "Projeto sob medida",
    description: "Informe o espaço, o acabamento e a instalação. A equipe confere os detalhes antes de produzir.",
    image: "/products/fachada-02.jpg",
    fields: [
      { id: "largura", label: "Largura aproximada", type: "number", required: true, suffix: "m", placeholder: "Ex.: 4,50" },
      { id: "altura", label: "Altura aproximada", type: "number", required: true, suffix: "m", placeholder: "Ex.: 1,20" },
      { id: "material", label: "Material principal", type: "choice", required: true, options: [{ label: "ACM", value: "ACM" }, { label: "Acrílico", value: "Acrílico" }, { label: "PVC", value: "PVC" }, { label: "Quero orientação", value: "A definir" }] },
      { id: "iluminacao", label: "Iluminação", type: "choice", required: true, options: [{ label: "Sem iluminação", value: "Sem iluminação" }, { label: "LED interno", value: "LED interno" }, { label: "Refletores", value: "Refletores" }, { label: "A definir", value: "A definir" }] },
      { id: "instalacao", label: "Você precisa de instalação?", type: "choice", required: true, options: [{ label: "Sim", value: "Sim" }, { label: "Não", value: "Não" }, { label: "Quero avaliar", value: "A avaliar" }] },
      { id: "local", label: "Onde será instalada?", type: "text", required: true, placeholder: "Ex.: fachada térrea, centro de Santa Inês" },
    ],
  },
  {
    slug: "letreiros-e-totens",
    title: "Letreiros e totens",
    model: "Modelo 2 · Sinalização",
    eyebrow: "Presença e orientação",
    description: "Escolha o formato da peça, medidas, material e tipo de fixação.",
    image: "/products/totem-02.jpg",
    fields: [
      { id: "tipo", label: "Tipo de peça", type: "choice", required: true, options: [{ label: "Letreiro", value: "Letreiro" }, { label: "Letras-caixa", value: "Letras-caixa" }, { label: "Totem", value: "Totem" }, { label: "Placa", value: "Placa" }] },
      { id: "largura", label: "Largura", type: "number", required: true, suffix: "cm", placeholder: "Ex.: 120" },
      { id: "altura", label: "Altura", type: "number", required: true, suffix: "cm", placeholder: "Ex.: 60" },
      { id: "material", label: "Material", type: "select", required: true, options: [{ label: "Acrílico", value: "Acrílico" }, { label: "ACM", value: "ACM" }, { label: "PVC expandido", value: "PVC expandido" }, { label: "Metal", value: "Metal" }, { label: "Preciso de orientação", value: "A definir" }] },
      { id: "acabamento", label: "Acabamento", type: "choice", required: true, options: [{ label: "Fosco", value: "Fosco" }, { label: "Brilho", value: "Brilho" }, { label: "Luminoso", value: "Luminoso" }, { label: "A definir", value: "A definir" }] },
      { id: "fixacao", label: "Fixação", type: "choice", required: true, options: [{ label: "Parede", value: "Parede" }, { label: "Base própria", value: "Base própria" }, { label: "Suspenso", value: "Suspenso" }, { label: "Não sei", value: "A definir" }] },
      { id: "quantidade", label: "Quantidade", type: "number", required: true, suffix: "un.", placeholder: "1" },
    ],
  },
  {
    slug: "adesivos-e-envelopamento",
    title: "Adesivos e envelopamento",
    model: "Modelo 3 · Adesivos",
    eyebrow: "Transforme superfícies",
    description: "Conte onde será aplicado e escolha material, acabamento e instalação.",
    image: "/products/adesivo-02.jpg",
    fields: [
      { id: "aplicacao", label: "Aplicação", type: "choice", required: true, options: [{ label: "Vitrine", value: "Vitrine" }, { label: "Parede", value: "Parede" }, { label: "Veículo", value: "Veículo" }, { label: "Rótulo/etiqueta", value: "Rótulo/etiqueta" }] },
      { id: "largura", label: "Largura", type: "number", required: true, suffix: "cm", placeholder: "Ex.: 100" },
      { id: "altura", label: "Altura", type: "number", required: true, suffix: "cm", placeholder: "Ex.: 80" },
      { id: "material", label: "Tipo de adesivo", type: "select", required: true, options: [{ label: "Branco", value: "Adesivo branco" }, { label: "Transparente", value: "Adesivo transparente" }, { label: "Perfurado", value: "Adesivo perfurado" }, { label: "Recorte", value: "Adesivo de recorte" }, { label: "A definir", value: "A definir" }] },
      { id: "acabamento", label: "Acabamento", type: "choice", required: true, options: [{ label: "Fosco", value: "Fosco" }, { label: "Brilho", value: "Brilho" }, { label: "Laminado", value: "Laminado" }, { label: "Sem laminação", value: "Sem laminação" }] },
      { id: "instalacao", label: "Aplicação pela Área X", type: "choice", required: true, options: [{ label: "Sim", value: "Sim" }, { label: "Não", value: "Não" }, { label: "Quero orçamento", value: "A avaliar" }] },
      { id: "quantidade", label: "Quantidade", type: "number", required: true, suffix: "un.", placeholder: "1" },
    ],
  },
  {
    slug: "banners-lonas-paineis",
    title: "Banners, lonas e painéis",
    model: "Modelo 4 · Grandes formatos",
    eyebrow: "Impacto em grande escala",
    description: "Defina formato, tamanho, material e acabamento da peça.",
    image: "/products/banner-02.jpg",
    fields: [
      { id: "tipo", label: "Produto", type: "choice", required: true, options: [{ label: "Banner", value: "Banner" }, { label: "Lona", value: "Lona" }, { label: "Faixa", value: "Faixa" }, { label: "Painel/Backdrop", value: "Painel/Backdrop" }] },
      { id: "largura", label: "Largura", type: "number", required: true, suffix: "m", placeholder: "Ex.: 2,00" },
      { id: "altura", label: "Altura", type: "number", required: true, suffix: "m", placeholder: "Ex.: 1,00" },
      { id: "material", label: "Material", type: "select", required: true, options: [{ label: "Lona 440g", value: "Lona 440g" }, { label: "Lona frontlight", value: "Lona frontlight" }, { label: "Tecido", value: "Tecido" }, { label: "A definir", value: "A definir" }] },
      { id: "acabamento", label: "Acabamento", type: "choice", required: true, options: [{ label: "Ilhós", value: "Ilhós" }, { label: "Bastão e corda", value: "Bastão e corda" }, { label: "Reforço nas bordas", value: "Reforço nas bordas" }, { label: "Sem acabamento", value: "Sem acabamento" }] },
      { id: "quantidade", label: "Quantidade", type: "number", required: true, suffix: "un.", placeholder: "1" },
    ],
  },
  {
    slug: "impressos-graficos",
    title: "Impressos gráficos",
    model: "Modelo 5 · Impressos",
    eyebrow: "Sua marca em cada detalhe",
    description: "Escolha formato, papel, impressão, acabamento e tiragem.",
    image: "/products/impressos-02.jpg",
    fields: [
      { id: "tipo", label: "Produto", type: "choice", required: true, options: [{ label: "Cartão de visita", value: "Cartão de visita" }, { label: "Panfleto", value: "Panfleto" }, { label: "Folder", value: "Folder" }, { label: "Papelaria", value: "Papelaria" }] },
      { id: "formato", label: "Formato", type: "select", required: true, options: [{ label: "9 × 5 cm", value: "9 × 5 cm" }, { label: "A6", value: "A6" }, { label: "A5", value: "A5" }, { label: "A4", value: "A4" }, { label: "Personalizado", value: "Personalizado" }] },
      { id: "papel", label: "Papel", type: "select", required: true, options: [{ label: "Couchê 115g", value: "Couchê 115g" }, { label: "Couchê 170g", value: "Couchê 170g" }, { label: "Couchê 250g", value: "Couchê 250g" }, { label: "Offset", value: "Offset" }, { label: "A definir", value: "A definir" }] },
      { id: "impressao", label: "Impressão", type: "choice", required: true, options: [{ label: "Só frente", value: "Só frente" }, { label: "Frente e verso", value: "Frente e verso" }] },
      { id: "acabamento", label: "Acabamento", type: "choice", required: true, options: [{ label: "Sem acabamento", value: "Sem acabamento" }, { label: "Laminação fosca", value: "Laminação fosca" }, { label: "Verniz localizado", value: "Verniz localizado" }, { label: "Dobras", value: "Dobras" }] },
      { id: "quantidade", label: "Quantidade", type: "select", required: true, options: [{ label: "100 unidades", value: "100" }, { label: "250 unidades", value: "250" }, { label: "500 unidades", value: "500" }, { label: "1.000 unidades", value: "1000" }, { label: "Outra", value: "Outra" }] },
    ],
  },
  {
    slug: "embalagens-pdv",
    title: "Embalagens e materiais de PDV",
    model: "Modelo 6 · Embalagens e PDV",
    eyebrow: "Pronto para encantar",
    description: "Detalhe o modelo, as medidas, o material e a quantidade necessária.",
    image: "/products/pdv-02.jpg",
    fields: [
      { id: "tipo", label: "Produto", type: "choice", required: true, options: [{ label: "Caixa", value: "Caixa" }, { label: "Sacola", value: "Sacola" }, { label: "Display", value: "Display" }, { label: "Tag/rótulo", value: "Tag/rótulo" }] },
      { id: "largura", label: "Largura", type: "number", required: true, suffix: "cm", placeholder: "Ex.: 20" },
      { id: "altura", label: "Altura", type: "number", required: true, suffix: "cm", placeholder: "Ex.: 12" },
      { id: "profundidade", label: "Profundidade", type: "number", required: true, suffix: "cm", placeholder: "Ex.: 6" },
      { id: "material", label: "Material", type: "select", required: true, options: [{ label: "Papel cartão", value: "Papel cartão" }, { label: "Kraft", value: "Kraft" }, { label: "PVC", value: "PVC" }, { label: "Acrílico", value: "Acrílico" }, { label: "A definir", value: "A definir" }] },
      { id: "acabamento", label: "Acabamento", type: "choice", required: true, options: [{ label: "Fosco", value: "Fosco" }, { label: "Brilho", value: "Brilho" }, { label: "Hot stamping", value: "Hot stamping" }, { label: "Sem acabamento", value: "Sem acabamento" }] },
      { id: "quantidade", label: "Quantidade", type: "number", required: true, suffix: "un.", placeholder: "Ex.: 100" },
    ],
  },
];

const steps = ["Personalização", "Arte", "Recebimento", "Revisão"];

export default function PersonalizarPage() {
  const [productSlug, setProductSlug] = useState("fachadas-em-acm");
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [artChoice, setArtChoice] = useState("");
  const [artBrief, setArtBrief] = useState("");
  const [fileName, setFileName] = useState("");
  const [delivery, setDelivery] = useState("");
  const [editingId, setEditingId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      const params = new URLSearchParams(window.location.search);
      const requested = params.get("produto");
      if (products.some((item) => item.slug === requested)) setProductSlug(requested as string);
      const editId = params.get("editar");
      if (editId) {
        const existing = loadCart().find((item) => item.id === editId);
        if (existing) {
          setEditingId(existing.id);
          setProductSlug(existing.productSlug);
          setValues(existing.values);
          setArtChoice(existing.artChoice);
          setArtBrief(existing.artBrief);
          setFileName(existing.fileName);
          setDelivery(existing.delivery);
        }
      }
    });
    return () => { active = false; };
  }, []);

  const product = useMemo(() => products.find((item) => item.slug === productSlug) ?? products[0], [productSlug]);

  const setValue = (id: string, value: string) => {
    setValues((current) => ({ ...current, [id]: value }));
    setErrors((current) => ({ ...current, [id]: "" }));
  };

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};
    if (step === 0) product.fields.forEach((field) => { if (field.required && !values[field.id]?.trim()) nextErrors[field.id] = "Preencha este campo"; });
    if (step === 1) {
      if (!artChoice) nextErrors.artChoice = "Escolha como deseja enviar a arte";
      if ((artChoice === "Tenho a arte" || artChoice === "Preciso de ajustes") && !fileName) nextErrors.file = "Selecione o arquivo da arte";
      if (artChoice === "Quero que a Área X crie" && !artBrief.trim()) nextErrors.artBrief = "Conte um pouco sobre a arte desejada";
    }
    if (step === 2 && !delivery) nextErrors.delivery = "Escolha como deseja receber";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => { if (validateStep()) { setStep((current) => Math.min(current + 1, 3)); window.scrollTo({ top: 0, behavior: "smooth" }); } };
  const back = () => { setStep((current) => Math.max(current - 1, 0)); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const switchProduct = (slug: string) => {
    setProductSlug(slug);
    setValues({}); setArtChoice(""); setArtBrief(""); setFileName(""); setDelivery(""); setEditingId(""); setStep(0); setErrors({}); setComplete(false);
    window.history.replaceState({}, "", `/personalizar?produto=${slug}`);
  };

  const finish = (event: FormEvent) => {
    event.preventDefault();
    const item: CartItem = {
      id: editingId || `${product.slug}-${Date.now()}`,
      productSlug: product.slug,
      productTitle: product.title,
      productImage: product.image,
      model: product.model,
      values,
      artChoice,
      artBrief,
      fileName,
      delivery,
      quantity: 1,
      createdAt: new Date().toISOString(),
    };
    const current = loadCart();
    saveCart(editingId ? current.map((stored) => stored.id === editingId ? { ...item, quantity: stored.quantity } : stored) : [...current, item]);
    setComplete(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (complete) {
    return (
      <main className="customizer-page">
        <StoreHeader />
        <section className="success-card">
          <span className="success-mark">✓</span><span className="customizer-kicker">Adicionado ao carrinho</span>
          <h1>{product.title} está no <em>seu carrinho.</em></h1>
          <p>Você pode adicionar outros produtos e preencher seus dados, incluindo o CPF obrigatório, apenas uma vez no fechamento.</p>
          <div className="success-actions"><Link className="next-button" href="/#produtos">Continuar comprando</Link><Link className="ghost-button" href="/carrinho">Ver carrinho</Link></div>
          <small>O carrinho fica salvo apenas neste dispositivo durante esta versão de aprovação.</small>
        </section>
      </main>
    );
  }

  return (
    <main className="customizer-page">
      <StoreHeader />

      <section className="customizer-hero">
        <div><span className="customizer-kicker">{product.model}</span><h1>Do seu jeito, <em>sem complicação.</em></h1><p>Responda apenas o necessário. Suas escolhas ficam organizadas para a equipe produzir corretamente.</p></div>
        <div className="product-switcher"><label htmlFor="product-select">Produto selecionado</label><select id="product-select" value={productSlug} onChange={(event) => switchProduct(event.target.value)}>{products.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}</select></div>
      </section>

      <nav className="stepper" aria-label="Etapas da personalização">
        {steps.map((item, index) => <button type="button" key={item} className={index === step ? "active" : index < step ? "done" : ""} onClick={() => index < step && setStep(index)}><span>{index < step ? "✓" : index + 1}</span><strong>{item}</strong></button>)}
      </nav>

      <form className="customizer-layout" onSubmit={finish}>
        <section className="form-panel">
          {step === 0 && <>
            <div className="panel-heading"><span>{product.eyebrow}</span><h2>Personalize {product.title}</h2><p>{product.description}</p></div>
            <div className="dynamic-fields">
              {product.fields.map((field) => <FieldControl field={field} value={values[field.id] ?? ""} error={errors[field.id]} onChange={(value) => setValue(field.id, value)} key={field.id} />)}
              <label className="field full"><span>Observações do produto <small>Opcional</small></span><textarea value={values.observacoes ?? ""} onChange={(event) => setValue("observacoes", event.target.value)} placeholder="Conte algum detalhe importante que não apareceu acima." /></label>
            </div>
          </>}

          {step === 1 && <>
            <div className="panel-heading"><span>Etapa 2</span><h2>Como será a arte?</h2><p>Escolha uma opção. Os campos se adaptam automaticamente.</p></div>
            <div className="large-choices">
              {[{ title: "Tenho a arte pronta", value: "Tenho a arte", text: "Envie o arquivo final para conferência." }, { title: "Preciso de pequenos ajustes", value: "Preciso de ajustes", text: "Envie sua arte e explique o que precisa mudar." }, { title: "Quero que a Área X crie", value: "Quero que a Área X crie", text: "Conte sua ideia e nossa equipe prepara a criação." }].map((option) => <button type="button" className={artChoice === option.value ? "selected" : ""} onClick={() => { setArtChoice(option.value); setErrors({}); }} key={option.value}><span>{artChoice === option.value ? "✓" : "+"}</span><strong>{option.title}</strong><small>{option.text}</small></button>)}
            </div>
            {errors.artChoice && <p className="field-error standalone">{errors.artChoice}</p>}
            {artChoice && <div className="art-fields">
              {(artChoice === "Tenho a arte" || artChoice === "Preciso de ajustes") && <label className={`upload-zone ${errors.file ? "has-error" : ""}`}><input type="file" accept=".pdf,.png,.jpg,.jpeg,.svg,.cdr,.ai,.eps" onChange={(event: ChangeEvent<HTMLInputElement>) => { setFileName(event.target.files?.[0]?.name ?? ""); setErrors((current) => ({ ...current, file: "" })); }} /><span>{fileName ? "Arquivo selecionado" : "Clique para escolher sua arte"}</span><strong>{fileName || "PDF, PNG, JPG, SVG, CDR, AI ou EPS"}</strong><small>O arquivo será enviado de verdade quando conectarmos o armazenamento da loja.</small>{errors.file && <em>{errors.file}</em>}</label>}
              {(artChoice === "Preciso de ajustes" || artChoice === "Quero que a Área X crie") && <label className="field full"><span>{artChoice === "Preciso de ajustes" ? "Quais ajustes você precisa?" : "Conte como imagina sua arte"}</span><textarea value={artBrief} onChange={(event) => { setArtBrief(event.target.value); setErrors((current) => ({ ...current, artBrief: "" })); }} placeholder="Cores, textos, referências, estilo e tudo que possa ajudar nossa equipe." />{errors.artBrief && <small className="field-error">{errors.artBrief}</small>}</label>}
            </div>}
          </>}

          {step === 2 && <>
            <div className="panel-heading"><span>Etapa 3</span><h2>Como você quer receber?</h2><p>O valor de entrega ou instalação será confirmado conforme a distância e o tamanho da peça.</p></div>
            <div className="delivery-choices">
              {[{ title: "Retirada na loja", value: "Retirada na loja", text: "Retire gratuitamente na Área X em Santa Inês." }, { title: "Entrega local", value: "Entrega local", text: "Receba no endereço informado. Frete calculado depois." }, { title: "Entrega + instalação", value: "Entrega + instalação", text: "A equipe leva e instala. Disponibilidade sob análise." }].map((option) => <button type="button" className={delivery === option.value ? "selected" : ""} onClick={() => { setDelivery(option.value); setErrors({}); }} key={option.value}><span>{delivery === option.value ? "✓" : "○"}</span><strong>{option.title}</strong><small>{option.text}</small></button>)}
            </div>{errors.delivery && <p className="field-error standalone">{errors.delivery}</p>}
          </>}

          {step === 3 && <>
            <div className="panel-heading"><span>Última etapa</span><h2>Revise antes de continuar</h2><p>Se precisar corrigir algo, volte pela barra de etapas acima.</p></div>
            <div className="review-groups">
              <ReviewGroup title="Produto e personalização" items={[["Produto", product.title], ...product.fields.map((field) => [field.label, values[field.id] || "—"]), ["Observações", values.observacoes || "Nenhuma"]]} />
              <ReviewGroup title="Arte e recebimento" items={[["Arte", artChoice], ["Arquivo", fileName || "Não necessário"], ["Recebimento", delivery]]} />
            </div>
            <div className="privacy-note"><strong>Dados pessoais depois</strong><span>Nome, contato, endereço e CPF obrigatório serão solicitados uma única vez no carrinho, mesmo que você adicione vários produtos.</span></div>
            <label className="terms"><input type="checkbox" required /><span>Confirmo que revisei a personalização deste produto.</span></label>
          </>}

          <div className="form-actions">{step > 0 ? <button type="button" className="back-button" onClick={back}>Voltar</button> : <Link className="back-button" href="/#produtos">Voltar aos produtos</Link>}{step < 3 ? <button type="button" className="next-button" onClick={next}>Continuar</button> : <button type="submit" className="next-button">{editingId ? "Salvar alterações" : "Adicionar ao carrinho"}</button>}</div>
        </section>

        <aside className="order-summary">
          <div className="summary-image"><img src={product.image} alt={product.title} /><span>{product.model}</span></div>
          <h2>{product.title}</h2><p>Resumo atualizado conforme você preenche.</p>
          <dl>{product.fields.slice(0, 4).map((field) => values[field.id] && <div key={field.id}><dt>{field.label}</dt><dd>{values[field.id]}</dd></div>)}{artChoice && <div><dt>Arte</dt><dd>{artChoice}</dd></div>}{delivery && <div><dt>Recebimento</dt><dd>{delivery}</dd></div>}</dl>
          <div className="price-note"><span>Valor do pedido</span><strong>Calculado após as escolhas</strong><small>Na versão final, produtos com preço tabelado mostrarão o total aqui. Projetos técnicos receberão orçamento.</small></div>
          <a href="https://wa.me/559899931619?text=Olá%2C%20Área%20X!%20Preciso%20de%20ajuda%20para%20personalizar%20um%20produto." target="_blank" rel="noreferrer">Precisa de ajuda? Fale com a Área X</a>
        </aside>
      </form>
    </main>
  );
}

function FieldControl({ field, value, error, onChange }: { field: Field; value: string; error?: string; onChange: (value: string) => void }) {
  if (field.type === "choice") return <fieldset className={`choice-field ${error ? "has-error" : ""}`}><legend>{field.label}{field.required && <b>*</b>}</legend><div>{field.options?.map((option) => <button type="button" className={value === option.value ? "selected" : ""} onClick={() => onChange(option.value)} key={option.value}>{option.label}</button>)}</div>{error && <small className="field-error">{error}</small>}</fieldset>;
  if (field.type === "select") return <label className={`field ${error ? "has-error" : ""}`}><span>{field.label}{field.required && <b>*</b>}</span><select value={value} onChange={(event) => onChange(event.target.value)}><option value="">Selecione</option>{field.options?.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}</select>{error && <small className="field-error">{error}</small>}</label>;
  return <label className={`field ${error ? "has-error" : ""}`}><span>{field.label}{field.required && <b>*</b>}</span><div className="input-with-suffix"><input type={field.type === "number" ? "text" : field.type} inputMode={field.type === "number" ? "decimal" : undefined} value={value} onChange={(event) => onChange(event.target.value)} placeholder={field.placeholder} />{field.suffix && <i>{field.suffix}</i>}</div>{error && <small className="field-error">{error}</small>}</label>;
}

function ReviewGroup({ title, items }: { title: string; items: string[][] }) {
  return <section><h3>{title}</h3><dl>{items.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>;
}
