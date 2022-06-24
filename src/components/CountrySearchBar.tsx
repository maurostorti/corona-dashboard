import { Autocomplete, AutocompleteChangeReason, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { api } from '../utils/api'
import '../App.css'
import { CountryType } from '../utils/api-types'

type CountrySearchBarProps = {
  onCountryChange: (country: CountryType | null, reason: AutocompleteChangeReason) => void
}
export default function CountrySearchBar({ onCountryChange }: CountrySearchBarProps) {
  const [countries, setCountries] = useState<CountryType[]>([])

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
    getCountries()
  }, [])

  return (
    <div className='Data-search'>
      <Autocomplete
        options={countries}
        getOptionLabel={(option) => option.name}
        autoComplete
        autoHighlight
        fullWidth
        renderInput={(params) => <TextField {...params} label='Search Countries' />}
        onChange={(event, value, reason) => onCountryChange(value, reason)}
      />
    </div>
  )
}
