/* ===== UTILIDADES ===== */
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
function arte(t) {
  if (t === "copo")
    return `<svg viewBox="0 0 400 440" role="img" aria-label="Ilustração provisória de sobremesa no copo"><rect width="400" height="440" fill="#F5E8D3"/><ellipse cx="200" cy="400" rx="120" ry="14" fill="#4A2B20" opacity=".15"/><path d="M110 120h180l-18 270q-2 14-16 14h-112q-14 0-16-14z" fill="#FFF9F0" stroke="#D6AD62" stroke-width="3" opacity=".95"/><path d="M122 200h156l-9 70H131z" fill="#4A2B20"/><path d="M131 270h138l-6 56H137z" fill="#FFF9F0"/><path d="M138 326h124l-4 50q-1 8-9 8h-98q-8 0-9-8z" fill="#4A2B20"/><path d="M116 150h168l-6 50H122z" fill="#FFF9F0"/><path d="M122 124q78 -36 156 0 0 22 -78 22t-78-22z" fill="#A87648"/><circle cx="170" cy="118" r="9" fill="#4A2B20"/><circle cx="215" cy="112" r="7" fill="#D6AD62"/><circle cx="240" cy="122" r="8" fill="#4A2B20"/></svg>`;
  return `<svg viewBox="0 0 400 440" role="img" aria-label="Ilustração provisória de bolo de chocolate"><rect width="400" height="440" fill="#F5E8D3"/><ellipse cx="200" cy="360" rx="170" ry="40" fill="#FFF9F0" stroke="#D6AD62" stroke-width="3"/><path d="M80 210v110q0 40 120 40t120-40V210z" fill="#4A2B20"/><ellipse cx="200" cy="210" rx="120" ry="38" fill="#6b3b2a"/><path d="M96 214q-6 40 16 40t14-34M170 236q-4 44 18 44t14-40M262 226q-4 40 18 38t10-30" fill="#4A2B20"/><g fill="#A87648"><rect x="140" y="170" width="38" height="30" rx="5" transform="rotate(-14 140 170)"/><rect x="190" y="160" width="40" height="30" rx="5" transform="rotate(8 190 160)"/><rect x="236" y="176" width="36" height="28" rx="5" transform="rotate(-6 236 176)"/></g><g fill="#D6AD62"><rect x="168" y="190" width="30" height="24" rx="4" transform="rotate(12 168 190)"/><rect x="215" y="196" width="26" height="22" rx="4"/></g></svg>`;
}
const media = (p, i) =>
  p.imagem && i === 0
    ? `<img src="${esc(p.imagem)}" alt="${esc(p.nome)}, Tão Doce" loading="lazy">`
    : p.imagens[i - 1]
      ? `<img src="${esc(p.imagens[i - 1])}" alt="${esc(p.nome)}, foto ${i + 1}" loading="lazy">`
      : arte(p.arte);
const ordenados = () => [...PRODUTOS].sort((a, b) => a.ordem - b.ordem);
function card(p) {
  return `<article class="card rv rv-z"><span class="tagc">${esc(p.categoria)}</span><a class="img" href="#/produto/${p.slug}" tabindex="-1" aria-hidden="true">${media(p, 0)}</a><div class="body"><h3>${esc(p.nome)}</h3><p>${esc(p.curta)}</p>${p.preco != null ? `<span class="price">${brl(p.preco)}</span>` : ""}<a class="btn ghost" href="#/produto/${p.slug}">Ver produto<span class="sr">: ${esc(p.nome)}</span></a></div></article>`;
}
const REDUZ = matchMedia("(prefers-reduced-motion: reduce)").matches;
const IO = new IntersectionObserver(
  (es) =>
    es.forEach((x) => {
      if (x.isIntersecting) {
        x.target.classList.add("in");
        IO.unobserve(x.target);
      }
    }),
  { threshold: 0.12 },
);
const obs = () =>
  document
    .querySelectorAll(".rv:not(.in),.split:not(.in),.sh:not(.in)")
    .forEach((x) => IO.observe(x));
const FR = [
  "Doces artesanais",
  "Feitos com carinho",
  "Alfenas, MG",
  "Para presentear",
  "Para celebrar",
];
const mq = () => {
  const r = Array(3)
    .fill(FR.map((t) => `<span>${t}</span><b>✦</b>`).join(""))
    .join("");
  return `<div class="mq" aria-hidden="true"><div class="row" data-sl="-.35">${r}</div></div><div class="mq alt" aria-hidden="true"><div class="row" data-sl=".35">${r}</div></div>`;
};
function splits() {
  document.querySelectorAll("#conteudo h1,#conteudo h2,#conteudo .sh h3").forEach((h) => {
    if (h.dataset.s) return;
    h.dataset.s = 1;
    const t = h.textContent;
    h.setAttribute("aria-label", t);
    h.textContent = "";
    h.classList.add("split");
    t.split(" ").forEach((w, i) => {
      const o = document.createElement("span");
      o.className = "w";
      o.setAttribute("aria-hidden", "true");
      const n = document.createElement("span");
      n.style.setProperty("--i", i);
      n.textContent = w;
      o.append(n);
      h.append(o, " ");
    });
  });
}
const ss = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const N = FRM.length,
  IM = new Array(N),
  MQ = matchMedia("(max-aspect-ratio:1/1),(max-width:760px)");
let CUR = null,
  TGT = 0,
  RUN = false,
  li = 0;
const ORD = [
  ...new Set([
    0,
    ...[...Array(N).keys()].filter((i) => i % 10 === 0),
    N - 1,
    ...[...Array(N).keys()].filter((i) => i % 3 === 0),
    ...Array(N).keys(),
  ]),
];
function nextF() {
  if (li >= ORD.length) return;
  const i = ORD[li++],
    im = new Image();
  im.onload = () => {
    IM[i] = im;
    if (CUR !== null) render(CUR);
    nextF();
  };
  im.onerror = nextF;
  im.src = FRM[i];
}
nextF();
nextF();
function maskify() {
  document.querySelectorAll(".mk:not([data-m])").forEach((h) => {
    h.dataset.m = 1;
    const t = h.textContent;
    h.setAttribute("aria-label", t);
    h.textContent = "";
    t.split(" ").forEach((w) => {
      const o = document.createElement("span");
      o.className = "mw";
      o.setAttribute("aria-hidden", "true");
      const n = document.createElement("span");
      n.className = "bt wd";
      n.textContent = w;
      o.append(n);
      h.append(o, " ");
    });
  });
}
function draw(i, q) {
  const c = $("#cv");
  if (!c) return;
  const mob = MQ.matches,
    w = c.clientWidth,
    h = c.clientHeight,
    d = Math.min(devicePixelRatio || 1, 2);
  if (!w || !h) return;
  if (c.width !== Math.round(w * d) || c.height !== Math.round(h * d)) {
    c.width = Math.round(w * d);
    c.height = Math.round(h * d);
  }
  let img = IM[i];
  for (let o = 1; !img && o < N; o++) img = IM[i - o] || IM[i + o];
  if (!img) return;
  const g = c.getContext("2d"),
    iw = img.naturalWidth,
    ih = img.naturalHeight;
  g.clearRect(0, 0, c.width, c.height);
  if (mob) {
    const b = $("#cvb"),
      bw = Math.round(w / 4),
      bh = Math.round(h / 4);
    if (b.width !== bw || b.height !== bh) {
      b.width = bw;
      b.height = bh;
    }
    const bs = Math.max(bw / iw, bh / ih);
    b.getContext("2d").drawImage(img, (bw - iw * bs) / 2, (bh - ih * bs) / 2, iw * bs, ih * bs);
    const sc = (c.width / iw) * 1.6,
      dw = iw * sc,
      dh = ih * sc,
      x = (c.width - dw) / 2,
      y = c.height * 0.37 - dh / 2;
    g.drawImage(img, x, y, dw, dh);
    g.globalCompositeOperation = "destination-in";
    const gr = g.createLinearGradient(0, y, 0, y + dh);
    gr.addColorStop(0, "rgba(0,0,0,0)");
    gr.addColorStop(0.2, "#000");
    gr.addColorStop(0.8, "#000");
    gr.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = gr;
    g.fillRect(0, y, c.width, dh);
    g.globalCompositeOperation = "source-over";
    return;
  }
  const sc = Math.max(c.width / iw, c.height / ih),
    dw = iw * sc,
    dh = ih * sc;
  let x = (c.width - dw) / 2;
  const y = (c.height - dh) / 2;
  x += Math.min(Math.max(0, (dw - c.width) / 2), c.width * 0.1) * q;
  g.drawImage(img, x, y, dw, dh);
}
function render(p) {
  if (!$("#cv")) return;
  maskify();
  const q = ss(0.36, 0.5, p),
    fp = Math.min(1, Math.max(0, (p - 0.03) / 0.85));
  draw(Math.round(fp * (N - 1)), q);
  $("#sc1").style.opacity = 1 - q;
  $("#sc2").style.opacity = q;
  $("#cue").style.opacity = 1 - ss(0, 0.05, p);
  document.querySelectorAll(".beat").forEach((bt) => {
    const a = +bt.dataset.a,
      b = +bt.dataset.b;
    let mx = 0;
    bt.querySelectorAll(".bt").forEach((el, k) => {
      const v = ss(a + 0.009 * k, a + 0.05 + 0.009 * k, p) * (1 - ss(b - 0.06, b, p));
      mx = Math.max(mx, v);
      if (el.classList.contains("wd")) el.style.transform = `translateY(${(1 - v) * 110}%)`;
      else {
        el.style.opacity = v;
        el.style.transform = `translateY(${(1 - v) * 28}px)`;
      }
    });
    bt.style.visibility = mx > 0.01 ? "visible" : "hidden";
    bt.style.pointerEvents = mx > 0.6 ? "auto" : "none";
  });
}
function loop() {
  CUR += (TGT - CUR) * 0.2;
  if (Math.abs(TGT - CUR) < 0.0005) CUR = TGT;
  render(CUR);
  if (CUR !== TGT) requestAnimationFrame(loop);
  else RUN = false;
}
function cena(p) {
  TGT = p;
  if (CUR === null || REDUZ) CUR = p;
  if (!RUN) {
    RUN = true;
    requestAnimationFrame(loop);
  }
}
addEventListener("resize", () => {
  if (CUR !== null) render(CUR);
});
function tick() {
  spy();
  const hh = $("#hero");
  if (hh) {
    let pp = 1;
    if (!REDUZ) {
      const r = hh.getBoundingClientRect();
      pp = Math.min(1, Math.max(0, -r.top / (r.height - hh.firstElementChild.offsetHeight)));
    }
    cena(pp);
  }
  const m = document.documentElement.scrollHeight - innerHeight;
  $("#pg").style.transform = `scaleX(${m > 0 ? scrollY / m : 0})`;
  if (REDUZ) return;
  document
    .querySelectorAll("[data-sl]")
    .forEach((el) => (el.style.transform = `translateX(${scrollY * el.dataset.sl}px)`));
  document.querySelectorAll("[data-par]").forEach((el) => {
    const r = el.parentElement.getBoundingClientRect();
    if (r.bottom < -300 || r.top > innerHeight + 300) return;
    el.style.translate = `0 ${-(r.top + r.height / 2 - innerHeight / 2) * el.dataset.par}px`;
  });
}
function pontos() {
  const g = $("#grid"),
    d = $("#dots");
  if (!g || !d) return;
  const n = g.children.length;
  d.innerHTML =
    n > 1
      ? Array.from({ length: n }, (_, i) => `<span class="${i ? "" : "on"}"></span>`).join("")
      : "";
  g.onscroll = () => {
    const c = g.children[0];
    if (!c) return;
    const i = Math.round(g.scrollLeft / (c.offsetWidth + 16));
    [...d.children].forEach((x, k) => x.classList.toggle("on", k === i));
  };
}

const IC = {
  drop: '<path d="M12 3C8 9 6 12 6 15a6 6 0 0 0 12 0c0-3-2-6-6-12z"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  swirl: '<path d="M7 18h10l1-4H6zM8 14c0-2 2-2 2-4s1-3 2-4c1 1 2 2 2 4s2 2 2 4"/>',
  carrot:
    '<path d="M14 9c3 0 5 2 5 2L6 21c0 0-2-9 8-12zM15 8c0-2 1-4 3-5M15 8c-2-1-4-1-6 0M15 8c1-3 3-4 6-3"/>',
  hazel: '<ellipse cx="12" cy="14" rx="6" ry="7"/><path d="M6 11q6-6 12 0M12 7V4"/>',
  ribbon: '<path d="M12 11l-4 9 4-2 4 2-4-9zM7 8l5 3 5-3-5-4z"/>',
  drumstick:
    '<path d="M16 3a5 5 0 0 1 0 8L11 16l-3-3 5-5a5 5 0 0 1 3-5zM8 13l-4 4a2 2 0 1 0 3 3l1-1a2 2 0 1 0 3-3"/>',
  wheat:
    '<path d="M12 21V8M12 8c-3 0-4-2-4-4 3 0 4 2 4 4zM12 8c3 0 4-2 4-4-3 0-4 2-4 4zM12 14c-3 0-4-2-4-4 3 0 4 2 4 4zM12 14c3 0 4-2 4-4-3 0-4 2-4 4z"/>',
  dots: '<circle cx="7" cy="8" r="1.3"/><circle cx="14" cy="6" r="1.3"/><circle cx="18" cy="12" r="1.3"/><circle cx="9" cy="15" r="1.3"/><circle cx="15" cy="18" r="1.3"/>',
};
const TEMAS = {
  avela: [
    ["Avelã", "hazel"],
    ["Ninho", "swirl"],
    ["Fita personalizada", "ribbon"],
  ],
  salgado: [
    ["Frango", "drumstick"],
    ["Empanada", "wheat"],
    ["Recheio generoso", "layers"],
  ],
  cenoura: [
    ["Bolo de cenoura", "carrot"],
    ["Cobertura de chocolate", "drop"],
    ["Granulado", "dots"],
  ],
};
const CARROT =
  '<svg class="bean" viewBox="0 0 30 76" aria-hidden="true" style="overflow:visible"><path d="M15 76L3 22Q15 12 27 22Z" fill="#E87D1E"/><path d="M8 34h6M16 46h6M11 58h5" stroke="#B85E10" stroke-width="2"/><path d="M15 14Q6 2 9 0M15 14Q15 2 15 -2M15 14Q24 2 21 0" stroke="#5E8C3A" stroke-width="3" fill="none"/></svg>';
const HAZEL =
  '<svg class="bean" viewBox="0 0 40 46" aria-hidden="true"><ellipse cx="20" cy="28" rx="14" ry="16" fill="#9a6034" stroke="#6b3b2a" stroke-width="2"/><path d="M6 22Q20 8 34 22Z" fill="#6b3b2a"/><path d="M20 10V4" stroke="#6b3b2a" stroke-width="3"/></svg>';
const fl = (a, svg, f) =>
  a
    .map(
      ([x, y], k) =>
        `<span class="bw" style="position:absolute;left:${x}%;top:${y}%;animation-delay:-${k}s" data-par="${f + k * 0.05}">${svg}</span>`,
    )
    .join("");
const DR = [60, 110, 80, 150, 70, 120, 90, 140, 60, 100, 130, 75]
  .map(
    (h, i) => `<i style="left:${3 + i * 8.3}%;height:${h}px;--dl:${(i * 0.13).toFixed(2)}s"></i>`,
  )
  .join("");
const SLOTS = [
  [3, 16, 0.15, 150],
  [84, 10, 0.25, 170],
  [6, 66, 0.3, 130],
  [80, 62, 0.12, 190],
  [46, 82, 0.35, 110],
  [50, 4, 0.2, 120],
];

function fx(t, p) {
  let o = t === "salgado" ? '<div class="rays"></div>' : `<div class="drips">${DR}</div>`;
  const M = { l: "left", r: "right", t: "top", b: "bottom" };
  o += (p.ingredientes || [])
    .map((g, k) => {
      const a = Object.keys(M)
        .filter((q) => g[q] != null)
        .map((q) => M[q] + ":" + g[q] + "%")
        .join(";");
      const st = `${a};width:min(${g.w}px,${(g.w / 8).toFixed(1)}vw);rotate:${g.rot}deg;${g.bl ? `filter:blur(${g.bl}px);` : ""}${g.o ? `opacity:${g.o};` : ""}${g.f ? `animation-duration:${5 + (k % 3) * 1.5}s;animation-delay:-${k * 1.3}s;` : ""}`;
      return `<img class="ing${g.f ? " fl" : ""}${g.m ? " m" + g.m : ""}" src="${ING[g.k]}" alt="" data-par="${g.v}" style="${st}">`;
    })
    .join("");
  return o;
}
function showcase(p, i) {
  const t = p.tema || "creme",
    f = i % 2 ? "flip" : "";
  return `<section class="sh th-${t} ${f}" aria-labelledby="sh${p.id}"><div class="bgfx" aria-hidden="true">${fx(t, p)}</div><div class="wrap shg">
 <div class="sht rv ${i % 2 ? "rv-r" : "rv-l"}"><span class="script">${esc(p.categoria)}</span><h3 id="sh${p.id}">${esc(p.nome)}</h3><p>${esc(p.curta)}</p>
 <ul class="chips2">${(TEMAS[t] || []).map(([n, ic], k) => `<li style="--k:${k}"><svg viewBox="0 0 24 24" aria-hidden="true">${IC[ic]}</svg><span>${n}</span></li>`).join("")}</ul>
 <a class="btn gold" href="#/produto/${p.slug}">Ver produto<span class="sr">: ${esc(p.nome)}</span></a></div>
 <div class="shart rv rv-z"><div class="halo"></div><div class="disc" data-par=".06">${media(p, 0)}</div></div></div></section>`;
}
/* ===== VIEWS ===== */
function home() {
  const dest = ordenados().filter((p) => p.destaque);
  return `
<section class="hero5" id="hero" aria-labelledby="h1"><div class="stick">
 <div class="vwrap"><canvas id="cvb" aria-hidden="true"></canvas><canvas id="cv" role="img" aria-label="Bolo de cenoura sendo cortado, com chocolate escorrendo"></canvas></div>
 <div class="sc1" id="sc1"></div><div class="sc2" id="sc2"></div>
 <div class="txt">
  <div class="beat b1" data-a="0" data-b=".2"><span class="script bt">Tão Doce</span><h1 id="h1" class="mk" data-s="1">Pequenos momentos, grandes delícias.</h1></div>
  <div class="beat b2" data-a=".2" data-b=".38"><p class="kw"><span class="bt">Bolo de cenoura</span><span class="bt sm">com cobertura de chocolate</span></p></div>
  <div class="beat b3" data-a=".46" data-b=".72"><h2 class="mk" data-s="1">Feito com carinho, pensado em cada detalhe.</h2><p class="bt">Doces artesanais feitos com carinho para transformar momentos especiais em lembranças inesquecíveis.</p></div>
  <div class="beat b4" data-a=".77" data-b="9"><h2 class="mk" data-s="1">Tem um momento especial chegando?</h2><p class="bt">Encontre as delícias perfeitas para celebrar, presentear ou compartilhar.</p><div class="acts bt"><a class="btn gold" href="#/cardapio">Conheça nosso cardápio</a><a class="btn ghost" href="#/contato">Faça sua encomenda</a></div></div>
 </div>
 <p class="cue" id="cue">Role para descobrir</p></div></section>
${mq()}<section id="destaques"><div class="band"><div class="shards" aria-hidden="true"><img class="ing bandL" src="${ING.pedacos}" alt="" data-par=".05"><img class="ing bandR" src="${ING.pedacos}" alt="" data-par=".05"></div>
 <div class="wrap"><div class="rv"><h2>Feitos para despertar desejos.</h2><p>Descubra algumas das delícias que tornam cada momento ainda mais especial.</p></div></div></div>
 <div class="show">${dest.map(showcase).join("")}</div></section>
<section id="cardapio" class="catalogo"><svg class="wave t" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1440V45C1200 95 960 5 720 50S240 90 0 40Z" fill="#4A2B20"/></svg>
 <div class="wrap"><div class="head rv"><h2>Um mundo de sabores.</h2><p>Encontre a delícia perfeita para acompanhar seu dia ou celebrar uma ocasião especial.</p></div>
 <div class="filters rv" role="group" aria-label="Filtrar por categoria">${CATEGORIAS.map((c, i) => `<button class="chip" aria-pressed="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")}</div>
 <div class="grid" id="grid" aria-live="polite"></div><div class="dots" id="dots" aria-hidden="true"></div></div>
 <svg class="wave b" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 90H1440V45C1200 -5 960 85 720 40S240 0 0 50Z" fill="#FFF9F0"/></svg></section>
<section id="historia" class="essence"><div class="wrap rv">
 <div class="frame rv rv-c"><div><img class="hl" src="${LOGO}" alt="Tão Doce, Doceria Gourmet. Feito com amor!"><span class="script">Feito com amor!</span></div></div>
 <div><h2>Feito com carinho. Pensado em cada detalhe.</h2><p>Na Tão Doce, cada doce é pensado para ser compartilhado e presenteado. Texto provisório: substitua pela história real da marca.</p>${CONFIG.whatsapp ? `<p class="wa"><a class="btn" href="https://wa.me/${esc(CONFIG.whatsapp)}" target="_blank" rel="noopener">Falar no WhatsApp · ${esc(CONFIG.fone || "")}</a></p>` : ""}</div>
</div></section>
<section id="contato" class="order"><div class="wrap rv"><span class="script">Encomendas</span><h2>Tem um momento especial chegando?</h2><p>Encontre as delícias perfeitas para celebrar, presentear ou compartilhar.</p>
 <button class="btn gold" id="enc">Quero fazer uma encomenda</button><div class="msg" id="msg" role="status"></div></div></section>`;
}
function produto(slug) {
  const p = PRODUTOS.find((x) => x.slug === slug);
  if (!p)
    return `<section class="prod"><div class="wrap"><h1>Produto não encontrado</h1><p>Esse produto não existe ou foi removido.</p><a class="btn" href="#/cardapio">Voltar ao cardápio</a></div></section>`;
  const n = 1 + p.imagens.length,
    rel = ordenados().filter((x) => x.id !== p.id);
  return `<section class="prod"><div class="wrap"><nav class="crumb" aria-label="Você está em"><a href="#/">Início</a> / <a href="#/cardapio">Cardápio</a> / ${esc(p.nome)}</nav>
 <div class="pgrid"><div class="gal rv rv-l"><div class="big">${media(p, 0)}</div></div>
 <div class="pinfo rv rv-r"><span class="tag">${esc(p.categoria)}</span><h1>${esc(p.nome)}</h1><p>${esc(p.completa)}</p>
 <dl>${p.preco != null ? `<dt>Preço</dt><dd>${brl(p.preco)}</dd>` : ""}${p.disponibilidade ? `<dt>Disponibilidade</dt><dd>${esc(p.disponibilidade)}</dd>` : ""}</dl>
 <button class="btn" id="enc" data-prod="${esc(p.nome)}">Encomendar</button><div class="msg" id="msg" role="status" style="color:var(--caramelo)"></div></div></div>
 ${rel.length ? `<div class="rel"><h2>Veja também</h2><div class="featured">${rel.map(card).join("")}</div></div>` : ""}</div></section>`;
}
/* ===== INTERAÇÕES ===== */
function pintaGrid(cat) {
  const g = $("#grid");
  if (!g) return;
  const l = ordenados().filter((p) => cat === "Todos" || p.categoria === cat);
  g.innerHTML = l.length
    ? l.map(card).join("")
    : `<div class="empty"><h3>Em breve por aqui</h3><p>Ainda não há produtos em “${esc(cat)}”. Veja todos os produtos do cardápio.</p></div>`;
  pontos();
  obs();
}
function encomendar(nome) {
  const m = $("#msg");
  if (!CONFIG.whatsapp) {
    m.textContent =
      "O contato por WhatsApp ainda não foi configurado. Defina o número em CONFIG.whatsapp.";
    return;
  }
  const t = encodeURIComponent(
    nome ? `Olá! Quero encomendar: ${nome}.` : "Olá! Quero fazer uma encomenda.",
  );
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${t}`, "_blank", "noopener");
}
function liga() {
  splits();
  document.querySelectorAll(".chip").forEach(
    (b) =>
      (b.onclick = () => {
        document.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", x === b));
        pintaGrid(b.dataset.cat);
      }),
  );
  pintaGrid("Todos");
  applyPend();
  const e = $("#enc");
  if (e) e.onclick = () => encomendar(e.dataset.prod);
  obs();
}
function rota() {
  const h = location.hash.replace(/^#\/?/, "");
  const [a, b] = h.split("/");
  const main = $("#conteudo");
  if (a === "produto") {
    main.innerHTML = produto(b);
    scrollTo(0, 0);
  } else {
    main.innerHTML = home();
    liga();
    const alvo = ["cardapio", "destaques", "historia", "contato"].includes(a) ? a : null;
    alvo
      ? requestAnimationFrame(() => document.getElementById(alvo).scrollIntoView())
      : scrollTo(0, 0);
  }
  if (a === "produto") liga();
  $("#nav").classList.remove("open");
  $("#menu").setAttribute("aria-expanded", "false");
  if (a !== "cardapio") megaOpen(false);
  document.title =
    (a === "produto" && PRODUTOS.find((x) => x.slug === b)
      ? PRODUTOS.find((x) => x.slug === b).nome + " | "
      : "") + "Tão Doce | Doceria Gourmet em Alfenas";
}
addEventListener("hashchange", rota);
document.addEventListener("pointermove", (e) => {
  if (REDUZ || e.pointerType !== "mouse") return;
  const c = e.target.closest && e.target.closest(".card");
  if (!c) return;
  const r = c.getBoundingClientRect(),
    x = (e.clientX - r.left) / r.width,
    y = (e.clientY - r.top) / r.height;
  c.style.setProperty("--ry", (x - 0.5) * 10 + "deg");
  c.style.setProperty("--rx", (0.5 - y) * 8 + "deg");
  c.style.setProperty("--mx", x * 100 + "%");
  c.style.setProperty("--my", y * 100 + "%");
});
document.addEventListener("pointerout", (e) => {
  const c = e.target.closest && e.target.closest(".card");
  if (c && !c.contains(e.relatedTarget)) {
    c.style.setProperty("--rx", "0deg");
    c.style.setProperty("--ry", "0deg");
  }
});
$("#menu").onclick = (e) => {
  const o = $("#nav").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", o);
};
addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    $("#nav").classList.remove("open");
    $("#menu").setAttribute("aria-expanded", "false");
  }
});
let rq = 0;
addEventListener(
  "scroll",
  () => {
    $("#hd").classList.toggle("solid", scrollY > 40);
    if (!rq)
      rq = requestAnimationFrame(() => {
        rq = 0;
        tick();
      });
  },
  { passive: true },
);
addEventListener("resize", tick);
$("#ano").textContent = new Date().getFullYear();
$("#contatos").innerHTML = [
  CONFIG.instagram &&
    `<li><a href="${esc(CONFIG.instagram)}" target="_blank" rel="noopener">Instagram</a></li>`,
  CONFIG.whatsapp &&
    `<li><a href="https://wa.me/${esc(CONFIG.whatsapp)}" target="_blank" rel="noopener">WhatsApp: ${esc(CONFIG.fone || "")}</a></li>`,
  `<li>Alfenas, Minas Gerais</li>`,
  CONFIG.endereco && `<li>${esc(CONFIG.endereco)}</li>`,
  CONFIG.horario && `<li>${esc(CONFIG.horario)}</li>`,
]
  .filter(Boolean)
  .join("");

let PEND = null,
  MEGA = false,
  PIN = false,
  HT = 0;
const MENU = [
  {
    t: "Bolos",
    ic: "cake",
    cat: "Bolos",
    it: ["Bolos de Festa", "Bolos no Pote", "Bolos Caseiros", "Bolos Personalizados"],
    img: "bolo-de-cenoura-vulcao",
  },
  {
    t: "Doces",
    ic: "cookie",
    cat: "Doces",
    it: ["Brigadeiros", "Beijinhos", "Doces Finos", "Doces no Pote"],
    img: null,
  },
  {
    t: "Salgados",
    ic: "cup",
    cat: "Salgados",
    it: ["Salgados Assados", "Salgados Fritos", "Mini Pães", "Kit Festa"],
    img: "coxinha-de-frango",
  },
  {
    t: "Bebidas",
    ic: "drink",
    cat: null,
    it: ["Café", "Chocolate Quente", "Sucos Naturais", "Refrigerantes"],
    img: null,
  },
];
const MI = {
  cake: '<path d="M4 20h16v-6H4zM6 14v-3h12v3M12 11V8M12 8c-1-1 0-3 0-3s1 2 0 3"/>',
  cookie:
    '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1"/><circle cx="14" cy="9" r="1"/><circle cx="15" cy="14" r="1"/><circle cx="9" cy="15" r="1"/>',
  cup: '<path d="M5 12h14l-1.5 8h-11zM7 12c0-3 2-5 5-5s5 2 5 5M12 4v3"/>',
  drink: '<path d="M6 8h12l-1.500 12h-9zM5 8h14M9 4h6l1 4M12 4V2"/>',
};
const pimg = (sl) => {
  const q = PRODUTOS.find((x) => x.slug === sl);
  return q && q.imagem ? q.imagem : null;
};

function hdr() {
  $(".logo .seal").innerHTML = `<img src="${LOGO}" alt="">`;
  const fc = $("#rodape .cols>div");
  if (fc)
    fc.insertAdjacentHTML(
      "afterbegin",
      `<img class="flogo" src="${LOGO}" alt="Tão Doce, Doceria Gourmet">`,
    );
  const sp = (x, y, r) => `<i class="sp" style="left:${x}%;top:${y}%;rotate:${r}deg"></i>`;
  $(".hdec").innerHTML =
    `<img class="hs l" src="${ING.respingo}" alt=""><img class="hs r" src="${ING.respingo}" alt=""><img class="hk k1" src="${ING.barra}" alt=""><img class="hk k2" src="${ING.barra}" alt="">` +
    [
      [19, 20, 35],
      [22, 72, -40],
      [31, 16, 50],
      [29, 80, 40],
      [64, 22, -30],
      [71, 78, -55],
      [76, 14, 35],
      [84, 74, -40],
      [93, 20, 45],
    ]
      .map((a) => sp(...a))
      .join("");
  const bi = pimg("bolo-de-cenoura-vulcao");
  $("#mega").innerHTML = `<div class="mg">${MENU.map((c) => {
    const im = c.img && pimg(c.img);
    return `<div class="mc"><svg class="mi" viewBox="0 0 24 24" aria-hidden="true">${MI[c.ic]}</svg><h4>${c.t}</h4><ul>${c.it.map((n) => `<li><a href="#/cardapio" data-cat="${esc(c.cat || "Todos")}">${esc(n)}<i>›</i></a></li>`).join("")}</ul>${im ? `<div class="mt"><img src="${im}" alt="" loading="lazy"></div>` : `<div class="mt ph"><span>Fotos em breve</span></div>`}</div>`;
  }).join("")}
 <div class="mp">${bi ? `<img src="${bi}" alt="">` : ""}<div class="mpt"><span class="script">Feito com muito carinho ♡</span><p>Doces, bolos e salgados feitos com amor para adoçar o seu dia.</p><i class="ln"></i><a class="btn cream" href="#/cardapio" data-cat="Todos">Ver todos os produtos →</a></div></div></div>`;
}
function megaOpen(v, pin) {
  MEGA = v;
  PIN = v && !!pin;
  $("#mega").classList.toggle("on", v);
  $("#mega").setAttribute("aria-hidden", !v);
  $("#navCard").setAttribute("aria-expanded", v);
  spy();
}
function applyPend() {
  if (!PEND) return;
  const b =
    [...document.querySelectorAll(".chip")].find((x) => x.dataset.cat === PEND) ||
    document.querySelector('.chip[data-cat="Todos"]');
  if (b) b.click();
  PEND = null;
}
function goCat(cat) {
  PEND = cat;
  megaOpen(false);
  if (location.hash === "#/cardapio") {
    applyPend();
    const e = $("#cardapio");
    if (e) e.scrollIntoView();
  } else location.hash = "#/cardapio";
}
function spy() {
  const home = !!$("#hero");
  let act = null;
  if (home) {
    act = "inicio";
    for (const [id, k] of [
      ["destaques", "destaques"],
      ["cardapio", "cardapio"],
      ["historia", "historia"],
      ["contato", "contato"],
    ]) {
      const e = document.getElementById(id);
      if (e && e.getBoundingClientRect().top < innerHeight * 0.45) act = k;
    }
  }
  document
    .querySelectorAll("nav a[data-k]")
    .forEach((a) =>
      a.classList.toggle("act", MEGA ? a.dataset.k === "cardapio" : a.dataset.k === act),
    );
}
$("#navCard").addEventListener("click", (e) => {
  e.preventDefault();
  $("#nav").classList.remove("open");
  $("#menu").setAttribute("aria-expanded", "false");
  if (MEGA && PIN) {
    megaOpen(false);
    return;
  }
  megaOpen(true, true);
  if (location.hash === "#/cardapio") {
    const t = $("#cardapio");
    if (t) t.scrollIntoView();
  } else location.hash = "#/cardapio";
});
$("#mega").addEventListener("click", (e) => {
  const a = e.target.closest("a[data-cat]");
  if (a) {
    e.preventDefault();
    goCat(a.dataset.cat);
  }
});
document.addEventListener("click", (e) => {
  if (MEGA && !e.target.closest("#hd")) megaOpen(false);
});
addEventListener("keydown", (e) => {
  if (e.key === "Escape" && MEGA) megaOpen(false);
});
["wheel", "touchmove"].forEach((ev) =>
  addEventListener(
    ev,
    (e) => {
      if (MEGA && PIN && !e.target.closest("#mega")) megaOpen(false);
    },
    { passive: true },
  ),
);
rota();
tick();
hdr();
