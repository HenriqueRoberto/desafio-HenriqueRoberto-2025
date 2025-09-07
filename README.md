# 🐾 Desafio - Abrigo de Animais

Este repositório contém a minha solução para o desafio **Abrigo de Animais**, parte do processo seletivo de estágio 2025.

---

## 📌 Sobre o desafio
Você foi contratado para ajudar na organização de um abrigo de animais.  
A missão é desenvolver uma lógica em **JavaScript (Node.js)** que encontra pessoas aptas a adotar animais seguindo regras específicas.

---

## ⚙️ Como rodar o projeto

### 1. Clonar o repositório
```
git clone https://github.com/HenriqueRoberto/desafio-HenriqueRoberto-2025.git
cd desafio-HenriqueRoberto-2025
```

### 2. Instalar dependências
```
npm install
```

### 3. Rodar os testes automáticos
```
npm test
```

Os testes foram implementados com **Jest** e validam os principais cenários do desafio.  
Exemplo de saída esperada:
```
PASS  src/abrigo-animais.test.js
  Abrigo de Animais
    ✓ Deve rejeitar animal inválido
    ✓ Deve encontrar pessoa para um animal
    ✓ Deve encontrar pessoa para um animal intercalando brinquedos
```

### 4. Rodar manualmente (opcional)
Você pode testar entradas e saídas no terminal rodando:

```
node run.js "RATO,BOLA" "RATO,NOVELO" "Rex,Fofo"
```

Saída esperada:
```json
{
  "lista": [
    "Fofo - abrigo",
    "Rex - pessoa 1"
  ]
}
```

Outro exemplo:
```
node run.js "CAIXA,RATO" "RATO,BOLA" "Lulu"
```

Saída:
```json
{
  "erro": "Animal inválido"
}
```

---

## 📂 Estrutura do projeto
```
src/
 ├─ abrigo-animais.js       # Classe principal AbrigoAnimais
 └─ abrigo-animais.test.js  # Testes automatizados com Jest
jest.config.js              # Configuração do Jest
package.json                # Dependências e scripts
run.js                      # Script auxiliar para testes manuais
```

---

## 📝 Regras implementadas
- O animal vai para a pessoa que mostrar todos seus brinquedos favoritos na **ordem desejada**  
- A pessoa pode **intercalar brinquedos extras**  
- Se **ambas** as pessoas podem adotar → animal fica no **abrigo**  
- Cada pessoa pode adotar **até 3 animais**  
- **Loco** (jabuti) não se importa com a ordem, mas só sai se tiver outro animal como companhia  
- Validações de entrada:  
  - Animal inválido ou duplicado → `Animal inválido`  
  - Brinquedo inválido ou duplicado → `Brinquedo inválido`  

---

## 🚀 Tecnologias
- [Node.js](https://nodejs.org/)  
- [Jest](https://jestjs.io/)  
