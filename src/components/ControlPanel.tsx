import { Box, Button, SxProps, Theme, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { FC, MouseEvent, useState, Dispatch, SetStateAction } from 'react'
import { ColorResult, SliderPicker } from 'react-color'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'

const panelStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  width: '30%',
  p: 4,
  backgroundColor: grey[200],
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

interface IProps {
  color: string
  rectCount: number
  setColor: Dispatch<SetStateAction<string>>
  setDrawing: Dispatch<SetStateAction<boolean>>
  clearRects: () => void
}

const ControlPanel: FC<IProps> = ({ color, rectCount, setColor, clearRects, setDrawing }) => {
  const [action, setAction] = useState('add')
  const handleColorSelect = (e: ColorResult) => {
    setColor(e.hex)
  }
  const handleActionSelector = (event: MouseEvent<HTMLElement>) => {
    const { value } = event.currentTarget as HTMLInputElement
    setAction(value)
    setDrawing(value === 'add')
  }
  return (
    <Box sx={panelStyle}>
      <Box sx={containerStyle}>
        <ToggleButtonGroup value={action} exclusive onChange={handleActionSelector}>
          <ToggleButton value="add">
            <AddBoxIcon />
          </ToggleButton>
          <ToggleButton value="remove">
            <IndeterminateCheckBoxIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ width: '100%', my: 3 }}>
          <SliderPicker color={color} onChange={handleColorSelect} />
        </Box>
      </Box>
      <Box sx={containerStyle}>
        <Typography sx={{ mb: 2, fontFamily: 'Montserrat' }}>
          {rectCount} rectangle{rectCount === 1 ? '' : 's'}
        </Typography>
        <Button onClick={clearRects}>Clear</Button>
      </Box>
    </Box>
  )
}

export default ControlPanel
