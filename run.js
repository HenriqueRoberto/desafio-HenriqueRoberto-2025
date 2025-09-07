import { AbrigoAnimais } from './src/abrigo-animais.js';

const abrigo = new AbrigoAnimais();

// Pegando argumentos do terminal
const args = process.argv.slice(2);

if (args.length !== 3) {
  console.log(
    'Uso: node run.js "brinquedosPessoa1" "brinquedosPessoa2" "ordemAnimais"'
  );
  console.log('Exemplo: node run.js "RATO,BOLA" "RATO,NOVELO" "Rex,Fofo"');
  process.exit(1);
}

const [p1, p2, ordem] = args;
const resultado = abrigo.encontraPessoas(p1, p2, ordem);

console.log(JSON.stringify(resultado, null, 2));
