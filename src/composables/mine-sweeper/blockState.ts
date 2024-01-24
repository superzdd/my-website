export interface BlockState {
  id: string
  x: number
  y: number
  revealed?: boolean
  mine?: boolean
  flagged?: boolean
  adjacentMines: number
}

// 定义扫雷的尺寸和地雷数量
export interface GameBoard {
  width: number // 宽度，每行格子数量
  height: number // 高度，每列格子数量
  mineCount: number // 总共地雷数量
}

// 定义游戏难度
export interface DifficultyLevelConfig {
  Easy: GameBoard
  Normal: GameBoard
  Hard: GameBoard
}
