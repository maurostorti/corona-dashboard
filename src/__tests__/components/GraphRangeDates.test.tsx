import { render } from '@testing-library/react'
import { AutocompleteChangeReason } from '@mui/material/Autocomplete'
import { DailyDataType } from '../../utils/api-types'
import GraphRangeDates from '../../components/GraphRangeDates'

// axios.defaults.adapter = require('axios/lib/adapters/http')

const graphDataTest = [
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

test('it renders correctly', () => {
  const { asFragment } = render(
    <GraphRangeDates
      graphData={graphDataTest}
      startDateIndex={0}
      onChangeStartDate={(value: DailyDataType | null, reason: AutocompleteChangeReason) => null}
      endDateIndex={graphDataTest.length - 1}
      onChangeEndDate={(value: DailyDataType | null, reason: AutocompleteChangeReason) => null}
    />,
  )
  expect(asFragment()).toMatchSnapshot()
})
