import { render, screen } from '@testing-library/react'

import RouteSelect from 'components/RouteSelect'
import userEvent from '@testing-library/user-event'

test('selecting route should display submit button', () => {
	render(<RouteSelect />)
	expect(screen.queryByTestId('SUBMIT-BUTTON')).not.toBeInTheDocument()
	userEvent.selectOptions(screen.getByTestId('ORIGIN-SELECT'), 'Earth')
	userEvent.selectOptions(screen.getByTestId('DESTINATION-SELECT'), 'Jupiter')
	expect(screen.getByTestId('SUBMIT-BUTTON')).toBeInTheDocument()
})
