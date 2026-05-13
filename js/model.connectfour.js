"use strict";

const BATTLEFIELD = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

export const MODEL = {
    player1: 1,
    player2: 2,
    turn: 1,
    over: false,
    winningStones: [],
    winner: null,
    battlefield: BATTLEFIELD,

    playerChanged() {
        const CUSTOMEVENT = new CustomEvent("connectfour:playerChange", {
            detail: {
                player: this.turn,
            }
        });
        document.dispatchEvent(CUSTOMEVENT);
    },

    stoneInserted() {
        const CUSTOMEVENT = new CustomEvent("connectfour:stoneInserted", {
            detail: {
                battlefield: this.battlefield,
                over: this.over,
            }
        });
        document.dispatchEvent(CUSTOMEVENT);
    },

    gameOver() {
        const CUSTOMEVENT = new CustomEvent("connectfour:gameOver", {
            detail: {
                over: this.over,
                winningStones: this.winningStones,
                winner: this.winner
            }
        });
        document.dispatchEvent(CUSTOMEVENT);
    },

    insert(col) {
        if (this.over) return;
        for (let i = 5; i >= 0; i--) {
            if (this.battlefield[i][col] === 0) {
                let pos = this.turn;
                this.battlefield[i][col] = pos;
                console.log(this.battlefield);

                this.stoneInserted();
                this.checkGameOver();
                if(this.over === false){
                    this.changePlayer();
                }
                return;
            }
        }
    },
    checkGameOver() {
        for (let i = 5; i >= 0; i--) {
            for (let x = 6; x >= 0; x--) { //Schleife startet bei battlefield[5][5]
                //horizontal
                if (x >= 3 && this.battlefield[i][x] === 1 && this.battlefield[i][x - 1] === 1 && this.battlefield[i][x - 2] === 1 && this.battlefield[i][x - 3] === 1) {
                    this.winner = 1;
                    this.winningStones = [[i,x],[i,x-1],[i,x-2],[i,x-3]];
                    this.over = true;
                    this.gameOver();
                    return;
                } else if (x >= 3 && this.battlefield[i][x] === 2 && this.battlefield[i][x - 1] === 2 && this.battlefield[i][x - 2] === 2 && this.battlefield[i][x - 3] === 2) {
                    this.winner = 2;
                    this.winningStones = [[i,x],[i,x-1],[i,x-2],[i,x-3]];
                    this.over = true;
                    this.gameOver();
                    return;
                }
                //vertikal
                else if (i >= 3 && this.battlefield[i][x] === 1 && this.battlefield[i - 1][x] === 1 && this.battlefield[i - 2][x] === 1 && this.battlefield[i - 3][x] === 1) {
                    this.winner = 1;
                    this.winningStones = [[i,x],[i-1,x],[i-2,x],[i-3,x]];
                    this.over = true;
                    this.gameOver();
                    return;
                } else if (i >= 3 && this.battlefield[i][x] === 2 && this.battlefield[i - 1][x] === 2 && this.battlefield[i - 2][x] === 2 && this.battlefield[i - 3][x] === 2) {
                    this.winner = 2;
                    this.over = true;
                    this.winningStones = [[i,x],[i-1,x],[i-2,x],[i-3,x]];
                    this.gameOver();
                    return;
                }
                //slash
                else if (i >= 3 && x <= 3 && this.battlefield[i][x] === 1 && this.battlefield[i - 1][x + 1] === 1 && this.battlefield[i - 2][x + 2] === 1 && this.battlefield[i - 3][x + 3] === 1) {
                    this.winner = 1;
                    this.over = true;
                    this.winningStones = [[i,x],[i-1,x+1],[i-2,x+2],[i-3,x+3]];
                    this.gameOver();
                    return;
                } else if (i >= 3 && x <= 3 && this.battlefield[i][x] === 2 && this.battlefield[i - 1][x + 1] === 2 && this.battlefield[i - 2][x + 2] === 2 && this.battlefield[i - 3][x + 3] === 2) {
                    this.winner = 2;
                    this.over = true;
                    this.winningStones = [[i,x],[i-1,x+1],[i-2,x+2],[i-3,x+3]];
                    this.gameOver();
                    return;
                }
                //backslash
                else if (i >= 3 && x >= 3 && this.battlefield[i][x] === 1 && this.battlefield[i - 1][x - 1] === 1 && this.battlefield[i - 2][x - 2] === 1 && this.battlefield[i - 3][x - 3] === 1) {
                    this.winner = 1;
                    this.over = true;
                    this.winningStones = [[i,x],[i-1,x-1],[i-2,x-2],[i-3,x-3]];
                    this.gameOver();
                    return;
                } else if (i >= 3 && x >= 3 && this.battlefield[i][x] === 2 && this.battlefield[i - 1][x - 1] === 2 && this.battlefield[i - 2][x - 2] === 2 && this.battlefield[i - 3][x - 3] === 2) {
                    this.winner = 2;
                    this.over = true;
                    this.winningStones = [[i,x],[i-1,x-1],[i-2,x-2],[i-3,x-3]];
                    this.gameOver();
                    return;
                }
                //draw
                let draw = true;
                for (let i = 5; i >= 0; i--) {
                    for (let x = 6; x >= 0; x--) {
                        if (this.battlefield[i][x] === 0) {
                            draw = false;
                            break;
                        }
                    }
                }
                if (draw === true) {
                    this.over = true;
                    this.winner = 0;
                    this.gameOver();
                    return;
                }
            }
        }
    },
    changePlayer(){
        if(this.over === false){
            if(this.turn === 1){
                this.turn = 2;
                this.playerChanged();
            }
            else if(this.turn === 2){
                this.turn = 1;
                this.playerChanged();
            }
        }
    }

}