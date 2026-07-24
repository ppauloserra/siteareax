import React, { useMemo, useState } from "react";
import {
  Search, X, ArrowRight, Building2, SignpostBig, Sticker, Image,
  Printer, BriefcaseBusiness, Store, PartyPopper, PackageOpen, PanelsTopLeft,
  Car, Gift, Settings2, Sparkles, CheckCircle2, MessageCircle, ChevronRight
} from "lucide-react";

const WHATSAPP = "https://wa.me/5598984337544?text=";

const categories = [
  { id: "fachadas", name: "Fachadas e letreiros", icon: Building2, tone: "orange" },
  { id: "sinalizacao", name: "Placas e sinalização", icon: SignpostBig, tone: "blue" },
  { id: "adesivos", name: "Adesivos e envelopamento", icon: Sticker, tone: "violet" },
  { id: "lonas", name: "Banners, lonas e painéis", icon: Image, tone: "cyan" },
  { id: "impressos", name: "Cartões, panfletos e impressos", icon: Printer, tone: "red" },
  { id: "papelaria", name: "Papelaria empresarial", icon: BriefcaseBusiness, tone: "slate" },
  { id: "lojas", name: "Displays e materiais para lojas", icon: Store, tone: "amber" },
  { id: "eventos", name: "Eventos e festas", icon: PartyPopper, tone: "pink" },
  { id: "embalagens", name: "Embalagens, caixas e etiquetas", icon: PackageOpen, tone: "green" },
  { id: "decoracao", name: "Decoração de ambientes", icon: PanelsTopLeft, tone: "indigo" },
  { id: "veicular", name: "Comunicação veicular", icon: Car, tone: "lime" },
  { id: "brindes", name: "Brindes e personalizados", icon: Gift, tone: "rose" },
  { id: "servicos", name: "Serviços gráficos", icon: Settings2, tone: "gray" }
];

const product = (id, name, category, niche, description, aliases = [], featured = false) => ({
  id, name, category, niche, description, aliases, featured
});

const products = [
  product("fachada-acm", "Fachada em ACM", "fachadas", "Lojas e empresas", "Revestimento moderno, resistente e feito sob medida.", ["fachada aluminio", "acm", "revestimento loja"], true),
  product("letreiro-luminoso", "Letreiro luminoso", "fachadas", "Lojas e empresas", "Letreiro de alta visibilidade com iluminação interna ou externa.", ["luminoso", "placa iluminada", "letreiro led"], true),
  product("letra-caixa", "Letras-caixa", "fachadas", "Lojas e empresas", "Letras em relevo produzidas em ACM, acrílico, PVC ou metal.", ["letra caixa", "letras 3d", "letra bloco"], true),
  product("letras-recortadas", "Letras recortadas", "fachadas", "Lojas e empresas", "Letras e logotipos recortados para fachadas e ambientes.", ["letra pvc", "letra acrilico", "logo recortado"]),
  product("fachada-lona", "Fachada em lona", "fachadas", "Comércio local", "Solução versátil e econômica para identificação comercial.", ["fachada frontlight", "lona em estrutura"]),
  product("fachada-pvc", "Fachada em PVC", "fachadas", "Comércio local", "Comunicação leve, personalizada e com ótimo acabamento.", ["fachada pvc expandido"]),
  product("neon-led", "Neon LED personalizado", "fachadas", "Ambientes e lojas", "Frases, símbolos e logotipos luminosos personalizados.", ["neon", "led neon", "placa neon"]),
  product("testeira-loja", "Testeira de loja", "fachadas", "Lojas e franquias", "Identificação frontal para pontos comerciais e quiosques.", ["testeira", "cabeceira loja"]),
  product("portico", "Pórticos e estruturas", "fachadas", "Empresas e eventos", "Estruturas de entrada, identificação e comunicação em grande formato.", ["portal", "portico evento"]),

  product("placas-personalizadas", "Placas personalizadas", "sinalizacao", "Todos os negócios", "Placas sob medida em diferentes materiais e acabamentos.", ["placa", "placas", "placa personalizada"], true),
  product("sinalizacao-empresarial", "Sinalização empresarial", "sinalizacao", "Empresas e clínicas", "Conjunto completo de sinalização interna e externa.", ["sinalizacao interna", "sinalizacao externa", "placas empresa"], true),
  product("placa-acm", "Placa em ACM", "sinalizacao", "Lojas e empresas", "Placa durável para áreas internas e externas.", ["placa aluminio composto"]),
  product("placa-pvc", "Placa em PVC", "sinalizacao", "Empresas e eventos", "Placa leve, versátil e com impressão de alta qualidade.", ["placa pvc expandido"]),
  product("placa-acrilico", "Placa em acrílico", "sinalizacao", "Escritórios e clínicas", "Acabamento sofisticado para recepções, portas e ambientes.", ["placa acrilica", "acrilico"]),
  product("placa-obra", "Placa de obra", "sinalizacao", "Construção civil", "Identificação de obras, responsáveis e informações obrigatórias.", ["placa construcao", "placa engenharia"]),
  product("placa-imobiliaria", "Placa imobiliária", "sinalizacao", "Imobiliárias", "Placas de vende-se, aluga-se e identificação de imóveis.", ["vende se", "aluga se", "placa corretor"]),
  product("placas-seguranca", "Placas de segurança", "sinalizacao", "Empresas e indústrias", "Sinalização de risco, emergência, obrigação e prevenção.", ["nr", "placa perigo", "placa extintor"]),
  product("placas-acessibilidade", "Placas de acessibilidade", "sinalizacao", "Empresas e órgãos públicos", "Sinalização inclusiva, tátil e de orientação.", ["braille", "placa acessivel", "pne"]),
  product("placa-porta", "Placas para portas e setores", "sinalizacao", "Escritórios e clínicas", "Identificação de salas, departamentos e ambientes.", ["placa sala", "placa banheiro", "identificacao porta"]),
  product("cavalete", "Cavalete de sinalização", "sinalizacao", "Lojas e eventos", "Cavalete dobrável para promoções, orientação e avisos.", ["placa cavalete", "cavalete propaganda"]),

  product("adesivos", "Adesivos personalizados", "adesivos", "Todos os negócios", "Impressão e recorte em diversos formatos, tamanhos e acabamentos.", ["adesivo", "sticker", "vinil", "decalque"], true),
  product("envelopamento-veiculos", "Envelopamento de veículos", "adesivos", "Frotas e autônomos", "Envelopamento total ou parcial para divulgação e personalização.", ["plotagem carro", "adesivacao veiculo", "envelopar carro"], true),
  product("envelopamento-vitrines", "Envelopamento de vitrines", "adesivos", "Lojas e franquias", "Campanhas, promoções e identidade visual aplicadas em vidro.", ["adesivo vitrine", "plotagem vitrine"], true),
  product("adesivo-recorte", "Adesivo de recorte", "adesivos", "Lojas e veículos", "Textos, logos e formas recortadas eletronicamente.", ["vinil recorte", "adesivo sem fundo"]),
  product("adesivo-transparente", "Adesivo transparente", "adesivos", "Embalagens e vitrines", "Impressão com fundo transparente para aplicação discreta.", ["adesivo cristal"]),
  product("adesivo-perfurado", "Adesivo perfurado", "adesivos", "Vitrines e veículos", "Comunicação visual com visibilidade preservada pelo lado interno.", ["perfurado vidro", "one way vision"]),
  product("adesivo-jateado", "Adesivo jateado", "adesivos", "Escritórios e clínicas", "Privacidade e sofisticação para divisórias e portas de vidro.", ["fosco vidro", "jateado", "insulfilm decorativo"]),
  product("adesivo-parede", "Adesivo de parede", "adesivos", "Casas e empresas", "Decoração e comunicação personalizada para superfícies internas.", ["wall sticker", "adesivo decorativo"]),
  product("adesivo-piso", "Adesivo de piso", "adesivos", "Lojas e eventos", "Sinalização e campanhas para áreas de circulação.", ["adesivo chao", "floor graphic"]),
  product("adesivo-resinado", "Adesivo resinado", "adesivos", "Marcas e produtos", "Adesivo com efeito 3D e acabamento de alta resistência.", ["etiqueta resinada", "doming"]),

  product("banner", "Banner", "lonas", "Divulgação e eventos", "Impressão em lona com acabamento para pendurar.", ["banner lona", "banner promocional"], true),
  product("faixa-lona", "Faixa em lona", "lonas", "Comércio e eventos", "Faixa personalizada para promoções, eventos e campanhas.", ["faixa", "lona faixa"], true),
  product("painel-eventos", "Painel para eventos", "lonas", "Eventos e festas", "Painéis fotográficos e cenográficos em diferentes estruturas.", ["backdrop", "painel festa", "painel fotos"], true),
  product("lona-frontlight", "Lona frontlight", "lonas", "Fachadas e publicidade", "Impressão de grande formato para iluminação frontal.", ["front light", "lona externa"]),
  product("lona-backlight", "Lona backlight", "lonas", "Lojas e publicidade", "Material translúcido para caixas e painéis iluminados.", ["back light", "lona luminosa"]),
  product("roll-up", "Banner roll-up", "lonas", "Feiras e eventos", "Display retrátil, portátil e reutilizável.", ["rollup", "banner retratil"]),
  product("wind-banner", "Wind banner", "lonas", "Eventos e pontos de venda", "Bandeira vertical de alto impacto para áreas internas e externas.", ["flag banner", "beach flag", "vela"]),
  product("backdrop", "Backdrop promocional", "lonas", "Eventos corporativos", "Painel para fotos, entrevistas, lançamentos e ativações.", ["painel imprensa", "fundo fotos"]),
  product("tapume", "Comunicação para tapumes", "lonas", "Construção e varejo", "Impressão e aplicação em grandes áreas temporárias.", ["lona tapume", "adesivo tapume"]),

  product("cartao-visita", "Cartão de visita", "impressos", "Profissionais e empresas", "Cartões com opções de papéis, laminação e acabamentos especiais.", ["cartao", "cartao profissional"], true),
  product("panfleto", "Panfleto e flyer", "impressos", "Divulgação", "Material direto e econômico para campanhas e promoções.", ["panfleto", "flyer", "folheto"], true),
  product("folder", "Folder", "impressos", "Empresas e serviços", "Impresso com dobras para apresentações, cardápios e campanhas.", ["folder dobrado", "folheto dobravel"], true),
  product("cardapio", "Cardápios", "impressos", "Restaurantes e lanchonetes", "Cardápios impressos, plastificados, rígidos ou dobráveis.", ["menu", "cardapio restaurante"], true),
  product("catalogo", "Catálogos e revistas", "impressos", "Empresas e lojas", "Materiais encadernados para apresentar produtos e serviços.", ["revista", "catalogo produtos"]),
  product("convites", "Convites personalizados", "impressos", "Eventos e celebrações", "Convites para casamentos, aniversários, formaturas e eventos.", ["convite", "convite casamento"]),
  product("ingressos", "Ingressos e vouchers", "impressos", "Eventos e promoções", "Ingressos numerados, vouchers, vales e cupons.", ["ticket", "voucher", "vale presente"]),
  product("certificados", "Certificados e diplomas", "impressos", "Cursos e instituições", "Impressão personalizada para reconhecimentos e formações.", ["certificado curso", "diploma"]),
  product("calendarios", "Calendários", "impressos", "Empresas e presentes", "Modelos de parede, mesa e bolso personalizados.", ["calendario mesa", "folhinha"]),
  product("marcadores", "Marcadores de página", "impressos", "Eventos e instituições", "Impressos personalizados para campanhas e lembranças.", ["marca pagina"]),

  product("papel-timbrado", "Papel timbrado", "papelaria", "Empresas e escritórios", "Documentos com identidade visual profissional.", ["timbrado", "folha timbrada"]),
  product("envelopes", "Envelopes personalizados", "papelaria", "Empresas e clínicas", "Envelopes com impressão institucional em vários formatos.", ["envelope timbrado"]),
  product("pastas", "Pastas personalizadas", "papelaria", "Empresas e escolas", "Pastas com bolsa, vinco e acabamento profissional.", ["pasta proposta", "pasta corporativa"]),
  product("blocos", "Blocos e receituários", "papelaria", "Clínicas e empresas", "Blocos colados, numerados e personalizados.", ["bloco anotacao", "receituario", "receita medica"]),
  product("taloes", "Talões e formulários", "papelaria", "Empresas e serviços", "Ordens de serviço, recibos, comandas e formulários.", ["talao recibo", "ordem servico", "comanda"]),
  product("crachas", "Crachás e credenciais", "papelaria", "Empresas e eventos", "Identificação funcional e credenciamento personalizado.", ["cracha", "credencial", "cartao identificacao"]),
  product("carimbos", "Carimbos personalizados", "papelaria", "Empresas e profissionais", "Carimbos automáticos e tradicionais com arte personalizada.", ["carimbo", "carimbo cnpj"]),

  product("displays", "Displays de balcão", "lojas", "Lojas e restaurantes", "Displays em acrílico, PVC ou papel para comunicação no ponto de venda.", ["display", "porta folder", "display mesa"], true),
  product("totens", "Totens", "lojas", "Lojas e eventos", "Totens rígidos, recortados ou autoportantes personalizados.", ["totem", "totem propaganda"], true),
  product("expositores", "Expositores personalizados", "lojas", "Varejo", "Estruturas para destacar produtos em balcões e prateleiras.", ["expositor", "display produto"]),
  product("wobbler", "Wobblers e stoppers", "lojas", "Supermercados e lojas", "Materiais de destaque para gôndolas e prateleiras.", ["wobbler", "stopper", "orelha gondola"]),
  product("faixa-gondola", "Faixas de gôndola", "lojas", "Varejo", "Comunicação promocional para prateleiras e pontos de venda.", ["regua gondola", "testeira gondola"]),
  product("placa-pix", "Placas de Pix e QR Code", "lojas", "Comércio e serviços", "Placas de pagamento, redes sociais, cardápios e links.", ["qr code", "placa pix", "pix balcão"]),
  product("precificadores", "Etiquetas e precificadores", "lojas", "Varejo", "Materiais para identificação de preços, ofertas e produtos.", ["preco", "etiqueta preco"]),

  product("painel-festa", "Painéis de festa", "eventos", "Festas e celebrações", "Painéis personalizados para aniversários e comemorações.", ["painel aniversario", "painel redondo"]),
  product("totem-personagem", "Totens de personagens", "eventos", "Festas e ações", "Recortes personalizados em tamanho real ou sob medida.", ["display personagem", "totem foto"]),
  product("placas-evento", "Placas para eventos", "eventos", "Festas e cerimônias", "Placas de boas-vindas, mesas, homenagens e orientação.", ["placa casamento", "placa aniversario"]),
  product("tags-toppers", "Tags e toppers", "eventos", "Festas e confeitaria", "Peças pequenas personalizadas em papel ou acrílico.", ["topper bolo", "tag lembrancinha"]),
  product("bandeirolas", "Bandeirolas personalizadas", "eventos", "Festas e campanhas", "Cordões decorativos e promocionais impressos.", ["bandeirinhas", "varal festa"]),
  product("pulseiras", "Pulseiras para eventos", "eventos", "Eventos e controle de acesso", "Pulseiras de identificação e acesso personalizadas.", ["pulseira evento", "pulseira identificacao"]),
  product("cenografia", "Cenografia personalizada", "eventos", "Eventos e ativações", "Elementos impressos e recortados para composição de ambientes.", ["cenario evento", "decoracao stand"]),

  product("etiquetas-rotulos", "Etiquetas e rótulos", "embalagens", "Produtos e embalagens", "Rótulos adesivos em diversos formatos e materiais.", ["rotulo", "etiqueta adesiva", "label"], true),
  product("sacolas", "Sacolas personalizadas", "embalagens", "Lojas e eventos", "Sacolas de papel ou kraft com identidade da marca.", ["sacola papel", "sacola kraft", "sacola loja"], true),
  product("caixas", "Caixas personalizadas", "embalagens", "Lojas e delivery", "Caixas sob medida para produtos, presentes e entregas.", ["caixa produto", "caixa delivery", "embalagem caixa"], true),
  product("caixa-correio", "Caixa para e-commerce", "embalagens", "Lojas virtuais", "Caixas de envio personalizadas para fortalecer a experiência da marca.", ["caixa correio", "caixa ecommerce"]),
  product("cintas", "Cintas e sleeves", "embalagens", "Alimentos e produtos", "Faixas impressas para envolver caixas, potes e embalagens.", ["sleeve", "cinta embalagem"]),
  product("tags-produto", "Tags para produtos", "embalagens", "Moda e varejo", "Etiquetas pendentes para preço, marca e instruções.", ["tag roupa", "etiqueta pendurada"]),
  product("lacres", "Lacres adesivos", "embalagens", "Delivery e e-commerce", "Selos de fechamento, segurança e identificação.", ["adesivo lacre", "lacre delivery"]),
  product("papel-seda", "Papel de seda personalizado", "embalagens", "Lojas e presentes", "Papel interno para embalagens com padronagem da marca.", ["seda personalizada", "papel embalagem"]),

  product("papel-parede", "Papel de parede personalizado", "decoracao", "Casas e empresas", "Impressão sob medida para transformar ambientes.", ["papel parede", "mural parede"]),
  product("quadros", "Quadros decorativos", "decoracao", "Casas e empresas", "Imagens, frases e artes em diferentes formatos e suportes.", ["quadro personalizado", "placa decorativa"]),
  product("painel-decorativo", "Painéis decorativos", "decoracao", "Ambientes comerciais", "Painéis impressos e recortados para paredes e recepções.", ["painel parede", "mural empresa"]),
  product("revestimento-moveis", "Envelopamento de móveis", "decoracao", "Casas e empresas", "Renovação visual de móveis, balcões, portas e superfícies.", ["adesivo movel", "envelopar geladeira", "envelopar porta"]),
  product("fotografias-rigidas", "Fotos e artes em placas", "decoracao", "Decoração e exposições", "Impressão aplicada em PVC, PS, foamboard ou ACM.", ["foto pvc", "foto foamboard"]),

  product("adesivacao-frotas", "Adesivação de frotas", "veicular", "Empresas e logística", "Padronização de carros, motos, vans, caminhões e utilitários.", ["frota", "plotagem frota"], true),
  product("envelopamento-parcial", "Envelopamento parcial", "veicular", "Empresas e particulares", "Personalização estratégica de partes do veículo.", ["faixa carro", "adesivo lateral"]),
  product("motos", "Adesivação de motos", "veicular", "Entregas e negócios", "Identidade visual para motos de entrega e uso profissional.", ["plotagem moto", "adesivo moto"]),
  product("caminhoes", "Adesivação de caminhões", "veicular", "Transportes e indústrias", "Comunicação de alto alcance para baús, cabines e implementos.", ["adesivo caminhao", "plotagem bau"]),
  product("ima-veicular", "Ímã veicular", "veicular", "Serviços e entregas", "Comunicação removível para portas e carrocerias metálicas.", ["placa magnetica carro", "ima carro"]),

  product("chaveiros", "Chaveiros personalizados", "brindes", "Empresas e eventos", "Chaveiros em acrílico, MDF ou materiais rígidos personalizados.", ["chaveiro acrilico", "chaveiro mdf"]),
  product("imas", "Ímãs de geladeira", "brindes", "Empresas e eventos", "Ímãs promocionais, calendários e lembranças personalizadas.", ["ima geladeira", "ima personalizado"]),
  product("bottons", "Bottons e pins", "brindes", "Eventos e campanhas", "Peças promocionais com arte, marca ou mensagem.", ["botton", "pin personalizado"]),
  product("trofeus", "Troféus e medalhas", "brindes", "Eventos e premiações", "Peças personalizadas em acrílico, MDF e materiais especiais.", ["trofeu acrilico", "medalha personalizada"]),
  product("homenagens", "Placas de homenagem", "brindes", "Empresas e instituições", "Reconhecimentos, inaugurações e premiações com acabamento especial.", ["placa homenagem", "placa inauguracao"]),
  product("cadernos", "Cadernos e agendas", "brindes", "Empresas e eventos", "Capas e miolos personalizados para uso institucional ou promocional.", ["agenda personalizada", "caderno personalizado"]),
  product("mousepads", "Mousepads personalizados", "brindes", "Empresas e presentes", "Impressão personalizada para escritórios e ações promocionais.", ["mouse pad", "tapete mouse"]),
  product("leques", "Leques personalizados", "brindes", "Eventos e campanhas", "Material leve e útil para eventos, igrejas e ações externas.", ["leque papel", "ventarola"]),

  product("impressao-digital", "Impressão digital", "servicos", "Pequenas e grandes tiragens", "Impressão rápida e de alta qualidade em vários materiais.", ["imprimir", "impressao colorida"]),
  product("impressao-uv", "Impressão UV", "servicos", "Materiais rígidos", "Impressão direta em superfícies com alta definição e resistência.", ["uv", "impressao direta"]),
  product("recorte-eletronico", "Recorte eletrônico", "servicos", "Adesivos e sinalização", "Recorte preciso de vinil, papéis e materiais compatíveis.", ["plotter recorte", "corte adesivo"]),
  product("corte-laser", "Corte e gravação a laser", "servicos", "Acrílico e MDF", "Corte e personalização detalhada de peças e materiais.", ["laser", "gravar acrilico", "cortar mdf"]),
  product("laminacao", "Laminação e plastificação", "servicos", "Impressos e documentos", "Proteção e acabamento fosco, brilho ou resistente.", ["plastificar", "laminar"]),
  product("encadernacao", "Encadernação", "servicos", "Apostilas e documentos", "Espiral, wire-o e outras opções de montagem.", ["encadernar", "wireo", "espiral"]),
  product("criacao-arte", "Criação de arte", "servicos", "Empresas e eventos", "Desenvolvimento e adaptação de artes para produção gráfica.", ["designer", "arte grafica", "criar layout"]),
  product("vetorizacao", "Vetorização de logotipo", "servicos", "Empresas e marcas", "Preparação técnica de logos para impressão, corte e fachada.", ["vetorizar", "logo vetor"]),
  product("instalacao", "Instalação e aplicação", "servicos", "Projetos de comunicação visual", "Equipe para aplicação de adesivos, placas, fachadas e estruturas.", ["aplicar adesivo", "montar fachada", "instalador"])
];

const synonyms = {
  camisa: [], camisetas: [], caneta: [], canecas: [], copos: [],
  placa: ["sinalizacao", "acm", "pvc", "acrilico", "porta"],
  fachada: ["acm", "letreiro", "letra caixa", "luminoso"],
  adesivo: ["vinil", "etiqueta", "rotulo", "envelopamento", "plotagem"],
  carro: ["veiculo", "automovel", "envelopamento", "adesivacao"],
  festa: ["evento", "painel", "totem", "convite", "tag"],
  loja: ["fachada", "display", "vitrine", "sacola", "placa"],
  restaurante: ["cardapio", "display", "fachada", "embalagem", "etiqueta"],
  igreja: ["banner", "faixa", "painel", "convite", "leque"],
  embalagem: ["caixa", "sacola", "rotulo", "etiqueta", "lacre"],
  imprimir: ["impressao", "grafica", "panfleto", "folder", "cartao"]
};

const normalize = (value = "") => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

function levenshtein(a, b) {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i += 1) {
    for (let j = 1; j <= a.length; j += 1) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

function scoreProduct(item, rawQuery) {
  const query = normalize(rawQuery);
  if (!query) return item.featured ? 20 : 1;
  const category = categories.find((entry) => entry.id === item.category)?.name || "";
  const haystack = normalize([item.name, category, item.niche, item.description, ...item.aliases].join(" "));
  const tokens = query.split(" ").filter(Boolean);
  const expanded = tokens.flatMap((token) => [token, ...(synonyms[token] || [])]).map(normalize);
  let score = 0;
  expanded.forEach((token) => {
    if (normalize(item.name) === token) score += 100;
    else if (normalize(item.name).startsWith(token)) score += 55;
    else if (normalize(item.name).includes(token)) score += 40;
    else if (haystack.includes(token)) score += 22;
    else {
      const words = haystack.split(" ");
      const best = Math.min(...words.map((word) => levenshtein(token, word)));
      if (token.length >= 4 && best <= 1) score += 15;
      else if (token.length >= 6 && best <= 2) score += 8;
    }
  });
  if (item.featured) score += 2;
  return score;
}

function ProductArtwork({ item }) {
  const category = categories.find((entry) => entry.id === item.category);
  const Icon = category?.icon || Printer;
  const initials = item.name.split(" ").filter((word) => word.length > 2).slice(0, 2).map((word) => word[0]).join("");
  return (
    <div className={`product-art tone-${category?.tone || "orange"}`} aria-hidden="true">
      <div className="art-grid" />
      <div className="art-glow" />
      <div className="art-object">
        <Icon size={48} strokeWidth={1.55} />
        <span>{initials}</span>
      </div>
      <div className="art-tag">ÁREA X</div>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todos");
  const [niche, setNiche] = useState("todos");
  const [visibleCount, setVisibleCount] = useState(24);

  const niches = useMemo(() => ["todos", ...Array.from(new Set(products.map((item) => item.niche))).sort()], []);

  const ranked = useMemo(() => {
    return products
      .map((item) => ({ ...item, score: scoreProduct(item, query) }))
      .filter((item) => (!query || item.score > 0) && (category === "todos" || item.category === category) && (niche === "todos" || item.niche === niche))
      .sort((a, b) => b.score - a.score || Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "pt-BR"));
  }, [query, category, niche]);

  const displayed = ranked.slice(0, visibleCount);
  const suggestedCategories = useMemo(() => {
    const scores = new Map();
    ranked.slice(0, 18).forEach((item) => scores.set(item.category, (scores.get(item.category) || 0) + item.score));
    return [...scores.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id]) => categories.find((entry) => entry.id === id));
  }, [ranked]);

  const resetFilters = () => { setQuery(""); setCategory("todos"); setNiche("todos"); setVisibleCount(24); };
  const askQuote = (name) => window.open(`${WHATSAPP}${encodeURIComponent(`Olá! Gostaria de solicitar um orçamento para ${name}.`)}`, "_blank", "noopener,noreferrer");

  return (
    <div className="site-shell">
      <header className="topbar">
        <a href="#inicio" className="brand" aria-label="Área X - início"><span>ÁREA</span><b>X</b></a>
        <nav>
          <a href="#produtos">Produtos</a><a href="#categorias">Categorias</a><a href="#como-funciona">Como funciona</a>
        </nav>
        <button className="header-cta" onClick={() => askQuote("um projeto personalizado")}>Pedir orçamento <ArrowRight size={17} /></button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={16} /> Catálogo completo Área X</div>
            <h1>Da ideia à impressão, <em>tudo para sua marca aparecer.</em></h1>
            <p>Fachadas, placas, adesivos, impressos, embalagens, comunicação para lojas, eventos e projetos sob medida.</p>
            <div className="search-box">
              <Search size={24} />
              <input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(24); }} placeholder="Busque por produto, material, uso ou segmento..." aria-label="Pesquisar produtos" />
              {query && <button className="clear-search" onClick={() => setQuery("")} aria-label="Limpar pesquisa"><X size={19} /></button>}
              <button className="search-button" onClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })}>Pesquisar</button>
            </div>
            <div className="quick-search"><span>Mais buscados:</span>{["Fachada em ACM", "Adesivos", "Banner", "Cartão de visita", "Caixas"].map((term) => <button key={term} onClick={() => { setQuery(term); setCategory("todos"); }}>{term}</button>)}</div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card card-one"><Building2 /><span>Fachadas</span></div>
            <div className="hero-card card-two"><Sticker /><span>Adesivos</span></div>
            <div className="hero-card card-three"><PackageOpen /><span>Embalagens</span></div>
            <div className="hero-x">X</div>
          </div>
        </section>

        <section className="category-section" id="categorias">
          <div className="section-heading"><div><span className="section-kicker">Navegue por categoria</span><h2>Encontre exatamente o que precisa</h2></div><p>O catálogo foi organizado por finalidade para facilitar a escolha.</p></div>
          <div className="category-grid">
            {categories.map((entry) => { const Icon = entry.icon; const count = products.filter((item) => item.category === entry.id).length; return (
              <button key={entry.id} className={`category-card ${category === entry.id ? "active" : ""}`} onClick={() => { setCategory(category === entry.id ? "todos" : entry.id); setNiche("todos"); setVisibleCount(24); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }}>
                <span className={`category-icon tone-${entry.tone}`}><Icon size={23} /></span><span><b>{entry.name}</b><small>{count} opções</small></span><ChevronRight size={18} />
              </button>
            ); })}
          </div>
        </section>

        <section className="catalog" id="produtos">
          <div className="section-heading catalog-heading"><div><span className="section-kicker">Produtos e serviços</span><h2>{query ? `Resultados para “${query}”` : category !== "todos" ? categories.find((entry) => entry.id === category)?.name : "Soluções em destaque"}</h2></div><p>{ranked.length} {ranked.length === 1 ? "resultado encontrado" : "resultados encontrados"}</p></div>
          <div className="catalog-tools">
            <div className="filter-row"><button className={category === "todos" ? "filter active" : "filter"} onClick={() => setCategory("todos")}>Todos</button>{categories.map((entry) => <button key={entry.id} className={category === entry.id ? "filter active" : "filter"} onClick={() => { setCategory(entry.id); setVisibleCount(24); }}>{entry.name}</button>)}</div>
            <div className="select-row"><label><span>Filtrar por segmento</span><select value={niche} onChange={(event) => { setNiche(event.target.value); setVisibleCount(24); }}>{niches.map((entry) => <option key={entry} value={entry}>{entry === "todos" ? "Todos os segmentos" : entry}</option>)}</select></label></div>
          </div>

          {query && suggestedCategories.length > 0 && <div className="smart-suggestions"><Sparkles size={17} /><span>Talvez esteja procurando:</span>{suggestedCategories.map((entry) => <button key={entry.id} onClick={() => { setCategory(entry.id); setQuery(""); }}>{entry.name}</button>)}</div>}

          {displayed.length ? <div className="product-grid">{displayed.map((item) => {
            const categoryData = categories.find((entry) => entry.id === item.category);
            return <article className="product-card" key={item.id}>
              <ProductArtwork item={item} />
              <div className="product-content"><div className="product-meta"><span>{categoryData?.name}</span>{item.featured && <b>Destaque</b>}</div><h3>{item.name}</h3><p>{item.description}</p><div className="product-footer"><small>{item.niche}</small><button onClick={() => askQuote(item.name)}>Orçar <ArrowRight size={16} /></button></div></div>
            </article>;
          })}</div> : <div className="empty-state"><Search size={38} /><h3>Não encontramos esse item</h3><p>Tente outro termo ou fale com a equipe. A Área X também desenvolve projetos personalizados.</p><button onClick={() => askQuote(query || "um produto personalizado")}>Consultar atendimento</button><button className="secondary" onClick={resetFilters}>Limpar filtros</button></div>}
          {ranked.length > visibleCount && <button className="load-more" onClick={() => setVisibleCount((count) => count + 24)}>Ver mais produtos <ArrowRight size={17} /></button>}
        </section>

        <section className="how" id="como-funciona">
          <div className="how-copy"><span className="section-kicker">Feito sob medida</span><h2>Não encontrou exatamente como imaginou?</h2><p>Grande parte dos projetos de comunicação visual varia em tamanho, material, acabamento e instalação. Envie sua ideia e a equipe ajuda a definir a melhor solução.</p><button onClick={() => askQuote("um projeto sob medida")}>Falar com um consultor <MessageCircle size={18} /></button></div>
          <div className="steps">{[["01", "Conte sua necessidade", "Informe o produto, medida, quantidade e prazo."], ["02", "Receba a orientação", "A equipe indica material, acabamento e melhor formato."], ["03", "Aprove a produção", "Após orçamento e aprovação, seu projeto entra em produção."]].map(([number, title, text]) => <div className="step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><CheckCircle2 size={22} /></div>)}</div>
        </section>
      </main>

      <footer><a href="#inicio" className="brand"><span>ÁREA</span><b>X</b></a><p>Impressão e comunicação visual para empresas, eventos e grandes ideias.</p><button onClick={() => askQuote("um orçamento")}>Solicitar orçamento</button></footer>
    </div>
  );
}

export default App;
