<template>
  <div class="game-status">
    <div class="score-section">
      <div class="score-card black-card" :class="{ active: gameState.currentPlayer === 'black' }">
        <div class="player-indicator">
          <div class="piece black-piece" />
          <span class="player-name">黒</span>
        </div>
        <div class="score">{{ gameState.blackScore }}</div>
      </div>
      
      <div class="vs-divider">VS</div>
      
      <div class="score-card white-card" :class="{ active: gameState.currentPlayer === 'white' }">
        <div class="player-indicator">
          <div class="piece white-piece" />
          <span class="player-name">白</span>
        </div>
        <div class="score">{{ gameState.whiteScore }}</div>
      </div>
    </div>
    
    <div v-if="!gameState.gameOver" class="current-player">
      <div class="turn-indicator">
        <div class="piece" :class="`${gameState.currentPlayer}-piece`" />
        <span>{{ gameState.currentPlayer === 'black' ? '黒' : '白' }}の番</span>
      </div>
    </div>
    
    <div v-if="gameState.gameOver" class="game-over">
      <div class="winner-announcement">
        <h2 v-if="gameState.winner === 'tie'">引き分け！</h2>
        <h2 v-else>
          <div class="piece" :class="`${gameState.winner}-piece`" />
          {{ gameState.winner === 'black' ? '黒' : '白' }}の勝利！
        </h2>
      </div>
      <button class="reset-button" @click="resetGame">
        新しいゲーム
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOthelloGame } from '../composables/useOthelloGame'

const { gameState, resetGame } = useOthelloGame()
</script>

<style scoped>
.game-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.score-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.score-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border-radius: 16px;
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  min-width: 120px;
}

.score-card.active {
  transform: scale(1.05);
  box-shadow: 
    0 12px 30px rgba(0, 0, 0, 0.2),
    0 0 20px rgba(76, 175, 80, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.black-card.active {
  box-shadow: 
    0 12px 30px rgba(0, 0, 0, 0.2),
    0 0 20px rgba(50, 50, 50, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.player-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.player-name {
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.score {
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

.vs-divider {
  font-size: 20px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.current-player {
  display: flex;
  align-items: center;
  justify-content: center;
}

.turn-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.piece {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.black-piece {
  background: radial-gradient(circle at 30% 30%, #4a4a4a, #1a1a1a);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
}

.white-piece {
  background: radial-gradient(circle at 30% 30%, #ffffff, #e0e0e0);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.game-over {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.winner-announcement h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin: 0;
}

.reset-button {
  padding: 12px 30px;
  background: linear-gradient(145deg, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
}

.reset-button:hover {
  background: linear-gradient(145deg, #45a049, #3d8b40);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(76, 175, 80, 0.4);
}
</style>