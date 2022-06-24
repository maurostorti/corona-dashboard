import nock from 'nock'
import axios from 'axios'
import { renderHook } from '@testing-library/react-hooks'

import { apiURL } from '../../utils/api'
import useDailyData from '../../hooks/useDailyData'

// Make nock work well with axios!
axios.defaults.adapter = require('axios/lib/adapters/http')

const dailyData = [
  {
    confirmed: {
      total: 10,
    },
    deaths: {
      total: 5,
    },
    recovered: {
      total: 2,
    },
    reportDate: '2020-10-30',
  },
  {
    confirmed: {
      total: 1,
    },
    deaths: {
      total: 50,
    },
    recovered: {
      total: 23,
    },
    reportDate: '2021-01-20',
  },
]

// Cannot Get nock to work

test.skip('it fetches data', async () => {
  const scope = nock('https://covid19.mathdro.id').get('/api/daily').reply(200, dailyData)

  const { result, rerender } = renderHook(() => useDailyData())
  await rerender()
  scope.done()
  expect(result.current).toBe(dailyData)
})
