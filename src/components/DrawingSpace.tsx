import { Box, SxProps, Theme } from '@mui/material'
import { KonvaEventObject } from 'konva/lib/Node'
import { FC, useEffect, useState } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import { IReactRect } from '../hooks/useCanvas'
import { HEIGHT_RATIO, MAX_COMPUTED_WIDTH, WIDTH_RATIO } from '../utils/constants'

const containerStyle: SxProps<Theme> = {
  height: '100%',
  width: '70%',
}

interface IProps {
  readonly rects: IReactRect[]
  handleMouseDown: (event: KonvaEventObject<globalThis.MouseEvent>) => void
  handleMouseUp: (event: KonvaEventObject<globalThis.MouseEvent>) => void
  handleMouseMove: (event: KonvaEventObject<globalThis.MouseEvent>) => void
}

const DrawingSpace: FC<IProps> = ({ rects, handleMouseDown, handleMouseMove, handleMouseUp }) => {
  const [canvasHeight, setCanvasHeight] = useState(0)
  const [canvasWidth, setCanvasWidth] = useState(0)

  useEffect(() => {
    setCanvasWidth(Math.min(MAX_COMPUTED_WIDTH, window.innerWidth * WIDTH_RATIO))
    setCanvasHeight(window.innerHeight * HEIGHT_RATIO)
  }, [window.innerHeight, window.innerWidth])

  return (
    <Box sx={containerStyle}>
      <Stage
        height={canvasHeight}
        width={canvasWidth}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {rects.map((rect) => {
            return (
              <Rect
                key={rect.id}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill={rect.color}
                stroke={rect.color}
              />
            )
          })}
        </Layer>
      </Stage>
    </Box>
  )
}

export default DrawingSpace
