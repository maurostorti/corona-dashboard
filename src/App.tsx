import React, { useEffect, useState } from 'react'
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
        <div className='Dashboard'>
          <div className='Data-cell'>
            <h2 className='Data-title'>Confimed Cases</h2>
            <p>{confirmed}</p>
          </div>
          <div className='Data-cell'>
            <h2 className='Data-title'>Recovered Cases</h2>
            <p>{recovered}</p>
          </div>
          <div className='Data-cell'>
            <h2 className='Data-title'>Deaths</h2>
            <p>{deaths}</p>
          </div>
        </div>
      </body>
    </div>
  )
}

export default App
