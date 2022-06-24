import nock from 'nock'
import axios from 'axios'
import { renderHook } from '@testing-library/react-hooks'

import useCovidData from '../../hooks/useCovidData'
import { apiURL } from '../../utils/api'

// Make nock work well with axios!
axios.defaults.adapter = require('axios/lib/adapters/http')

// Cannot Get nock to work

test.skip('it fetches data', async () => {
  const scope = nock('https://covid19.mathdro.id')
    .get('/api')
    .reply(200, {
      confirmed: { value: 1 },
      recovered: { value: 2 },
      deaths: { value: 3 },
      lastUpdate: 'something',
    })

  const { result, rerender } = renderHook(() => useCovidData(undefined))
  rerender()
  scope.done()
  expect(result.current.confirmed).toBe(1)
})

// Cannot Get nock to work

test.skip('it fetches country data', async () => {
  nock('https://covid19.mathdro.id')
    .get('/api/countries/italy')
    .reply(200, {
      confirmed: { value: 123 },
      recovered: { value: 2 },
      deaths: { value: 3 },
      lastUpdate: 'something',
    })
  const { result, waitForNextUpdate } = renderHook(() => useCovidData('italy'))
  await waitForNextUpdate()
  expect(result.current).toEqual({
    confirmed: 123,
    recovered: 2,
    deaths: 3,
    lastUpdate: 'something',
  })
})
