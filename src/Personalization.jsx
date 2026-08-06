import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, FileUp, MessageCircle, UploadCloud, X } from "lucide-react";
import "./personalization.css";

const WHATSAPP_NUMBER = "5598984337544";

const templates = {
  facade: {
    label: "Fachadas e letras-caixa",
    intro: "Configure os detalhes iniciais. A equipe técnica continuará o atendimento pelo WhatsApp.",
    choicesLabel: "Escolha o tipo de projeto",
    choices: ["Fachada em ACM", "Letra-caixa", "Letreiro luminoso", "Letras recortadas", "Neon LED", "Projeto especial"],
    fields: [
      ["width", "Largura aproximada", "number", "cm"], ["height", "Altura aproximada", "number", "cm"],
      ["material", "Material preferido", "select", ["Quero recomendação", "ACM", "Acrílico", "PVC expandido", "Aço inox"]],
      ["lighting", "Iluminação", "select", ["Sem iluminação", "LED frontal", "LED lateral", "LED traseiro", "LED total"]],
      ["installation", "Precisa de instalação?", "select", ["Sim", "Não", "Ainda não sei"]]
    ],
    whatsapp: true
  },
  sticker: {
    label: "Adesivos e envelopamento",
    intro: "Defina material, acabamento, recorte e medidas para preparar seu adesivo.",
    choicesLabel: "Escolha o tipo de adesivo",
    choices: ["Vinil branco", "Transparente", "Perfurado", "Jateado", "Recorte eletrônico", "Envelopamento"],
    fields: [
      ["width", "Largura", "number", "cm"], ["height", "Altura", "number", "cm"],
      ["finish", "Acabamento", "select", ["Brilho", "Fosco", "Sem laminação", "Quero recomendação"]],
      ["cut", "Tipo de corte", "select", ["Reto", "Contorno personalizado", "Meio-corte", "Recorte eletrônico"]],
      ["application", "Onde será aplicado?", "select", ["Vidro", "Parede", "Veículo", "Embalagem", "Placa", "Outro"]],
      ["quantity", "Quantidade", "number", "un."]
    ]
  },
  print: {
    label: "Impressos em papel",
    intro: "Escolha papel, gramatura, impressão, acabamento e quantidade do seu material.",
    choicesLabel: "Escolha o tipo de impresso",
    choices: ["Cartão de visita", "Panfleto", "Folder", "Papel timbrado", "Tag", "Cardápio"],
    fields: [
      ["format", "Formato", "select", ["9 × 5 cm", "10 × 15 cm", "A6", "A5", "A4", "Personalizado"]],
      ["paper", "Papel", "select", ["Couchê brilho", "Couchê fosco", "Offset", "Reciclato", "Papel especial"]],
      ["weight", "Gramatura", "select", ["90 g", "115 g", "150 g", "250 g", "300 g"]],
      ["sides", "Impressão", "select", ["Frente colorida", "Frente e verso coloridos", "Frente colorida e verso preto"]],
      ["finish", "Acabamento", "select", ["Sem acabamento extra", "Laminação brilho", "Laminação fosca", "Verniz localizado", "Dobra"]],
      ["quantity", "Quantidade", "select", ["100", "250", "500", "1.000", "2.500", "5.000"]]
    ]
  },
  banner: {
    label: "Banners, lonas e painéis",
    intro: "Informe o tamanho final, o material e o acabamento para seu produto em grande formato.",
    choicesLabel: "Escolha o formato",
    choices: ["Banner", "Faixa", "Lona para painel", "Backdrop", "Wind banner", "Painel de festa"],
    fields: [
      ["width", "Largura", "number", "cm"], ["height", "Altura", "number", "cm"],
      ["material", "Material", "select", ["Lona frontlight 440 g", "Lona blackout", "Tecido", "Quero recomendação"]],
      ["finish", "Acabamento", "select", ["Bastão e cordão", "Ilhós a cada 50 cm", "Ilhós nos cantos", "Sem acabamento"]],
      ["environment", "Local de uso", "select", ["Ambiente interno", "Ambiente externo", "Evento temporário"]],
      ["quantity", "Quantidade", "number", "un."]
    ]
  },
  sign: {
    label: "Placas e sinalização",
    intro: "Defina material, espessura, formato e fixação da sua placa personalizada.",
    choicesLabel: "Escolha a finalidade da placa",
    choices: ["Placa comercial", "Sinalização", "Placa Pix", "Placa de horário", "Número residencial", "Placa de obra"],
    fields: [
      ["width", "Largura", "number", "cm"], ["height", "Altura", "number", "cm"],
      ["material", "Material", "select", ["PVC expandido", "ACM", "Acrílico", "PS", "Quero recomendação"]],
      ["thickness", "Espessura", "select", ["1 mm", "2 mm", "3 mm", "5 mm", "10 mm", "Conforme recomendação"]],
      ["cut", "Formato do corte", "select", ["Retangular", "Redondo", "Contorno personalizado"]],
      ["fixing", "Tipo de fixação", "select", ["Fita dupla face", "Furos para parafuso", "Espaçadores", "Sem fixação", "Quero recomendação"]],
      ["quantity", "Quantidade", "number", "un."]
    ]
  }
};

const categoryTemplates = {
  fachadas: "facade", sinalizacao: "sign", adesivos: "sticker", veicular: "sticker", decoracao: "sticker",
  lonas: "banner", eventos: "banner", impressos: "print", papelaria: "print", embalagens: "print",
  lojas: "sign", brindes: "print"
};

function DynamicField({ field }) {
  const [name, label, type, detail] = field;
  return <label className="px-field"><span>{label}</span><div className="px-input-wrap">
    {type === "select" ? <select name={name} required defaultValue=""><option value="" disabled>Selecione</option>{detail.map((option) => <option key={option}>{option}</option>)}</select> : <input name={name} type="number" min="1" step="any" placeholder="0" required />}
    {type !== "select" && <em>{detail}</em>}
  </div></label>;
}

function ArtworkBox({ mode, setMode, file, setFile, error }) {
  const fileInput = useRef(null);
  const accepted = ["pdf", "png", "jpg", "jpeg", "ai", "eps", "svg", "cdr", "psd"];
  const chooseFile = (candidate) => {
    if (!candidate) return;
    const extension = candidate.name.split(".").pop()?.toLowerCase();
    if (accepted.includes(extension) && candidate.size <= 25 * 1024 * 1024) setFile(candidate);
    else setFile(null);
  };
  return <section className="px-artwork" id="arte"><div><h3>Você já tem a arte?</h3><p>Escolha uma opção para continuarmos.</p></div>
    <div className="px-art-options">
      <button type="button" className={mode === "ready" ? "active" : ""} onClick={() => { setMode("ready"); setFile(null); }}>Já tenho a arte</button>
      <button type="button" className={mode === "create" ? "active" : ""} onClick={() => { setMode("create"); setFile(null); }}>Quero que criem</button>
      <button type="button" className={mode === "adjust" ? "active" : ""} onClick={() => { setMode("adjust"); setFile(null); }}>Preciso ajustar</button>
    </div>
    {mode === "ready" && <div className="px-drop" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); chooseFile(event.dataTransfer.files[0]); }}>
      <input ref={fileInput} type="file" accept=".pdf,.png,.jpg,.jpeg,.ai,.eps,.svg,.cdr,.psd" onChange={(event) => chooseFile(event.target.files?.[0])} />
      {file ? <><Check size={30} /><b>{file.name}</b><small>{(file.size / 1024 / 1024).toFixed(1)} MB</small><button type="button" onClick={() => setFile(null)}><X size={15} /> Remover</button></> : <><UploadCloud size={38} /><b>Envie sua arte pronta</b><span>Arraste aqui ou <button type="button" onClick={() => fileInput.current?.click()}>selecione no computador</button></span><small>PDF, PNG, JPG, AI, EPS, SVG, CDR ou PSD · até 25 MB</small></>}
    </div>}
    {mode === "create" && <div className="px-art-message"><b>A Área X cria para você.</b> Descreva nas observações o texto, as cores e a ideia.</div>}
    {mode === "adjust" && <div className="px-art-message"><b>Vamos ajustar sua arte.</b> Conte nas observações o que precisa mudar.</div>}
    {error && <p className="px-error">{error}</p>}
  </section>;
}

export default function Personalization({ product, onBack }) {
  const templateKey = categoryTemplates[product.category] || "print";
  const template = templates[templateKey];
  const [choice, setChoice] = useState(0);
  const [artMode, setArtMode] = useState("");
  const [artFile, setArtFile] = useState(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [result]);
  const selected = template.choices[choice];

  const submit = (event) => {
    event.preventDefault();
    if (!artMode || (artMode === "ready" && !artFile)) {
      setError(!artMode ? "Escolha como deseja preparar a arte." : "Selecione o arquivo da arte para continuar.");
      document.getElementById("arte")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const form = new FormData(event.currentTarget);
    const details = template.fields.map(([name, label, type, detail]) => `${label}: ${form.get(name)}${type === "number" ? ` ${detail}` : ""}`);
    setResult({
      number: `AX-${Math.floor(10000 + Math.random() * 89999)}`,
      name: form.get("name"), phone: form.get("phone"), notes: form.get("notes"), details,
      artwork: artMode === "ready" ? `Arte pronta: ${artFile.name}` : artMode === "create" ? "Criação pela Área X" : "Ajuste de arte"
    });
  };

  const whatsappUrl = useMemo(() => {
    if (!result) return "#";
    const message = `Olá! Configurei um pedido no site da Área X.\n\nPedido: ${result.number}\nCliente: ${result.name}\nProduto: ${product.name}\nModelo: ${selected}\n${result.details.join("\n")}\n${result.artwork}\nObservações: ${result.notes || "Nenhuma"}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [product.name, result, selected]);

  useEffect(() => {
    if (!result || !template.whatsapp) return undefined;
    const timer = window.setTimeout(() => window.location.assign(whatsappUrl), 6000);
    return () => window.clearTimeout(timer);
  }, [result, template.whatsapp, whatsappUrl]);

  if (result) return <div className="px-shell"><header className="px-header"><button onClick={onBack}><ArrowLeft size={19} /> Voltar ao catálogo</button><span className="px-logo">ÁREA<b>X</b></span></header><main className="px-confirm">
    <div className="px-check"><Check size={36} /></div><span>Personalização concluída</span><h1>Tudo pronto, {result.name}!</h1>
    <p>{template.whatsapp ? "Esse projeto precisa de análise técnica. Estamos redirecionando você ao WhatsApp do setor de personalização." : "Sua configuração está organizada. Envie o resumo ao atendimento para a conferência final da arte e do orçamento."}</p>
    <div className="px-order"><small>Número do pedido</small><b>{result.number}</b><span>{product.name} · {selected}</span></div>
    <a className="px-whatsapp" href={whatsappUrl}><MessageCircle size={20} /> {template.whatsapp ? "Continuar no WhatsApp" : "Enviar configuração à Área X"}</a>
    {artMode === "ready" && <small className="px-file-note"><FileUp size={15} /> No WhatsApp, anexe também o arquivo <b>{artFile.name}</b>.</small>}
    <button className="px-edit" onClick={() => setResult(null)}>Voltar e editar</button>
  </main></div>;

  return <div className="px-shell"><header className="px-header"><button onClick={onBack}><ArrowLeft size={19} /> Voltar ao catálogo</button><span className="px-logo">ÁREA<b>X</b></span><a href="#formulario">Finalizar pedido</a></header>
    <main className="px-layout"><section className="px-product"><span className="px-kicker">Personalize seu pedido</span><h1>{product.name}</h1><p className="px-intro">{template.intro}</p>
      <div className={`px-hero px-${templateKey}`}><span>{product.name}</span></div>
      <h2>{template.choicesLabel}</h2><div className="px-choice-grid">{template.choices.map((item, index) => <button type="button" key={item} className={choice === index ? "active" : ""} onClick={() => setChoice(index)}><b>{item}</b><span>{choice === index ? "Selecionado" : "Escolher modelo"}</span></button>)}</div>
      <ArtworkBox mode={artMode} setMode={(value) => { setArtMode(value); setError(""); }} file={artFile} setFile={(value) => { setArtFile(value); setError(""); }} error={error} />
    </section>
    <aside id="formulario"><form className="px-form" onSubmit={submit}><span className="px-form-kicker">{template.label}</span><h2>Personalize seu pedido</h2><div className="px-selected"><small>Opção escolhida</small><b>{selected}</b></div>
      {template.fields.map((field) => <DynamicField field={field} key={field[0]} />)}
      <label className="px-field"><span>Observações</span><textarea name="notes" placeholder="Cores, prazo e outros detalhes importantes" /></label>
      <div className="px-contact"><h3>Seus dados</h3><label className="px-field"><span>Nome</span><input name="name" required autoComplete="name" /></label><label className="px-field"><span>E-mail</span><input name="email" type="email" required autoComplete="email" /></label><label className="px-field"><span>Telefone</span><input name="phone" type="tel" required autoComplete="tel" /></label></div>
      <button className="px-submit" type="submit">{template.whatsapp ? "Continuar personalização" : "Confirmar meu pedido"}</button><small className="px-privacy">A produção só começa após conferência da arte e aprovação do cliente.</small>
    </form></aside></main></div>;
}

export function canPersonalize(product) {
  return Boolean(categoryTemplates[product.category]);
}
