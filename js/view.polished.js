"use strict";

const CONFETTI = new JSConfetti();

let again = function() {
    location.reload();
}

let makeBattlefield = function () {
    for (let i = 0; i <= 5; i++) {
        for (let x = 0; x <= 6; x++) {
            let field = document.createElement("div");
            field.id = i.toString() + "/" + x.toString();
            field.classList.add("field");
            document.getElementById("battlefield").append(field);
        }
    }
}

let colorField = function(e) {
    if (this.over) return;
    let update = e.detail.battlefield;
    for (let i = 0; i <= 5; i++) {
        for (let x = 0; x <= 6; x++) {

            let field = document.getElementById(i + "/" + x);
            if (update[i][x] === 1) {
                field.classList.add("player1");
            } else if (update[i][x] === 2) {
                field.classList.add("player2");
            }

        }
    }
}

let glow = function (e) {
    let activePlayer = e.detail.player;
    if (activePlayer === 1) {
        document.getElementById("player1").classList.add("activeAngel");
        document.getElementById("player2").classList.add("inactiveDevil");

        document.getElementById("player1").classList.remove("inactiveAngel");
        document.getElementById("player2").classList.remove("activeDevil");
    } else if (activePlayer === 2) {
        document.getElementById("player2").classList.add("activeDevil");
        document.getElementById("player1").classList.add("inactiveAngel");

        document.getElementById("player2").classList.remove("inactiveDevil");
        document.getElementById("player1").classList.remove("activeAngel");
    }
}


let results = function (e) {
    let winner = e.detail.winner;
    if (winner === 1) {
        CONFETTI.addConfetti({
            emojis: ['✨','🪽'],
            emojiSize: 80,
            confettiNumber: 100,
        });
        document.getElementById("winner").textContent = "The Angel is the Winner!";
        let div = document.getElementById("btn");
        let btn = document.createElement("button");
        btn.innerText = "Again";
        btn.id = "button";
        btn.classList.add("button");
        btn.addEventListener("click", again);
        div.append(btn);


    } else if (winner === 2) {
        CONFETTI.addConfetti({
            emojis: ['🔥','😈'],
            emojiSize: 80,
            confettiNumber: 100,
        });
        document.getElementById("winner").textContent = "The Devil is the Winner!";
        let div = document.getElementById("btn");
        let btn = document.createElement("button");
        btn.innerText = "Again";
        btn.id = "button";
        btn.classList.add("button");
        btn.addEventListener("click", again);
        div.append(btn);

    } else if (winner === 0) {
        document.getElementById("winner").textContent = "Draw - Nobody wins!";
        let div = document.getElementById("btn");
        let btn = document.createElement("button");
        btn.innerText = "Again";
        btn.id = "button";
        btn.classList.add("button");
        btn.addEventListener("click", again);
        div.append(btn);

    }
    let winningStones = e.detail.winningStones;
    for (let i = 0; i < winningStones.length; i++) {
        let id = winningStones[i][0] + "/" + winningStones[i][1];
        document.getElementById(id).classList.add("winningStone");
    }
}

export function init() {
    makeBattlefield();
    document.addEventListener("connectfour:stoneInserted", colorField);
    document.addEventListener("connectfour:playerChange", glow);
    document.addEventListener("connectfour:gameOver", results);
}