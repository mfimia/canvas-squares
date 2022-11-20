import { IReactRect } from '../hooks/useCanvas'

export const findRectCollision = (rect: IReactRect, x: number, y: number): boolean => {
  const rightSide = rect.width < 0 ? rect.x : rect.x + rect.width
  const leftSide = rect.width < 0 ? rect.x + rect.width : rect.x
  const topSide = rect.height < 0 ? rect.y + rect.height : rect.y
  const bottomSide = rect.height < 0 ? rect.y : rect.height + rect.y
  return leftSide < x && rightSide > x && topSide < y && bottomSide > y
}
