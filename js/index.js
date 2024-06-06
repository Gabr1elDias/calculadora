// DECLARAÇÕES DAS VARIÁVEIS SELECIONADAS NO HTML
const operacaoAnterior = document.querySelector("#operacao-anterior");
const operacaoAtual = document.querySelector("#operacao-atual");
const buttons = document.querySelectorAll("#buttons-container button");

// CRIAÇÃO DA CLASSE CALCULADORA E SEU CONSTRUTOR
class Calculadora {
  constructor(operacaoAnterior, operacaoAtual) {
    this.operacaoAnterior = operacaoAnterior;   // O QUE O USUÁRIO JÁ DIGITOU
    this.operacaoAtual = operacaoAtual;         // O QUE O USUÁRIO ESTÁ DIGITANDO
    this.operacaoAplicada = "";                 // CLICK DO USUÁRIO EM ALGUM BOTÃO
  }

// PERMITE A ADIÇÃO DO DÍGITO A OPERAÇÃO ATUAL E NÃO DEIXA INSERIR VÁRIOS PONTOS DECIMAIS
    adicionarDigito(digito){
        if(digito === "." && this.operacaoAtual.innerText.includes(".")){
            return;
        }
        this.operacaoAplicada = digito
        this.atualizarTela();
    }

// MÉTODO ONDE O PRIMEIRO IF VERIFICA SE POSSUI ALGUM NÚMERO NO OPERAÇÃO ATUAL E SE ESTÁ VAZIO 
// SEGUNDO VERIFICA SE NÃO ESTÁ VAZIO, SE POSSUIR NÚMERO, É POSSÍVEL FAZER A ALTERAÇÃO DO SINAL DE OPERAÇÃO 
    processarOperacao(operacao) {
    if (this.operacaoAtual.innerText === "" && operacao !== "C"){
      if (this.operacaoAnterior.innerText !== ""){
        this.mudarOperacao(operacao);
      }
      return;
    }
        

// FAZ A CONVERSÃO DOS VALORES PARA NÚMEROS E ARMAZENA 
    let anterior =+ this.operacaoAnterior.innerText.split(" ")[0];
    let atual =+ this.operacaoAtual.innerText;
// ARMAZENA O RESULTADO DA OPERAÇÃO FEITA 
    let resultado;

// TIPOS DE OPERAÇÕES
    switch(operacao){
        case "+":
            resultado = anterior + atual;
            this.atualizarTela(resultado, operacao, atual, anterior);
            break;
        case "-":
            resultado = anterior - atual;
            this.atualizarTela(resultado, operacao, atual, anterior);
            break;
        case "x":
            resultado = anterior * atual;
            this.atualizarTela(resultado, operacao, atual, anterior);
            break;
        case "/":
            resultado = anterior / atual;
            this.atualizarTela(resultado, operacao, atual, anterior);
            break;
        case "DEL":
            this.processarDEL();
            break;
        case "C":
            this.processarC();
            break;
        case "PI":
            this.processarPI();
            break;
        case "=":
            this.processarIgual();
            break;
        case "?":
            this.easterEgg();
            break;
        default:
            break;     
        }
    }

// MÉTODO QUE FAZ A VERIFICAÇÃO E ATUALIZA OS NÚMEROS NA TELA
// VERIFICA SE O RESULTADO É NULO E EXIBE NA opercacaoAtual O NÚMERO DIGITADO PELO USUÁRIO
// SE NÃO FOR NULO, UMA OPERAÇÃO JA FOI REALIZADA E A VARIÁVEL resultado JÁ POSSUI VALOR, SENDO ASSIM EXIBIDA NA operacaoAnterior
// O SEGUNDO IF VERIFICA SE O anterior É 0, SENDO ASSIM SOMADO AO resultado POR SER A PRIMERIA APLICAÇÃO
    atualizarTela(resultado = null, operacao = null, atual = null, anterior = null){
        if(resultado === null){
            this.operacaoAtual.innerText += this.operacaoAplicada;
        } else {
            if(anterior === 0){
                resultado = atual;
            }
            this.operacaoAnterior.innerText = `${resultado} ${operacao}`;
            this.operacaoAtual.innerText = "";
        }      
    }

// MÉTODO QUE POSSIBILITA A TROCA DE SINAL
// PERMITINDO SOMENTE AS OPERAÇÕES QUE CONTÉM NO ARRAY mathOperacao
// E FAZ A REMOÇÃO DO ULTIMO DÍGITO (SINAL) NA operacaoAnterior E ADICIONA O NOVO SINAL QUE O USUÁRIO CLICAR
    mudarOperacao(sinal){
        const mathOperacao = ["+", "-", "x", "/"];
            if(!mathOperacao.includes(sinal)){
                return;
            }
        this.operacaoAnterior.innerText = this.operacaoAnterior.innerText.slice(0, -1) + sinal;
    }

// APAGA O ÚLTIMO DÍGITO DA OPERAÇÃO
    processarDEL(){
        this.operacaoAtual.innerText = this.operacaoAtual.innerText.slice(0, -1);
    }

// LIMPA TODAS AS OPERAÇÕES
    processarC(){
        this.operacaoAtual.innerText = "";
        this.operacaoAnterior.innerText = "";
    }

// ADICIONA O VALOR DE PI A OPERAÇÃO
    processarPI(){
        this.operacaoAtual.innerText = "3.141592653589793";
    }

// REALIZA A OPERAÇÃO
    processarIgual(){
        const operacao = operacaoAnterior.innerText.split(" ")[1];
        this.processarOperacao(operacao);
    }

// MENSAGEM DE EASTER EGG 
    easterEgg(){
        this.operacaoAtual.innerText = "Oiiiiii pessoal da Bagaggio :)";
    }
}

// CRIA O OBJETO CALCULADORA
const calculadora = new Calculadora(operacaoAnterior ,operacaoAtual);

// PERCORRE CADA BOTÃO E REALIZA UM EVENTO DE ACORDO COM O SEU TIPO
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (e) => {
        const value = e.target.innerText;
        if (parseInt(value) >= 0 || value === ".") {
            calculadora.adicionarDigito(value);
        } else {
            calculadora.processarOperacao(value);
        }

        if(value === "PI"){
            calculadora.processarPI();
        }
        
        if(value === "?"){
            calculadora.easterEgg();
        }
    });
};