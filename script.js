//Chamada do prompt
const prompt = require('prompt-sync')();

//Cria função sleep
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

//Classe construtora do jogador
class jogador {
	constructor(nome, dado, vitorias) {
		this.nome = nome;
		this.dado = dado;
		this.vitorias = vitorias;
	}
}

//Variaveis Globais
let dados;
let ladoMaior;
let vencedorRodada;

//Solicita quantidade de rodadas e jogadores
const rodadas = +prompt('Informe a quantidade de rodadas: ');
const quant_jogadores = +prompt('informe a quantidade de jogadores: ');
const lista = [];

//Constroi a lista de jogadores
for (let i = 1; i <= quant_jogadores; i++) {
	lista.push(new jogador(prompt(`Digite o nome do jogador ${i}: `), 0, 0));
}

//Função principal do programa
async function rodada() {
	for (let i = 0; i < rodadas; i++) {
		dados = [];
		for (let j = 0; j < lista.length; j++) {
			dados.push(Math.floor(6 * Math.random() + 1));
			lista[j].dado = dados[j];
		}

		//Obtem o maior valor do dado recebido na rodada
		ladoMaior = dados.sort((a, b) => a - b)[dados.length - 1];

		//Incrementa vitoria para os jogadores que tiraram o valor mais alto
		for (const l of lista) {
			if (l.dado === ladoMaior) l.vitorias++;
		}

		//Exibe o vencedor ou vencedores da rodada atual
		vencedorRodada = lista.filter((a) => a.dado === ladoMaior);
		console.log(`Rodada ${i + 1}`);
		console.log(vencedorRodada);
		await sleep(1000);
	}

	//Faz a apuração de quem venceu mais vezes
	const maiorPontuacao = lista.sort((a, b) => a.vitorias - b.vitorias)[lista.length - 1].vitorias;
	const vencedoresJogo = lista.filter((a) => a.vitorias === maiorPontuacao);

	//exibe o vencedor ou vencedores caso tenha empate no placar final
	console.log(`O(s) vencedor(es) do jogo é(sao): `);
	for (const v of vencedoresJogo) console.log(`${v.nome} com ${v.vitorias} vitórias`);
}

rodada();
