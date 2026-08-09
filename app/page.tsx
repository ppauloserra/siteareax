"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CartButton from "./components/CartButton";

const whatsappNumber = "559899931619";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, Área X! Vim pelo site e gostaria de solicitar um orçamento.")}`;
const customProjectUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, Área X! Tenho um projeto totalmente personalizado e gostaria de conversar com o setor responsável.")}`;
const mapsUrl = "https://maps.app.goo.gl/gKtUeMpMq6yJ2Se27";

const products = [
  {
    slug: "fachadas-em-acm",
    title: "Fachadas em ACM",
    kicker: "Sua empresa em evidência",
    text: "Fachadas modernas, resistentes e criadas para fazer seu negócio ser reconhecido de longe.",
    image: "/products/fachada-01.jpg",
    hoverImage: "/products/fachada-02.jpg",
  },
  {
    slug: "letreiros-e-totens",
    title: "Letreiros e totens",
    kicker: "Presença que orienta",
    text: "Letras-caixa, luminosos, totens e sinalização sob medida para ambientes internos e externos.",
    image: "/products/totem-01.jpg",
    hoverImage: "/products/totem-02.jpg",
  },
  {
    slug: "adesivos-e-envelopamento",
    title: "Adesivos e envelopamento",
    kicker: "Transforme qualquer superfície",
    text: "Vitrines, paredes, veículos e frotas com aplicação profissional e acabamento impecável.",
    image: "/products/adesivo-01.jpg",
    hoverImage: "/products/adesivo-02.jpg",
  },
  {
    slug: "banners-lonas-paineis",
    title: "Banners, lonas e painéis",
    kicker: "Grandes formatos, grande impacto",
    text: "Materiais para campanhas, eventos e comunicação promocional com excelente presença visual.",
    image: "/products/banner-01.jpg",
    hoverImage: "/products/banner-02.jpg",
  },
  {
    slug: "impressos-graficos",
    title: "Impressos gráficos",
    kicker: "Sua marca em cada detalhe",
    text: "Cartões, folders, panfletos e papelaria com impressão nítida e acabamento profissional.",
    image: "/products/impressos-01.jpg",
    hoverImage: "/products/impressos-02.jpg",
  },
  {
    slug: "embalagens-pdv",
    title: "Embalagens e materiais de PDV",
    kicker: "Produto pronto para encantar",
    text: "Rótulos, etiquetas, displays e embalagens que valorizam o que você vende.",
    image: "/products/pdv-01.jpg",
    hoverImage: "/products/pdv-02.jpg",
  },
];

const steps = [
  { number: "01", symbol: "IDEIA", title: "Conte seu projeto", text: "Explique o que precisa, envie suas referências e informe as medidas." },
  { number: "02", symbol: "VALOR", title: "Receba o orçamento", text: "A equipe indica materiais, acabamentos, prazo e o melhor custo-benefício." },
  { number: "03", symbol: "ARTE", title: "Aprove a criação", text: "Preparamos ou ajustamos sua arte até tudo ficar pronto para produzir." },
  { number: "04", symbol: "AÇÃO", title: "Produção", text: "Seu material ganha forma com acompanhamento e controle de qualidade." },
  { number: "05", symbol: "PRONTO", title: "Entrega ou instalação", text: "Você retira, recebe ou combina a instalação com a nossa equipe." },
];

const differentiators = [
  { tag: "+10", title: "Anos de experiência", text: "Conhecimento prático para indicar a solução certa para cada projeto." },
  { tag: "360º", title: "Soluções completas", text: "Da ideia à instalação, tudo é pensado para manter qualidade e unidade visual." },
  { tag: "1:1", title: "Atendimento próximo", text: "Uma equipe que escuta, orienta e acompanha você em todas as etapas." },
  { tag: "MA", title: "Produção local", text: "Agilidade para atender Santa Inês e projetos em toda a região." },
  { tag: "TOP", title: "Acabamento profissional", text: "Materiais bem escolhidos, impressão precisa e atenção aos detalhes." },
  { tag: "X", title: "Projeto sob medida", text: "Cada marca recebe uma solução compatível com seu espaço e objetivo." },
];

const clients = [
  { name: "Vale", logo: "/client-logos/vale.png", className: "vale" },
  { name: "Grupo Mateus", logo: "/client-logos/grupo-mateus.svg", className: "mateus" },
  { name: "Banco do Brasil", logo: "/client-logos/banco-do-brasil.png", className: "bb" },
  { name: "Jacaré Home Center", logo: "/client-logos/jacare-home-center.png", className: "jacare" },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="brand" href="/#inicio" aria-label="Área X — início"><img src="/logo-area-x.png" alt="Área X Comunicação Visual" /></Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <Link href="/#inicio">Início</Link><Link href="/#produtos">Produtos</Link><Link href="/#processo">Como funciona</Link><Link href="/#diferenciais">Diferenciais</Link><Link href="/minhas-compras">Minhas compras</Link>
        </nav>
        <CartButton compact />
        <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Solicitar orçamento</a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow hero-reveal delay-1">Comunicação visual que marca</span>
          <h1 className="hero-reveal delay-2">Sua ideia ganha <span>forma, cor</span> e presença.</h1>
          <p className="hero-reveal delay-3">Soluções personalizadas para destacar sua marca em todos os lugares.</p>
          <div className="hero-actions hero-reveal delay-4">
            <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">Pedir orçamento</a>
            <Link className="button secondary" href="/#produtos">Conhecer produtos</Link>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>Explore</span><i /></div>
      </section>

      <div className="marquee" aria-label="Diferenciais da Área X"><div className="marquee-track">
        <span>Impressão de qualidade</span><b>×</b><span>Produção personalizada</span><b>×</b><span>Mais de 10 anos de experiência</span><b>×</b>
        <span>Impressão de qualidade</span><b>×</b><span>Produção personalizada</span><b>×</b><span>Mais de 10 anos de experiência</span><b>×</b>
      </div></div>

      <section className="section products" id="produtos">
        <div className="section-heading reveal">
          <div><span className="eyebrow dark">Produtos Área X</span><h2>Peças que fazem sua marca ser <em>vista e lembrada.</em></h2></div>
          <p>Passe o mouse sobre cada produto para ver outro detalhe. Depois, as fotos reais da Área X poderão ser trocadas sem mudar o desenho da página.</p>
        </div>
        <div className="products-grid">
          {products.map((product, index) => (
            <article className="product-card reveal" style={{ transitionDelay: `${(index % 3) * 80}ms` }} key={product.title}>
              <div className="product-media">
                <img className="product-image primary-image" src={product.image} alt={product.title} />
                <img className="product-image hover-image" src={product.hoverImage} alt="" aria-hidden="true" />
                <span className="product-index">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="product-copy"><span>{product.kicker}</span><h3>{product.title}</h3><p>{product.text}</p><Link className="buy-button" href={`/personalizar?produto=${product.slug}`} aria-label={`Personalizar e comprar ${product.title}`}>Personalizar e comprar</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section process-new" id="processo">
        <div className="center-heading reveal"><span className="eyebrow dark">Vamos transformar sua ideia</span><h2>Você dá o primeiro passo.<br /><em>O resto é com a gente.</em></h2></div>
        <div className="process-flow">
          {steps.map((step, index) => (
            <article className="process-card reveal" style={{ transitionDelay: `${index * 70}ms` }} key={step.title}>
              <span className="process-symbol">{step.symbol}</span><strong>{step.number}</strong><h3>{step.title}</h3><p>{step.text}</p>
            </article>
          ))}
        </div>
        <a className="wide-cta reveal" href={whatsappUrl} target="_blank" rel="noreferrer">Clique aqui e solicite seu orçamento</a>
      </section>

      <section className="section differentials" id="diferenciais">
        <div className="center-heading reveal"><span className="eyebrow dark">A escolha certa para seu projeto</span><h2>Diferenciais <em>Área X</em></h2></div>
        <div className="differentials-grid">
          {differentiators.map((item, index) => (
            <article className="differential-card reveal" style={{ transitionDelay: `${(index % 3) * 70}ms` }} key={item.title}>
              <span>{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section clients" id="clientes">
        <div className="clients-copy reveal"><span className="eyebrow dark">Parcerias e projetos</span><h2>Quem escolhe a Área X, <em>faz a marca aparecer.</em></h2><p>Empresas que já confiaram seus projetos à criatividade, à produção e ao acabamento da Área X.</p><a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">Solicitar orçamento</a></div>
        <div className="client-grid reveal">
          {clients.map((client, index) => (
            <div className={`client-tile client-${client.className}`} key={client.name}>
              <span>0{index + 1}</span>
              <div className="client-brand">
                <img src={client.logo} alt={`Logo ${client.name}`} />
                {client.className === "bb" && <strong>Banco do Brasil</strong>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about" id="sobre">
        <div className="about-pattern" aria-hidden="true">X</div>
        <div className="about-copy reveal"><span className="eyebrow">A Área X</span><h2>Mais que imprimir, a gente cria <em>presença.</em></h2><p>Há mais de uma década, ajudamos empresas e pessoas a transformarem ideias em comunicação visual com personalidade, qualidade e acabamento.</p></div>
        <div className="stats reveal"><div><strong>+10</strong><span>anos criando impacto visual</span></div><div><strong>360°</strong><span>soluções para sua comunicação</span></div><div><strong>1 a 1</strong><span>atendimento próximo e personalizado</span></div></div>
      </section>

      <section className="custom-project" id="projeto-especial">
        <div className="custom-project-art" aria-hidden="true"><span>PROJETO</span><strong>X</strong></div>
        <div className="custom-project-copy reveal"><span className="eyebrow">Algo fora do comum?</span><h2>Seu projeto é único.<br /><em>O atendimento também.</em></h2><p>Fachadas complexas, grandes instalações e ideias totalmente personalizadas não passam pelo fluxo normal da loja. Você fala diretamente com nossa equipe pelo WhatsApp.</p><a className="button primary" href={customProjectUrl} target="_blank" rel="noreferrer">Falar sobre meu projeto</a></div>
      </section>

      <section className="section location" id="localizacao">
        <div className="location-copy reveal"><span className="eyebrow dark">Prefere vir até nós?</span><h2>Venha conhecer a Área X.</h2><p>Estamos em Santa Inês, Maranhão. Abra a rota no Google Maps ou fale com a equipe antes de vir.</p><div className="location-data"><div><span>Localização</span><strong>Santa Inês — Maranhão</strong></div><div><span>WhatsApp</span><strong>+55 98 9993-1619</strong></div></div><div className="location-actions"><a className="button primary" href={mapsUrl} target="_blank" rel="noreferrer">Abrir rota</a><a className="button outline-dark" href={whatsappUrl} target="_blank" rel="noreferrer">Chamar no WhatsApp</a></div></div>
        <div className="map-frame reveal"><iframe title="Localização da Área X em Santa Inês" src="https://www.google.com/maps?q=%C3%81rea%20X%20Impress%C3%B5es%20Santa%20In%C3%AAs%20MA&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </section>

      <footer>
        <div className="footer-main"><img src="/logo-area-x-white-trim.png" alt="Área X Comunicação Visual" /><p>Criando impacto visual com ideias que ganham forma.</p><div className="footer-links"><Link href="/#inicio">Início</Link><Link href="/#produtos">Produtos</Link><Link href="/#processo">Como funciona</Link><Link href="/#diferenciais">Diferenciais</Link><Link href="/minhas-compras">Minhas compras</Link><Link href="/#localizacao">Localização</Link></div></div>
        <div className="footer-bottom"><span>Área X Comunicação Visual</span><span>Santa Inês — Maranhão</span></div>
      </footer>
    </main>
  );
}
