import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import '../App.css'
import { DailyDataType } from '../utils/api-types'

const options = {
  confirmed: {
    label: 'Confirmed cases',
    stroke: '#8884d8',
  },
  recovered: {
    label: 'Recovered cases',
    stroke: '#82ca9d',
  },
  deaths: {
    label: 'Deaths',
    stroke: '#7D3B37',
  },
}

type CovidDataGraphProps = {
  graphData: DailyDataType[]
  graphSelected: string
  startDateIndex: number
  endDateIndex: number
}
export default function CovidDataGraph({
  graphData,
  graphSelected,
  startDateIndex,
  endDateIndex,
}: CovidDataGraphProps) {
  // Current selected options
  const opts: (keyof typeof options)[] =
    graphSelected === 'all' ? (Object.keys(options) as any[]) : [graphSelected]

  // Lines to be rendered
  const lines = opts.map((opt) => {
    return (
      <Line
        key={opt}
        type='monotone'
        dataKey={`${opt}.total`}
        name={options[opt].label as any}
        stroke={options[opt].stroke as any}
        dot={false}
      />
    )
  })

  return (
    <LineChart
      width={730}
      height={400}
      data={graphData.slice(startDateIndex, endDateIndex)}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey='reportDate' tick={false} />
      <YAxis />
      <Tooltip />
      <Legend />
      {lines}
    </LineChart>
  )
}
