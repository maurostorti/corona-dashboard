import React, { useEffect, useState } from 'react'
import { Autocomplete, Divider, Stack, TextField } from '@mui/material'
import { api } from './utils/api'
import logo from './logo.svg'
import './App.css'

function App() {
  const [confirmed, setConfirmed] = useState<string>('0')
  const [recovered, setRecovered] = useState<string>('10')
  const [deaths, setDeaths] = useState<string>('0')

  const covidData = () => {
    api
      .get('api')
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

  useEffect(() => {
    // setTimeout(() => {
    covidData()
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
        </div>
      </body>
    </div>
  )
}

export default App
