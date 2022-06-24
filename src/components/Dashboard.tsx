import { Divider, Stack } from '@mui/material'
import '../App.css'

type DashboardProps = {
  confirmed: string
  recovered: string
  deaths: string
}
export default function Dashboard({ confirmed, recovered, deaths }: DashboardProps) {
  return (
    <Stack direction='row' divider={<Divider orientation='vertical' flexItem />} spacing={2}>
      <Stack>
        <h2 className='Data-title'> Confimed Cases</h2>
        <p className='Data-content'> {confirmed} </p>
      </Stack>
      <Stack>
        <h2 className='Data-title'> Recovered Cases</h2>
        <p className='Data-content'>{recovered}</p>
      </Stack>
      <Stack>
        <h2 className='Data-title'> Deaths</h2>
        <p className='Data-content'>{deaths}</p>
      </Stack>
    </Stack>
  )
}
