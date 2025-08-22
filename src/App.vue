<template>
  <div class="app">
    <div class="game-container">
      <header class="game-header">
        <h1 class="game-title">
          <span class="title-icon">⚫</span>
          Othello
          <span class="title-icon">⚪</span>
        </h1>
        <p class="game-subtitle">モダンなオセロゲーム</p>
      </header>
      
      <GameStatus 
        :gameState="gameState"
        :resetGame="resetGame"
      />
      <GameBoard 
        :gameState="gameState"
        :makeMove="makeMove"
        :isValidMove="isValidMove"
      />
      
      <footer class="game-footer">
        <p>Made with ❤️ using Vue.js & TypeScript</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameBoard from './components/GameBoard.vue'
import GameStatus from './components/GameStatus.vue'
import { useOthelloGame } from './composables/useOthelloGame'

const { gameState, makeMove, resetGame, isValidMove } = useOthelloGame()
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 600px;
  width: 100%;
}

.game-header {
  text-align: center;
  margin-bottom: 20px;
}

.game-title {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.title-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.game-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 8px 0 0;
  font-weight: 300;
}

.game-footer {
  margin-top: 20px;
  text-align: center;
}

.game-footer p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  font-weight: 300;
}

@media (max-width: 640px) {
  .app {
    padding: 10px;
  }
  
  .game-title {
    font-size: 2.5rem;
    gap: 12px;
  }
  
  .title-icon {
    font-size: 2rem;
  }
  
  .game-subtitle {
    font-size: 1rem;
  }
}
</style>