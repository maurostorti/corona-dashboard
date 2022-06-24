import { useEffect, useState } from 'react'
import { Stack, AutocompleteChangeReason } from '@mui/material'
import { CountryType, DailyDataType } from './utils/api-types'
import './App.css'
import Dashboard from './components/Dashboard'
import CountrySearchBar from './components/CountrySearchBar'
import useCovidData from './hooks/useCovidData'
import useDailyData from './hooks/useDailyData'
import CovidDataGraph from './components/CovidDataGraph'
import GraphOptionsSelector from './components/GraphOptionsSelector'
import GraphRangeDates from './components/GraphRangeDates'

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>()

  const [graphSelected, setGraphSelected] = useState<string>('all')
  const [startDateIndex, setStartDateIndex] = useState<number>(0)
  const [endDateIndex, setEndDateIndex] = useState<number>(0)

  const totals = useCovidData(selectedCountry)
  const graphData = useDailyData()

  useEffect(() => {
    setEndDateIndex(graphData.length - 1)
  }, [graphData])

  const onCountryChange = (value: CountryType | null, reason: AutocompleteChangeReason) => {
    if (reason === 'selectOption' && value) setSelectedCountry(value?.name)
    else setSelectedCountry(undefined)
  }

  const onChangeStartDate = (value: DailyDataType | null, reason: AutocompleteChangeReason) => {
    if (reason === 'selectOption' && value)
      setStartDateIndex(graphData.findIndex((x) => x.reportDate === value?.reportDate))
    else setStartDateIndex(0)
  }

  const onChangeEndDate = (value: DailyDataType | null, reason: AutocompleteChangeReason) => {
    if (reason === 'selectOption' && value)
      setEndDateIndex(graphData.findIndex((x) => x.reportDate === value?.reportDate) + 1)
    else setEndDateIndex(graphData.length - 1)
  }
  const onChangeGraphSelected = (value: any) => setGraphSelected(value)

  return (
    <div className='App'>
      <header className='App-header'>
        <h1> Corona Dashboard </h1>
      </header>
      <body className='App-body'>
        <Dashboard
          confirmed={totals.confirmed}
          recovered={totals.recovered}
          deaths={totals.deaths}
        />
        <CountrySearchBar onCountryChange={onCountryChange} />
        {/* Candidate for comonent extraction */}
        <Stack className='Data-graph' direction='row'>
          <CovidDataGraph
            graphData={graphData}
            graphSelected={graphSelected}
            startDateIndex={startDateIndex}
            endDateIndex={endDateIndex}
          />
          <Stack justifyContent='space-between'>
            <GraphOptionsSelector
              graphSelected={graphSelected}
              onChangeGraphSelected={onChangeGraphSelected}
            />
            <Stack spacing={1.5}>
              <GraphRangeDates
                graphData={graphData}
                startDateIndex={startDateIndex}
                onChangeStartDate={onChangeStartDate}
                endDateIndex={endDateIndex}
                onChangeEndDate={onChangeEndDate}
              />
            </Stack>

            <Stack spacing={0.001}>
              <h3>Last update:</h3>
              <p>{totals.lastUpdate}</p>
            </Stack>
          </Stack>
        </Stack>
      </body>
    </div>
  )
}

export default App
