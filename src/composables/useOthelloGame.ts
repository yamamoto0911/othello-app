import { ref, computed } from 'vue'
import type { GameState, Player, CellState, Position } from '../types/game'

export function useOthelloGame() {
  const BOARD_SIZE = 8
  const DIRECTIONS = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ]

  const gameState = ref<GameState>({
    board: Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)),
    currentPlayer: 'black',
    blackScore: 2,
    whiteScore: 2,
    validMoves: [],
    gameOver: false,
    winner: null
  })

  const initializeBoard = () => {
    const board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
    
    board[3][3] = 'white'
    board[3][4] = 'black'
    board[4][3] = 'black'
    board[4][4] = 'white'
    
    gameState.value.board = board
    gameState.value.currentPlayer = 'black'
    gameState.value.blackScore = 2
    gameState.value.whiteScore = 2
    gameState.value.gameOver = false
    gameState.value.winner = null
    
    calculateValidMoves()
  }

  const isValidPosition = (row: number, col: number): boolean => {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE
  }

  const getFlippedPieces = (row: number, col: number, player: Player): Position[] => {
    if (gameState.value.board[row][col] !== null) return []
    
    const flipped: Position[] = []
    
    for (const [dx, dy] of DIRECTIONS) {
      const tempFlipped: Position[] = []
      let x = row + dx
      let y = col + dy
      
      while (isValidPosition(x, y) && gameState.value.board[x][y] !== null && gameState.value.board[x][y] !== player) {
        tempFlipped.push({ row: x, col: y })
        x += dx
        y += dy
      }
      
      if (isValidPosition(x, y) && gameState.value.board[x][y] === player && tempFlipped.length > 0) {
        flipped.push(...tempFlipped)
      }
    }
    
    return flipped
  }

  const calculateValidMoves = () => {
    const validMoves: Position[] = []
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (getFlippedPieces(row, col, gameState.value.currentPlayer).length > 0) {
          validMoves.push({ row, col })
        }
      }
    }
    
    gameState.value.validMoves = validMoves
  }

  const makeMove = (row: number, col: number): boolean => {
    const flipped = getFlippedPieces(row, col, gameState.value.currentPlayer)
    
    if (flipped.length === 0) return false
    
    gameState.value.board[row][col] = gameState.value.currentPlayer
    
    for (const pos of flipped) {
      gameState.value.board[pos.row][pos.col] = gameState.value.currentPlayer
    }
    
    updateScores()
    switchPlayer()
    calculateValidMoves()
    checkGameOver()
    
    return true
  }

  const updateScores = () => {
    let blackScore = 0
    let whiteScore = 0
    
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (gameState.value.board[row][col] === 'black') blackScore++
        else if (gameState.value.board[row][col] === 'white') whiteScore++
      }
    }
    
    gameState.value.blackScore = blackScore
    gameState.value.whiteScore = whiteScore
  }

  const switchPlayer = () => {
    gameState.value.currentPlayer = gameState.value.currentPlayer === 'black' ? 'white' : 'black'
  }

  const checkGameOver = () => {
    if (gameState.value.validMoves.length === 0) {
      switchPlayer()
      calculateValidMoves()
      
      if (gameState.value.validMoves.length === 0) {
        gameState.value.gameOver = true
        
        if (gameState.value.blackScore > gameState.value.whiteScore) {
          gameState.value.winner = 'black'
        } else if (gameState.value.whiteScore > gameState.value.blackScore) {
          gameState.value.winner = 'white'
        } else {
          gameState.value.winner = 'tie'
        }
      } else {
        switchPlayer()
      }
    }
  }

  const resetGame = () => {
    initializeBoard()
  }

  const isValidMove = (row: number, col: number): boolean => {
    return gameState.value.validMoves.some(move => move.row === row && move.col === col)
  }

  initializeBoard()

  return {
    gameState: computed(() => gameState.value),
    makeMove,
    resetGame,
    isValidMove
  }
}