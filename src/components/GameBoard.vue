<template>
  <div class="game-board">
    <div
      v-for="(row, rowIndex) in props.gameState.board"
      :key="`row-${rowIndex}`"
      class="board-row"
    >
      <div
        v-for="(cell, colIndex) in row"
        :key="`cell-${rowIndex}-${colIndex}`"
        class="board-cell"
        :class="{
          'valid-move': props.isValidMove(rowIndex, colIndex),
          'has-piece': cell !== null
        }"
        @click="handleCellClick(rowIndex, colIndex)"
      >
        <div
          v-if="cell"
          class="piece"
          :class="{
            'black-piece': cell === 'black',
            'white-piece': cell === 'white'
          }"
        />
        <div
          v-else-if="props.isValidMove(rowIndex, colIndex)"
          class="valid-move-indicator"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameState } from '../types/game'

interface Props {
  gameState: GameState
  makeMove: (row: number, col: number) => boolean
  isValidMove: (row: number, col: number) => boolean
}

const props = defineProps<Props>()

const handleCellClick = (row: number, col: number) => {
  if (!props.gameState.gameOver && props.isValidMove(row, col)) {
    props.makeMove(row, col)
  }
}
</script>

<style scoped>
.game-board {
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  gap: 2px;
  background: linear-gradient(145deg, #2a3b47, #1e2a36);
  padding: 12px;
  border-radius: 20px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.board-row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2px;
}

.board-cell {
  width: 60px;
  height: 60px;
  background: linear-gradient(145deg, #3d5a69, #2c4a59);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    0 1px 2px rgba(255, 255, 255, 0.1);
}

.board-cell:hover {
  transform: translateY(-1px);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    0 4px 8px rgba(255, 255, 255, 0.15);
}

.board-cell.valid-move {
  background: linear-gradient(145deg, #4a6741, #3a5231);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    0 0 8px rgba(76, 175, 80, 0.3);
}

.board-cell.valid-move:hover {
  background: linear-gradient(145deg, #5a7751, #4a6241);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    0 0 12px rgba(76, 175, 80, 0.5);
}

.piece {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  animation: piecePlace 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes piecePlace {
  0% {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.black-piece {
  background: radial-gradient(circle at 30% 30%, #4a4a4a, #1a1a1a);
  box-shadow: 
    0 6px 12px rgba(0, 0, 0, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
}

.white-piece {
  background: radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0);
  box-shadow: 
    0 6px 12px rgba(0, 0, 0, 0.2),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1);
}

.valid-move-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(76, 175, 80, 0.8);
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>