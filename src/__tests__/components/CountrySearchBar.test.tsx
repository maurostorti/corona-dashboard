import { render } from '@testing-library/react'
import { AutocompleteChangeReason } from '@mui/material/Autocomplete'
import nock from 'nock'
import axios from 'axios'
import CountrySearchBar from '../../components/CountrySearchBar'
import { CountryType } from '../../utils/api-types'

// axios.defaults.adapter = require('axios/lib/adapters/http')

const onCountryChangeTest = (value: CountryType | null, reason: AutocompleteChangeReason) => null
const countries = {
  countries: [{ name: 'Afghanistan', iso2: 'AF', iso3: 'AFG' }, { name: 'West Bank and Gaza' }],
}

test('it renders correctly', () => {
  const { asFragment } = render(<CountrySearchBar onCountryChange={onCountryChangeTest} />)
  expect(asFragment()).toMatchSnapshot()
})

// Cannot Get nock to work

test.skip('it fetches data', async () => {
  const scope = nock('https://covid19.mathdro.id').get('/api/countries').reply(200, countries)

  await render(<CountrySearchBar onCountryChange={onCountryChangeTest} />)
  scope.done()
})
