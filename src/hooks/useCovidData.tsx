import { useState, useEffect } from 'react'
import { api, apiURL } from '../utils/api'
import { ApiData } from '../utils/api-types'

/**
 *
 * Total values for all data
 */
export default function useCovidData(selectedCountry?: string): {
  confirmed: string
  recovered: string
  deaths: string
  lastUpdate: string
} {
  const [data, setData] = useState({
    confirmed: '0',
    recovered: '0',
    deaths: '0',
    lastUpdate: new Date().toLocaleDateString(),
  })

  const covidData = () => {
    api
      .get(selectedCountry ? `api/countries/${selectedCountry}` : 'api')
      .then((response) => {
        const {
          confirmed: { value: confirmedValue },
          recovered: { value: recoveredValue },
          deaths: { value: deathsValue },
          lastUpdate,
        } = response.data

        setData({
          confirmed: confirmedValue,
          recovered: recoveredValue,
          deaths: deathsValue,
          lastUpdate,
        })
      })
      .catch((error) => console.error(`Error: ${error}`))
  }

  useEffect(() => {
    covidData()
  }, [selectedCountry])

  return data
}
