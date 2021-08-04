import { fetchReservationHistory } from 'api/fetchReservationHistory'
import { mockHistory } from 'mocks/mockData'

test('it should fetch reservation history data', async () => {
	const response = await fetchReservationHistory()
	expect(response).toMatchObject(mockHistory)
})
