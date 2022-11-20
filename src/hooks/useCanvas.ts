import { KonvaEventObject } from 'konva/lib/Node'
import { IRect, Vector2d } from 'konva/lib/types'
import { useState } from 'react'
import { v4 } from 'uuid'
import { findRectCollision } from '../utils/helpers'

export interface IReactRect extends IRect {
  id: string
  color: string
}

export const useCanvas = () => {
  const [previousRects, setPreviousRects] = useState<IReactRect[]>([])
  const [currentRect, setCurrentRect] = useState<IReactRect[]>([])
  const [color, setColor] = useState('#000000')
  const [drawing, setDrawing] = useState(true)

  const handleMouseDown = (event: KonvaEventObject<globalThis.MouseEvent>) => {
    const { x, y } = event.currentTarget.getStage()?.getPointerPosition() as Vector2d
    if (drawing) {
      if (currentRect.length === 0) {
        setCurrentRect([{ x, y, width: 0, height: 0, id: 'current', color }])
      }
    } else {
      const foundRect = previousRects.find((rect) => findRectCollision(rect, x, y))
      if (foundRect) {
        const filteredRects = previousRects.filter((rect) => rect.id !== foundRect.id)
        setPreviousRects(filteredRects)
      }
    }
  }

  const handleMouseUp = (event: KonvaEventObject<globalThis.MouseEvent>) => {
    if (currentRect.length === 1 && drawing) {
      const { x, y } = event.target.getStage()?.getPointerPosition() as Vector2d
      const sx = currentRect[0].x
      const sy = currentRect[0].y
      const finishedRect: IReactRect = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        id: v4(),
        color,
      }
      previousRects.push(finishedRect)
      setCurrentRect([])
      setPreviousRects(previousRects)
    }
  }

  const handleMouseMove = (event: KonvaEventObject<globalThis.MouseEvent>) => {
    if (currentRect.length === 1 && drawing) {
      const sx = currentRect[0].x
      const sy = currentRect[0].y
      const { x, y } = event.target.getStage()?.getPointerPosition() as Vector2d
      setCurrentRect([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          color,
          id: 'current',
        },
      ])
    }
  }

  const clearRects = () => {
    setCurrentRect([])
    setPreviousRects([])
  }

  const rects = [...previousRects, ...currentRect]
  const rectCount = rects.length

  return { rects, color, rectCount, setColor, handleMouseDown, handleMouseMove, handleMouseUp, clearRects, setDrawing }
}
