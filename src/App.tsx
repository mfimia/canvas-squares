import { Container, CssBaseline, Paper, SxProps, Theme } from '@mui/material'
import { FC } from 'react'
import ControlPanel from './components/ControlPanel'
import DrawingStage from './components/DrawingStage'
import { useCanvas } from './hooks/useCanvas'

const containerStyle: SxProps<Theme> = {
  display: 'flex',
  mt: 4,
  height: '85vh',
}

const App: FC = () => {
  const { drawToolkit, panelToolkit } = useCanvas()

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Paper elevation={6} sx={containerStyle}>
        <ControlPanel {...panelToolkit} />
        <DrawingStage {...drawToolkit} />
      </Paper>
    </Container>
  )
}

export default App
