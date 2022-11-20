import { Container, CssBaseline, Paper, SxProps, Theme } from '@mui/material'
import { FC } from 'react'
import ControlPanel from './components/ControlPanel'
import DrawingSpace from './components/DrawingSpace'
import { useCanvas } from './hooks/useCanvas'

const containerStyle: SxProps<Theme> = {
  display: 'flex',
  mt: 4,
  height: '85vh',
}

const App: FC = () => {
  const { rects, color, rectCount, handleMouseDown, handleMouseMove, handleMouseUp, setColor, clearRects, setDrawing } =
    useCanvas()

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Paper elevation={6} sx={containerStyle}>
        <ControlPanel
          color={color}
          rectCount={rectCount}
          setColor={setColor}
          clearRects={clearRects}
          setDrawing={setDrawing}
        />
        <DrawingSpace
          rects={rects}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
        />
      </Paper>
    </Container>
  )
}

export default App
