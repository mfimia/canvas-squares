import { KonvaEventObject } from 'konva/lib/Node'
import { IRect, Vector2d } from 'konva/lib/types'
import { useState } from 'react'
import { v4 } from 'uuid'
import { INITIAL_COLOR } from '../utils/constants'
import { findRectCollision } from '../utils/helpers'

export interface IReactRect extends IRect {
  id: string
  color: string
  timestamp: number
}

export const useCanvas = () => {
  const [rects, setRects] = useState<IReactRect[]>([])
  const [currentRect, setCurrentRect] = useState<IReactRect | null>(null)
  const [color, setColor] = useState<string>(INITIAL_COLOR)
  const [drawing, setDrawing] = useState(true)

  const handleMouseDown = (event: KonvaEventObject<globalThis.MouseEvent>) => {
    const { x, y } = event.currentTarget.getStage()?.getPointerPosition() as Vector2d
    if (drawing) {
      if (!currentRect) {
        setCurrentRect({ x, y, width: 0, height: 0, id: v4(), color, timestamp: Date.now() })
      }
    } else {
      const collisionedRects = rects
        .filter((rect) => findRectCollision(rect, x, y))
        .sort((a, b) => b.timestamp - a.timestamp)
      if (collisionedRects.length) {
        const { id } = collisionedRects[0] // latest rect
        const filteredRects = rects.filter((rect) => rect.id !== id)
        setRects(filteredRects)
      }
    }
  }

  const handleMouseMove = (event: KonvaEventObject<globalThis.MouseEvent>) => {
    if (currentRect) {
      const { x, y } = event.target.getStage()?.getPointerPosition() as Vector2d
      setCurrentRect((prev) => ({ ...prev, width: x - currentRect.x, height: y - currentRect.y } as IReactRect))
    }
  }

  const handleMouseUp = (event: KonvaEventObject<globalThis.MouseEvent>) => {
    if (currentRect) {
      const { x, y } = event.target.getStage()?.getPointerPosition() as Vector2d
      setCurrentRect((prev) => ({ ...prev, width: x - currentRect.x, height: y - currentRect.y } as IReactRect))
      setRects((prev) => [...prev, currentRect])
      setCurrentRect(null)
    }
  }

  const clearRects = () => {
    setCurrentRect(null)
    setRects([])
  }

  const displayedRects = [...rects]
  if (currentRect) displayedRects.push(currentRect)
  const rectCount = displayedRects.length

  const drawToolkit = { displayedRects, handleMouseDown, handleMouseMove, handleMouseUp }
  const panelToolkit = { color, rectCount, setColor, clearRects, setDrawing }

  return {
    drawToolkit,
    panelToolkit,
  }
}
