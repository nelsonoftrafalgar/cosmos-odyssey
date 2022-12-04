import axios from 'axios'
import { fetchReservationHistory } from 'api/fetchReservationHistory'
import { mockHistory } from 'mocks/mockData'

test('it should fetch reservation history data', async () => {
	const mockCancelToken = axios.CancelToken.source()
	const response = await fetchReservationHistory(mockCancelToken.token)
	expect(response).toMatchObject(mockHistory)
})
