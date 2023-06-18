var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var tela = document.getElementById("myCanvas");
var c = tela.getContext("2d");

var imagem = new Image();
imagem.src = 'boneco.png';

let pontuacao = 0;

const faculdade = new Image();
faculdade.src = "faculdade.png";

const vermelho = new Image();
vermelho.src = "vermelho.png";

const verde = new Image();
verde.src = "verde.png";

const amarelo = new Image();
amarelo.src = "amarelo.png";

const azul = new Image();
azul.src = "azul.png";

const laranja = new Image();
laranja.src = "laranja.png";

const cinza = new Image();
cinza.src = "cinza.png";

const rosa = new Image();
rosa.src = "rosa.png";


var backgroundImage = document.getElementById("backgroundImage");
desenhaImagem();

const jogar = document.getElementById("jogar");
jogar.addEventListener("click", iniciarJogo);
function desenhaImagem() {
    c.drawImage(backgroundImage, 0, 0, tela.width, tela.height);
}


let tempoDecorrido = 0;
let tempoLimite = 1380;
let gameover = false; // Estado do jogo
let ganhou = false;
let jogoIniciado = false;

function atualizarCronometro() {
    if(!jogoIniciado || ganhou){
        return;
    }


    tempoDecorrido++;
    if (tempoDecorrido >= 1380) {
        gameover = true;
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0.5, 'red');
        gradient.addColorStop(0.2, 'blue');
        gradient.addColorStop(1, 'orange');

        ctx.fillStyle = gradient;
        ctx.font = "bold 100px fantasy";
        ctx.fillText("Game Over", 300, 300);
    }

}

function formatarTempo(tempo) {
    const tempoRestante = 1380 - tempo;
    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

function exibirCronometro() {
    if (!jogoIniciado) {
        return;
    }
    const tempoRestante = 1380 - tempoDecorrido;

    // Desenhar a caixa branca com borda arredondada
    ctx.fillStyle = 'darkred';
    ctx.fillRect(10, 10, 200, 40);
    ctx.strokeStyle = 'darkgreen'; // Cor da borda
    ctx.lineWidth = 2; // Espessura da borda
    ctx.lineJoin = 'round'; // Cantos arredondados
    ctx.strokeRect(10, 10, 200, 40); // Desenhar a borda

    // Definir a cor e estilo da fonte
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px "Segoe UI", sans-serif';

    // Exibir o texto
    const textoTempo = `Time: ${formatarTempo(tempoDecorrido)}`;
    const textoX = 55;
    const textoY = 35;
    ctx.fillText(textoTempo, textoX, textoY);

    // Adicionar elementos visuais adicionais
    const barraProgressoX = 10;
    const barraProgressoY = 60;
    const barraProgressoLargura = 200;
    const barraProgressoAltura = 10;
    const barraProgressoPreenchimento = tempoRestante / 1380;
    const barraProgressoCor = tempoRestante <= 10 ? 'red' : 'darkgreen';

    // Desenhar a barra de progresso
    ctx.fillStyle = 'darkred';
    ctx.fillRect(barraProgressoX, barraProgressoY, barraProgressoLargura, barraProgressoAltura);
    ctx.fillStyle = barraProgressoCor;
    ctx.fillRect(barraProgressoX, barraProgressoY, barraProgressoLargura * barraProgressoPreenchimento, barraProgressoAltura);
    exibirPontuacao()
}
function exibirPontuacao() {
    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(220, 10, 120, 40);
    ctx.strokeStyle = 'darkred'; // Cor da borda
    ctx.lineWidth = 2; // Espessura da borda
    ctx.lineJoin = 'round'; // Cantos arredondados
    ctx.strokeRect(220, 10, 120, 40);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px "Segoe UI", sans-serif';
    const textoPontuacao = `Score: ${pontuacao}`;
    const textoX = 240;
    const textoY = 35;
    ctx.fillText(textoPontuacao, textoX, textoY);
}
function iniciarJogo() {
    jogoIniciado = true;
    animarBoneco();
}


// Posição inicial do boneco
let bonecoX = 860;
let bonecoY = 490;

// Tamanho do passo para mover o boneco
const passo = 5;

canvas.addEventListener("mousedown", function () {
    if (gameover) {
        gameover = false; // Reinicia o estado do jogo
        animarBoneco(); // Inicia a animação novamente
    }
});

function reiniciarJogo(){
    bonecoX = 860;
    bonecoY = 490;
    gameover = false;
    ganhou = false;
    tempoDecorrido = 0;

    limparCanvas()

}

// Event listener para ouvir as teclas pressionadas
document.addEventListener("keydown", function (event) {
    // Mover o boneco para a esquerda
    if (event.code === "ArrowLeft"&& bonecoX > 0) {
        bonecoX -= passo;
    }
    // Mover o boneco para a direita
    if (event.code === "ArrowRight" && bonecoX +80 < canvas.width) {
        bonecoX += passo;
    }
    // Mover o boneco para cima
    if (event.code === "ArrowUp" && bonecoY > 0) {
        bonecoY -= passo;
    }
    // Mover o boneco para baixo
    if (event.code === "ArrowDown" && bonecoY + 40 < canvas.height) {
        bonecoY += passo;
    }
});

// Função para desenhar o boneco na tela
function desenharBoneco() {
    ctx.drawImage(imagem, bonecoX, bonecoY, 80, 40);
}
// Função para limpar o canvas
function limparCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


const restart = document.getElementById('restart');
restart.addEventListener('click', function () {
    reiniciarJogo();
    animarBoneco();
});


// Função para animar o boneco
function animarBoneco() {
    if (!jogoIniciado || gameover || ganhou ) {
        return; // Retorna se o jogo estiver no estado "Game Over"
    }

    tempoDecorrido += 1;
    if (tempoDecorrido >= tempoLimite) {
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0.5, 'red');
        gradient.addColorStop(0.2, 'blue');
        gradient.addColorStop(1, 'orange');

        ctx.fillStyle = gradient;
        ctx.font = 'bold 100px fantasy';
        ctx.fillText('Game Over', 300, 300);

        gameover = true; // Define o estado do jogo como "Game Over"
        return;
      
    }


    limparCanvas();
    desenhaImagem()
    moveVermelho();
    moveVerde();
    moveAmarelo();
    moveAzul();
    moveLaranja();
    moveCinza();
    moveRosa();
    desenharBoneco();
    atualizarCronometro()
    exibirCronometro()
    ctx.drawImage(faculdade, 400, 0, 190, 110);

    if (bonecoX + 80 >= x1 && bonecoX <= x1 + 40 && bonecoY + 40 >= 340 && bonecoY <= 420 ||
        bonecoX + 80 >= x2 && bonecoX <= x2 + 40 && bonecoY + 40 >= 340 && bonecoY <= 420 ||
        bonecoX + 80 >= x3 && bonecoX <= x3 + 40 && bonecoY + 40 >= 340 && bonecoY <= 420 ||
        bonecoX + 80 >= x4 && bonecoX <= x4 + 40 && bonecoY + 40 >= 340 && bonecoY <= 420) {
        // Reiniciar o jogo da posição inicial do boneco
        bonecoX = 860;
        bonecoY = 490;

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0.5, 'red');
        gradient.addColorStop(0.2, 'blue');
        gradient.addColorStop(1, 'orange');

        ctx.fillStyle = gradient;
        ctx.font = "bold 100px fantasy";
        ctx.fillText("Game Over", 300, 300);

        gameover = true; // Define o estado do jogo como "Game Over"
        pontuacao -= 1
    }

    if (bonecoX + 80 >= x5 && bonecoX <= x5 + 40 && bonecoY + 40 >= 140 && bonecoY <= 220 ||
        bonecoX + 80 >= x6 && bonecoX <= x6 + 40 && bonecoY + 40 >= 140 && bonecoY <= 220 ||
        bonecoX + 80 >= x7 && bonecoX <= x7 + 40 && bonecoY + 40 >= 140 && bonecoY <= 220) {
        // Reiniciar o jogo da posição inicial do boneco
        bonecoX = 860;
        bonecoY = 490;
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0.5, 'red');
        gradient.addColorStop(0.2, 'blue');
        gradient.addColorStop(1, 'orange');

        ctx.fillStyle = gradient;
        ctx.font = "bold 100px fantasy";
        ctx.fillText("Game Over", 300, 300);

        gameover = true; // Define o estado do jogo como "Game Over"
        pontuacao -= 1
    }

    else if (
        bonecoX + 80 >= 400 && bonecoX <= 590 && bonecoY + 40 >= 0 && bonecoY <= 110
    ) {
        bonecoX = 860;
        bonecoY = 490;
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0.5, 'green');
        gradient.addColorStop(0.2, 'blue');
        gradient.addColorStop(1, 'orange');

        ctx.fillStyle = gradient;
        ctx.font = "bold 100px fantasy";
        ctx.fillText("Ganhou!", 300, 300);

        ganhou = true; // Define o estado do jogo como "Game Over"
        pontuacao += 1;

    }

    // Verificar colisão com outros objetos e condições de game over

    desenharBoneco();

    requestAnimationFrame(animarBoneco);
}

// Iniciar a animação do boneco
requestAnimationFrame(animarBoneco);


let x1 = 5;
let x2 = 270;
let x3 = 510;
let x4 = 750;
let x5 = 100;
let x6 = 450;
let x7 = 750;

let direction1 = 1; // direção do movimento (1 para a direita, -1 para a esquerda)
let direction2 = 1;
let direction3 = 1;
let direction4 = 1;

function moveVermelho() {
    x1 += direction1 ;
    if (x1 < 5 || x1 > 190) {
        direction1 *= -1;
    }
    ctx.drawImage(vermelho,x1, 340, 40, 80);
}

function moveVerde() {
    x2 += direction2 ;
    if (x2 < 270 || x2 > 450) {
        direction2 *= -1;
    }
    ctx.drawImage(verde,x2, 340, 40, 80);
}

function moveAmarelo() {
    x3 += direction3 ;
    if (x3 < 510 || x3 > 680) {
        direction3 *= -1;
    }
    ctx.drawImage(amarelo,x3, 340, 40, 80);
}

function moveAzul() {
    x4 += direction4 ;
    if (x4 < 750 || x4 > 910) {
        direction4 *= -1;
    }
    ctx.drawImage(azul,x4, 340, 40, 80);
}

let direction5 = 1;
let direction6 = 1;
let direction7 = 1;

function moveLaranja() {
    x5 += direction5 * 2;
    if (x5 < 100 || x5 > 350) {
        direction5 *= -1;
    }
    ctx.drawImage(laranja,x5, 140, 40, 80);
}

function moveCinza() {
    x6 += direction6 * 2;
    if (x6 < 450 || x6 > 680) {
        direction6 *= -1;
    }
    ctx.drawImage(cinza,x6, 140, 40, 80);
}

function moveRosa() {
    x7 += direction7 * 2;
    if (x7 < 750 || x7 > 890) {
        direction7 *= -1;
    }
    ctx.drawImage(rosa,x7, 140, 40, 80);
}

