

const symbols = ['🐯', '🐵', '🐻', '🐭', '🦅'];

let gamesPlayed = 0;
let money = 50;
let betAmount = 10; // apuesta por defecto (5 o 10)

const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');

const button = document.getElementById('play');
const message = document.getElementById('message');

const leverSound = document.getElementById('leverSound');
const spinSound = document.getElementById('spinSound');
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');

// Botones de apuesta
const bet5 = document.getElementById('bet5');
const bet10 = document.getElementById('bet10');
// Mostrar apuesta inicial
if (document.getElementById('currentBet')) document.getElementById('currentBet').textContent = betAmount;

bet5 && bet5.addEventListener('click', () => {
    betAmount = 5;
    document.getElementById('currentBet').textContent = betAmount;
    bet5.classList.add('active');
    bet10.classList.remove('active');
});

bet10 && bet10.addEventListener('click', () => {
    betAmount = 10;
    document.getElementById('currentBet').textContent = betAmount;
    bet10.classList.add('active');
    bet5.classList.remove('active');
});

function randomSymbol() {
    const index = Math.floor(Math.random() * symbols.length);
    return symbols[index];
} ;


function spin() {
reel1.textContent = randomSymbol();
reel2.textContent = randomSymbol();
reel3.textContent = randomSymbol();
};


button.addEventListener('click', () => {
    if (money < betAmount) {
        message.textContent = '💸 ¡No tienes suficiente dinero para apostar ' + betAmount + '!';
        return;
    }
    
    money -= betAmount;
    gamesPlayed++;
    document.getElementById('gamesPlayed').textContent = gamesPlayed;
    document.getElementById('money').textContent = money;
    message.textContent = `🎰 Apostando ${betAmount}... Girando...`;
    button.disabled = true;
    leverSound.play();
    spinSound.play();  

    const interval = setInterval(spin, 100);

    setTimeout(() => {
clearInterval(interval);
spinSound.pause();
checkResult();
button.disabled = false;
}, 2000);});

function checkResult() {
    const r1 = reel1.textContent;
    const r2 = reel2.textContent;
    const r3 = reel3.textContent;
    
    let winAmount = 0;
    let winMessage = '';
    
    // Verificar 3 iguales primero
    if (r1 === r2 && r2 === r3) {
        if (r1 === '🐭') {
            winAmount = 20;
        } else if (r1 === '🐻') {
            winAmount = 30;
        } else if (r1 === '🐵') {
            winAmount = 40;
        } else if (r1 === '🦅') {
            winAmount = 40;
        } else if (r1 === '🐯') {
            winAmount = 100;
        }
        winMessage = `🎉 ¡Has ganado! 3x${r1} +${winAmount}`;
    }
    // Verificar 2 osos
    else if ((r1 === '🐻' && r2 === '🐻') || (r1 === '🐻' && r3 === '🐻') || (r2 === '🐻' && r3 === '🐻')) {
        winAmount = 5;
        winMessage = `🎉 ¡Has ganado! 2x🐻 +${winAmount}`;
    }
    // Verificar 2 monos
    else if ((r1 === '🐵' && r2 === '🐵') || (r1 === '🐵' && r3 === '🐵') || (r2 === '🐵' && r3 === '🐵')) {
        winAmount = 5;
        winMessage = `🎉 ¡Has ganado! 2x🐵 +${winAmount}`;
    }
    // Verificar 2 tigres
    else if ((r1 === '🐯' && r2 === '🐯') || (r1 === '🐯' && r3 === '🐯') || (r2 === '🐯' && r3 === '🐯')) {
        winAmount = 10;
        winMessage = `🎉 ¡Has ganado! 2x🐯 +${winAmount}`;
    }
    // Verificar 2 águilas
    else if ((r1 === '🦅' && r2 === '🦅') || (r1 === '🦅' && r3 === '🦅') || (r2 === '🦅' && r3 === '🦅')) {
        winAmount = 10;
        winMessage = `🎉 ¡Has ganado! 2x🦅 +${winAmount}`;
    }
    
    if (winAmount > 0) {
        // Si apostaste 5, la ganancia es la mitad
        if (betAmount === 5) {
            const original = winAmount;
            winAmount = Math.floor(winAmount / 2);
            winMessage += ` (apuesta ${betAmount}: ganancia reducida a ${winAmount} desde ${original})`;
        }
        money += winAmount;
        document.getElementById('money').textContent = money;
        message.textContent = winMessage + ` Dinero: ${money}`;
        message.style.backgroundColor = '#ff4444';
        message.style.padding = '15px';
        message.style.borderRadius = '10px';
        message.style.color = 'white';
        message.style.fontSize = '18px';
        winSound.play();
    } else {
        message.textContent = '😞 ¡Inténtalo de nuevo! Dinero: ' + money;
        message.style.backgroundColor = '';
        message.style.padding = '';
        message.style.borderRadius = '';
        message.style.color = '';
        message.style.fontSize = '';
        loseSound.play();
    }
}