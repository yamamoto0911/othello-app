export type Player = 'black' | 'white'
export type CellState = Player | null

export interface Position {
  row: number
  col: number
}

export interface GameState {
  board: CellState[][]
  currentPlayer: Player
  blackScore: number
  whiteScore: number
  validMoves: Position[]
  gameOver: boolean
  winner: Player | 'tie' | null
}