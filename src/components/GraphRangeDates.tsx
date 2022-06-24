import { Autocomplete, Stack, TextField, AutocompleteChangeReason } from '@mui/material'
import '../App.css'
import { DailyDataType } from '../utils/api-types'

type CovidDataGraphProps = {
  graphData: DailyDataType[]
  startDateIndex: number
  onChangeStartDate: (value: DailyDataType | null, reason: AutocompleteChangeReason) => void
  endDateIndex: number
  onChangeEndDate: (value: DailyDataType | null, reason: AutocompleteChangeReason) => void
}
export default function GraphRangeDates({
  graphData,
  onChangeStartDate,
  startDateIndex,
  onChangeEndDate,
  endDateIndex,
}: CovidDataGraphProps) {
  return (
    <Stack spacing={1.5}>
      <Autocomplete
        options={graphData.slice(0, endDateIndex)}
        getOptionLabel={(option) => option.reportDate}
        autoComplete
        autoHighlight
        fullWidth
        renderInput={(params) => <TextField {...params} label='Start Date' />}
        onChange={(event, value, reason) => onChangeStartDate(value, reason)}
      />
      <Autocomplete
        options={graphData.slice(startDateIndex + 1)}
        getOptionLabel={(option) => option.reportDate}
        autoComplete
        autoHighlight
        fullWidth
        renderInput={(params) => <TextField {...params} label='End Date' />}
        onChange={(event, value, reason) => onChangeEndDate(value, reason)}
      />
    </Stack>
  )
}
