import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  Divider,
  Stack,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { api } from './utils/api'
import logo from './logo.svg'
import './App.css'

function App() {
  interface CountryType {
    name: string
    iso2?: string
    iso3?: string
  }

  interface DailyDataType {
    confirmed: {
      total: number
    }
    deaths: {
      total: number
    }
    recovered: {
      total: number
    }
    reportDate: string
  }

  const [confirmed, setConfirmed] = useState<string>('0')
  const [recovered, setRecovered] = useState<string>('10')
  const [deaths, setDeaths] = useState<string>('0')
  const [countries, setCountries] = useState<CountryType[]>([])
  const [graphData, setGraphData] = useState<DailyDataType[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [graphSelected, setGraphSelected] = useState<string>('all')

  const covidData = () => {
    api
      .get(selectedCountry === '' ? 'api' : `api/countries/${selectedCountry}`)
      .then((response) => {
        const {
          confirmed: { value: confirmedValue },
          recovered: { value: recoveredValue },
          deaths: { value: deathsValue },
        } = response.data
        setConfirmed(confirmedValue)
        setRecovered(recoveredValue)
        setDeaths(deathsValue)
      })
      .catch((error) => console.error(`Error: ${error}`))
  }

  const getCountries = () => {
    api
      .get('api/countries')
      .then((response) => {
        const { countries: countriesData }: { countries: CountryType[] } = response.data
        setCountries(countriesData)
      })
      .catch((error) => console.error(`Error: ${error}`))
  }

  const getGraphData = () => {
    api
      .get('api/daily')
      .then((response) => {
        const { data: dailyData }: { data: DailyDataType[] } = response
        setGraphData(dailyData)
      })
      .catch((error) => console.error(`Error: ${error}`))
  }

  useEffect(() => {
    getCountries()
    getGraphData()
  }, [])

  useEffect(() => {
    covidData()
  }, [selectedCountry])

  return (
    <div className='App'>
      <header className='App-header'>
        <h1> Corona Dashboard </h1>
      </header>
      <body className='App-body'>
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
        <div className='Data-search'>
          <Autocomplete
            options={countries}
            getOptionLabel={(option) => option.name}
            autoComplete
            autoHighlight
            fullWidth
            renderInput={(params) => <TextField {...params} label='Search Countries' />}
            onChange={(event, value, reason) => {
              if (reason === 'selectOption' && value) setSelectedCountry(value?.name)
              else setSelectedCountry('')
            }}
          />
        </div>
        <Stack className='Data-graph' direction='row'>
          <LineChart
            width={730}
            height={400}
            data={graphData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey='reportDate' tick={false} />
            <YAxis />
            <Tooltip />
            <Legend />
            {(graphSelected === 'all' || graphSelected === 'confirmed') && (
              <Line
                type='monotone'
                dataKey='confirmed.total'
                name='Confirmed Cases'
                stroke='#8884d8'
                dot={false}
              />
            )}
            {(graphSelected === 'all' || graphSelected === 'recovered') && (
              <Line
                type='monotone'
                dataKey='recovered.total'
                name='Recovered Cases'
                stroke='#82ca9d'
                dot={false}
              />
            )}
            {(graphSelected === 'all' || graphSelected === 'dead') && (
              <Line
                type='monotone'
                dataKey='deaths.total'
                name='Deaths'
                stroke='#7D3B37'
                dot={false}
              />
            )}
          </LineChart>
          <ToggleButtonGroup
            value={graphSelected}
            onChange={(event, value) => setGraphSelected(value)}
            orientation='vertical'
            exclusive
            size='large'
          >
            <ToggleButton value='all'> All </ToggleButton>
            <ToggleButton value='confirmed'> Confirmed</ToggleButton>
            <ToggleButton value='recovered'> Recovered</ToggleButton>
            <ToggleButton value='dead'> Dead </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </body>
    </div>
  )
}

export default App
