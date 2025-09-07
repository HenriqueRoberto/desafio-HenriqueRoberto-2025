// src/abrigo-animais.js
class AbrigoAnimais {
  constructor() {
    // Base oficial do desafio (nome -> { especie, favoritos })
    this.animais = {
      REX: { especie: 'cão', favoritos: ['RATO', 'BOLA'] },
      MIMI: { especie: 'gato', favoritos: ['BOLA', 'LASER'] },
      FOFO: { especie: 'gato', favoritos: ['BOLA', 'RATO', 'LASER'] },
      ZERO: { especie: 'gato', favoritos: ['RATO', 'BOLA'] },
      BOLA: { especie: 'cão', favoritos: ['CAIXA', 'NOVELO'] },
      BEBE: { especie: 'cão', favoritos: ['LASER', 'RATO', 'BOLA'] },
      LOCO: { especie: 'jabuti', favoritos: ['SKATE', 'RATO'] },
    };

    // Universo de brinquedos válidos (derivado da tabela)
    this.brinquedosValidos = new Set(
      Object.values(this.animais).flatMap((a) => a.favoritos)
    );
  }

  // Utilidades -------------
  _parseListaCSV(s) {
    if (!s) return [];
    return s
      .split(',')
      .map((x) => x.trim())
      .filter((x) => x.length > 0)
      .map((x) => x.toUpperCase());
  }

  _temDuplicados(lista) {
    return new Set(lista).size !== lista.length;
  }

  _subsequencia(ordemDesejada, listaPessoa) {
    // ordemDesejada precisa aparecer como subsequência em listaPessoa
    let i = 0;
    for (const item of listaPessoa) {
      if (item === ordemDesejada[i]) i++;
      if (i === ordemDesejada.length) return true;
    }
    return ordemDesejada.length === 0; // vazio é sempre verdadeiro
  }

  _contemTodos(itens, listaPessoa) {
    const set = new Set(listaPessoa);
    return itens.every((t) => set.has(t));
  }

  // Regra especial do LOCO:
  // - não liga para a ORDEM (basta conter todos os favoritos)
  // - só pode sair se tiver "companhia": a pessoa já deve ter adotado ≥ 1 animal
  _podeAdotarLoco(listaPessoa, favoritos, adotadosDaPessoa) {
    return this._contemTodos(favoritos, listaPessoa) && adotadosDaPessoa >= 1;
  }

  // Validações de entrada ----
  _validarBrinquedos(p1, p2) {
    if (this._temDuplicados(p1) || this._temDuplicados(p2)) {
      return { erro: 'Brinquedo inválido' };
    }
    const todos = [...p1, ...p2];
    for (const b of todos) {
      if (!this.brinquedosValidos.has(b)) {
        return { erro: 'Brinquedo inválido' };
      }
    }
    return null;
  }

  _validarAnimais(ordem) {
    if (this._temDuplicados(ordem)) return { erro: 'Animal inválido' };
    for (const nome of ordem) {
      if (!this.animais[nome]) return { erro: 'Animal inválido' };
    }
    return null;
  }

  // Algoritmo principal ------
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Normalização das entradas
    const p1 = this._parseListaCSV(brinquedosPessoa1);
    const p2 = this._parseListaCSV(brinquedosPessoa2);
    const ordem = this._parseListaCSV(ordemAnimais);

    // Validações de erro
    const errB = this._validarBrinquedos(p1, p2);
    if (errB) return { erro: errB.erro };
    const errA = this._validarAnimais(ordem);
    if (errA) return { erro: errA.erro };

    // Contagem por pessoa (máx. 3)
    let adotados1 = 0;
    let adotados2 = 0;

    const decisoes = []; // { nome, destino }

    // Processa na ORDEM fornecida
    for (const nomeUP of ordem) {
      const nomeFmt = this._formatarNome(nomeUP);
      const info = this.animais[nomeUP];
      const favoritos = info.favoritos;

      let qual1 = false;
      let qual2 = false;

      if (nomeUP === 'LOCO') {
        // Regra especial do Loco
        qual1 = this._podeAdotarLoco(p1, favoritos, adotados1);
        qual2 = this._podeAdotarLoco(p2, favoritos, adotados2);
      } else {
        // Regra geral: subsequência na ordem desejada (intercalando é permitido)
        qual1 = this._subsequencia(favoritos, p1);
        qual2 = this._subsequencia(favoritos, p2);
      }

      // Se ambos qualificados → abrigo
      let destino = 'abrigo';

      // Só um qualificado: respeitar limite de 3 por pessoa
      if (qual1 && !qual2 && adotados1 < 3) {
        destino = 'pessoa 1';
        adotados1++;
      } else if (qual2 && !qual1 && adotados2 < 3) {
        destino = 'pessoa 2';
        adotados2++;
      } else if (qual1 && !qual2 && adotados1 >= 3) {
        destino = 'abrigo';
      } else if (qual2 && !qual1 && adotados2 >= 3) {
        destino = 'abrigo';
      } else {
        // (ambos qualificados) ou (nenhum)
      }

      decisoes.push({ nome: nomeFmt, destino });
    }

    // Saída: lista em ordem alfabética dos animais considerados
    const lista = decisoes
      .sort((a, b) => a.nome.localeCompare(b.nome))
      .map((d) => `${d.nome} - ${d.destino}`);

    return { lista };
  }

  _formatarNome(nomeUP) {
    // mantém capitalização do enunciado (Rex, Mimi, Fofo, Zero, Bola, Bebe, Loco)
    const mapa = {
      REX: 'Rex',
      MIMI: 'Mimi',
      FOFO: 'Fofo',
      ZERO: 'Zero',
      BOLA: 'Bola',
      BEBE: 'Bebe',
      LOCO: 'Loco',
    };
    return mapa[nomeUP] ?? nomeUP;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
