import { render, screen } from '@testing-library/react'
import GraphOptionsSelector from '../../components/GraphOptionsSelector'

const onChangeGraphSelectedTest = (value: any) => null

test('it renders correctly confirmed', () => {
  const { asFragment } = render(
    <GraphOptionsSelector graphSelected='all' onChangeGraphSelected={onChangeGraphSelectedTest} />,
  )
  expect(asFragment()).toMatchSnapshot()
})

test('it renders buttons', () => {
  render(
    <GraphOptionsSelector graphSelected='all' onChangeGraphSelected={onChangeGraphSelectedTest} />,
  )
  const allButton = screen.getByText('All')
  expect(allButton).toBeInTheDocument()

  const confirmedButton = screen.getByText('Confirmed')
  expect(confirmedButton).toBeInTheDocument()

  const recoveredButton = screen.getByText('Recovered')
  expect(recoveredButton).toBeInTheDocument()

  const deadButton = screen.getByText('Dead')
  expect(deadButton).toBeInTheDocument()
})
