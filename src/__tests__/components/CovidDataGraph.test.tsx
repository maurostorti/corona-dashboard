import { render, screen } from '@testing-library/react'
import CovidDataGraph from '../../components/CovidDataGraph'

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

test('it renders correctly confirmed', () => {
  const { asFragment } = render(
    <CovidDataGraph
      graphData={graphDataTest}
      graphSelected='all'
      startDateIndex={0}
      endDateIndex={graphDataTest.length - 1}
    />,
  )
  expect(asFragment()).toMatchSnapshot()
})

test('it renders legend all', () => {
  render(
    <CovidDataGraph
      graphData={graphDataTest}
      graphSelected='all'
      startDateIndex={0}
      endDateIndex={graphDataTest.length - 1}
    />,
  )
  const confirmedLegend = screen.getByText('Confirmed cases')
  expect(confirmedLegend).toBeInTheDocument()

  const recoveredLegend = screen.getByText('Recovered cases')
  expect(recoveredLegend).toBeInTheDocument()

  const deathsLegend = screen.getByText('Deaths')
  expect(deathsLegend).toBeInTheDocument()
})

test('it renders legend confirmed', () => {
  render(
    <CovidDataGraph
      graphData={graphDataTest}
      graphSelected='confirmed'
      startDateIndex={0}
      endDateIndex={graphDataTest.length - 1}
    />,
  )
  const confirmedLegend = screen.queryByText('Confirmed cases')
  expect(confirmedLegend).toBeInTheDocument()

  const recoveredLegend = screen.queryByText('Recovered cases')
  expect(recoveredLegend).not.toBeInTheDocument()

  const deathsLegend = screen.queryByText('Deaths')
  expect(deathsLegend).not.toBeInTheDocument()
})

test('it renders legend recovered', () => {
  render(
    <CovidDataGraph
      graphData={graphDataTest}
      graphSelected='recovered'
      startDateIndex={0}
      endDateIndex={graphDataTest.length - 1}
    />,
  )
  const confirmedLegend = screen.queryByText('Confirmed cases')
  expect(confirmedLegend).not.toBeInTheDocument()

  const recoveredLegend = screen.queryByText('Recovered cases')
  expect(recoveredLegend).toBeInTheDocument()

  const deathsLegend = screen.queryByText('Deaths')
  expect(deathsLegend).not.toBeInTheDocument()
})

test('it renders legend deaths', () => {
  render(
    <CovidDataGraph
      graphData={graphDataTest}
      graphSelected='deaths'
      startDateIndex={0}
      endDateIndex={graphDataTest.length - 1}
    />,
  )
  const confirmedLegend = screen.queryByText('Confirmed cases')
  expect(confirmedLegend).not.toBeInTheDocument()

  const recoveredLegend = screen.queryByText('Recovered cases')
  expect(recoveredLegend).not.toBeInTheDocument()

  const deathsLegend = screen.queryByText('Deaths')
  expect(deathsLegend).toBeInTheDocument()
})
