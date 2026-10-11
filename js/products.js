/* ===== DADOS PROVISÓRIOS DOS PRODUTOS =====
   Troque "imagem" pelo caminho da foto real (ex.: "img/sobremesa-copo.jpg").
   Enquanto for null, aparece uma ilustração provisória. Preço null = não exibe. */
const CATEGORIAS = [
  "Todos",
  "Bolos",
  "Salgados",
  "Sobremesas no copo",
  "Doces",
  "Presentes e ocasiões especiais",
];

/* "ingredientes": fotos em PNG com fundo transparente (creme de avelã, avelãs, chocolate, cenoura...) que flutuam no fundo do destaque. Até 6 por produto. */
const PRODUTOS = [
  {
    id: 1,
    nome: "Mini bolo de avelã e ninho",
    slug: "mini-bolo-de-avela-e-ninho",
    categoria: "Bolos",
    curta: "Mini bolo de avelã e ninho, decorado com fita personalizada Tão Doce.",
    completa:
      "Mini bolo de avelã e ninho, decorado com fita personalizada com a marca Tão Doce. Texto provisório: substitua pela descrição oficial.",
    imagem: IMG.avela,
    imagens: [],
    preco: null,
    disponibilidade: null,
    ingredientes: [
      { k: "avela", r: 3, b: 6, w: 230, rot: -6, v: 0.05, m: 1 },
      { k: "barra", l: 4, t: 8, w: 200, rot: -10, v: 0.07, f: 1, m: 2 },
      { k: "ninho", l: 47, b: 6, w: 95, rot: 10, v: 0.04 },
      { k: "pedacos", l: 34, t: 2, w: 300, rot: 20, v: 0.03, bl: 4, o: 0.6, f: 1 },
      { k: "pedacos", r: -4, t: -3, w: 270, rot: -30, v: 0.14, bl: 5, f: 1 },
    ],
    destaque: true,
    ordem: 1,
    tema: "avela",
  },
  {
    id: 2,
    nome: "Coxinha de frango",
    slug: "coxinha-de-frango",
    categoria: "Salgados",
    curta: "Coxinha de frango com massa empanada e recheio generoso.",
    completa:
      "Coxinha de frango com massa empanada e recheio generoso. Texto provisório: substitua pela descrição oficial.",
    imagem: IMG.coxinha,
    imagens: [],
    preco: null,
    disponibilidade: null,
    ingredientes: [
      { k: "frango", l: 3, t: 7, w: 200, rot: -20, v: 0.06, f: 1 },
      { k: "frango", l: 2, b: 5, w: 230, rot: 25, v: 0.04, m: 1 },
      { k: "frango", r: 6, t: 6, w: 170, rot: -35, v: 0.08, f: 1 },
      { k: "frango", r: 4, b: 4, w: 170, rot: 70, v: 0.05, m: 2 },
      { k: "frango", l: 44, t: 3, w: 250, rot: 40, v: 0.03, bl: 4, o: 0.55, f: 1 },
      { k: "frango", l: -6, b: 28, w: 290, rot: -15, v: 0.14, bl: 5, f: 1 },
    ],
    destaque: true,
    ordem: 2,
    tema: "salgado",
  },
  {
    id: 3,
    nome: "Bolo de cenoura vulcão",
    slug: "bolo-de-cenoura-vulcao",
    categoria: "Bolos",
    curta: "Bolo de cenoura vulcão com cobertura de chocolate e granulado.",
    completa:
      "Bolo de cenoura vulcão com cobertura de chocolate e granulado por cima. Texto provisório: substitua pela descrição oficial.",
    imagem: IMG.cenoura,
    imagens: [],
    preco: null,
    disponibilidade: null,
    ingredientes: [
      { k: "pedacos", r: 2, t: 8, w: 520, rot: 0, v: 0.04 },
      { k: "respingo", l: 3, t: 7, w: 240, rot: -12, v: 0.06, f: 1, m: 1 },
      { k: "barra", r: 4, b: 5, w: 200, rot: 14, v: 0.07, f: 1, m: 2 },
      { k: "pedacos", l: 40, b: 9, w: 210, rot: -25, v: 0.03, bl: 4, o: 0.6, f: 1 },
      { k: "pedacos", l: -4, b: -3, w: 300, rot: 35, v: 0.14, bl: 5, f: 1 },
    ],
    destaque: true,
    ordem: 3,
    tema: "cenoura",
  },
];
