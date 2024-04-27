import { DOM } from "./my_framework/dom";

const gameSettings = {
    gridRows: 11,
    gridCols: 15,
    tileSize: 40,
    bombTimer: 3000, // milliseconds
};

class Game {
    constructor(playerName) {
        this.playerName = playerName;
        this.grid = this.createGrid();
        this.player = { x: 0, y: 0 }; // Starting position
        this.bombs = []; // Track all bombs placed
    }

    createGrid() {
        let grid = new Array(gameSettings.gridRows).fill(null).map(() => new Array(gameSettings.gridCols).fill(0));
        for (let i = 1; i < gameSettings.gridRows; i += 2) {
            for (let j = 1; j < gameSettings.gridCols; j += 2) {
                grid[i][j] = 1; // 1 represents an obstacle
            }
        }
        return grid;
    }

    renderGrid() {
        const container = DOM.getByClass("game-container")[0];
        DOM.setHTML(".game-container", "");
        let gridHtml = '<div class="grid">';
        this.grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                gridHtml += `<div class="tile ${cell === 1 ? 'obstacle' : ''}" data-row="${rowIndex}" data-col="${colIndex}"></div>`;
            });
        });
        gridHtml += '</div>';
        container.innerHTML = gridHtml;
        this.placePlayer();
    }

    placePlayer() {
        const playerTile = document.querySelector(`.tile[data-row="${this.player.y}"][data-col="${this.player.x}"]`);
        playerTile.classList.add('player');
    }

    movePlayer(direction) {
        let newX = this.player.x;
        let newY = this.player.y;

        switch (direction) {
            case 'up': newY -= 1; break;
            case 'down': newY += 1; break;
            case 'left': newX -= 1; break;
            case 'right': newX += 1; break;
        }

        if (this.isValidMove(newX, newY)) {
            const playerTile = document.querySelector('.tile.player');
            if (playerTile) {
                playerTile.classList.remove('player');
            }
            this.player.x = newX;
            this.player.y = newY;
            this.placePlayer();
        }
    }

    isValidMove(x, y) {
        return x >= 0 && y >= 0 && x < gameSettings.gridCols && y < gameSettings.gridRows && this.grid[y][x] === 0;
    }

    placeBomb(bombColor = 'black') {
        const bombTile = document.querySelector(`.tile[data-row="${this.player.y}"][data-col="${this.player.x}"]`);
        if (bombTile && !bombTile.classList.contains('bomb')) {
            bombTile.classList.add('bomb', bombColor === 'red' ? 'red-bomb' : '');
            this.bombs.push({
                x: this.player.x, y: this.player.y, timer: setTimeout(() => {
                    this.explodeBomb(this.player.x, this.player.y);
                    this.bombs = this.bombs.filter(b => b.x !== this.player.x || b.y !== this.player.y);
                }, gameSettings.bombTimer)
            });
        }
    }

    explodeBomb(x, y) {
        const explosionRange = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Cross explosion
        explosionRange.forEach(([dx, dy]) => {
            const explosionTile = document.querySelector(`.tile[data-row="${y + dy}"][data-col="${x + dx}"]`);
            if (explosionTile && !explosionTile.classList.contains('obstacle')) {
                explosionTile.classList.add('explosion');
            }
        });
        setTimeout(() => {
            explosionRange.forEach(([dx, dy]) => {
                const explosionTile = document.querySelector(`.tile[data-row="${y + dy}"][data-col="${x + dx}"]`);
                if (explosionTile) {
                    explosionTile.classList.remove('explosion');
                }
            });
        }, 1000); // Clear the explosion effects after 1 second
    }

    start() {
        this.renderGrid();
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':    this.movePlayer('up'); break;
                case 'ArrowDown':  this.movePlayer('down'); break;
                case 'ArrowLeft':  this.movePlayer('left'); break;
                case 'ArrowRight': this.movePlayer('right'); break;
                case 'Space':      this.placeBomb('black'); break;
                case 'Enter':      this.placeBomb('red'); break;
            }
        });
    }
}

export function initializeGame(playerName) {
    const game = new Game(playerName);
    game.start();
}
