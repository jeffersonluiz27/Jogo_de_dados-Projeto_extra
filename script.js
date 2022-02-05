const prompt = require('prompt-sync')();

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

class jogador {
  constructor(nome, dado, vitorias) {
    this.nome = nome;
    this.dado = dado;
    this.vitorias = vitorias;
  }
}
let dados;
let ladoMaior;
let vencedorRodada;

const rodadas = +prompt('Informe a quantidade de rodadas: ');
const quant_jogadores = +prompt('informe a quantidade de jogadores: ');
const lista = [];

for (let i = 1; i <= quant_jogadores; i++) {
  lista.push(new jogador(prompt(`Digite o nome do jogador ${i}: `), 0, 0));
}

async function rodada() {
  for (let i = 0; i < rodadas; i++) {
    dados = [];
    for (let j = 0; j < lista.length; j++) {
      dados.push(Math.floor(6 * Math.random() + 1));
      lista[j].dado = dados[j];
    }

    ladoMaior = dados.sort((a, b) => a - b)[dados.length - 1];

    for (const l of lista) {
      if (l.dado === ladoMaior) l.vitorias++;
    }

    vencedorRodada = lista.filter((a) => a.dado === ladoMaior);
    console.log(`Rodada ${i + 1}`);
    console.log(vencedorRodada);
    await sleep(1000);
  }

  const maiorPontuacao = lista.sort((a, b) => a.vitorias - b.vitorias)[
    lista.length - 1
  ].vitorias;
  const vencedoresJogo = lista.filter((a) => a.vitorias === maiorPontuacao);

  console.log(`O(s) vencedor(es) do jogo é(sao): `);
  for (const v of vencedoresJogo) console.log(v.nome);
}

rodada();
