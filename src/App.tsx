import React, { useEffect, useState } from 'react'
import { Autocomplete, Divider, Stack, TextField } from '@mui/material'
import { api } from './utils/api'
import logo from './logo.svg'
import './App.css'

function App() {
  interface CountryType {
    name: string
    iso2?: string
    iso3?: string
  }

  const [confirmed, setConfirmed] = useState<string>('0')
  const [recovered, setRecovered] = useState<string>('10')
  const [deaths, setDeaths] = useState<string>('0')
  const [countries, setCountries] = useState<CountryType[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')

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

  useEffect(() => {
    covidData()
    getCountries()
  })

  return (
    <div className='App'>
      <header className='App-header'>
        <h1> Corona Dashboard </h1>
      </header>
      <body className='App-body'>
        <Stack direction='row' divider={<Divider orientation='vertical' flexItem />} spacing={2}>
          <Stack>
            <p className='Data-title'> Confimed Cases</p>
            <p>{confirmed}</p>
          </Stack>
          <Stack>
            <p className='Data-title'> Recovered Cases</p>
            <p>{recovered}</p>
          </Stack>
          <Stack>
            <p className='Data-title'> Deaths</p>
            <p>{deaths}</p>
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
      </body>
    </div>
  )
}

export default App
