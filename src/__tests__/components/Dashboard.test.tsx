import { render, screen } from '@testing-library/react'
import Dashboard from '../../components/Dashboard'

test('it renders correctly confirmed', () => {
  const { asFragment } = render(<Dashboard confirmed='123' recovered='456' deaths='789' />)
  expect(asFragment()).toMatchSnapshot()
})

test('it renders cases', () => {
  render(<Dashboard confirmed='123' recovered='456' deaths='789' />)
  const confirmedText = screen.getByText('123')
  expect(confirmedText).toBeInTheDocument()

  const recoveredText = screen.getByText('456')
  expect(recoveredText).toBeInTheDocument()

  const deathsText = screen.getByText('789')
  expect(deathsText).toBeInTheDocument()
})
