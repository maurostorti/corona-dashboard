import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import '../App.css'

type GraphOptionsSelectorProps = {
  graphSelected: string
  onChangeGraphSelected: (value: any) => void
}
export default function GraphOptionsSelector({
  graphSelected,
  onChangeGraphSelected,
}: GraphOptionsSelectorProps) {
  return (
    <ToggleButtonGroup
      value={graphSelected}
      onChange={(event, value) => onChangeGraphSelected(value)}
      orientation='vertical'
      exclusive
      size='small'
    >
      <ToggleButton value='all'> All </ToggleButton>
      <ToggleButton value='confirmed'> Confirmed</ToggleButton>
      <ToggleButton value='recovered'> Recovered</ToggleButton>
      <ToggleButton value='deaths'> Dead </ToggleButton>
    </ToggleButtonGroup>
  )
}
