import axios from 'axios'
import { fetchPriceList } from 'api/fetchPriceList'
import { mockLeg } from 'mocks/mockData'

const mockResponse = {
	selectedLeg: mockLeg,
	validUntil: '2021-08-03T12:56:31.7891012Z',
	priceListId: '1d9c9c2f-5ef6-4b66-95c1-70e0292e910b',
}

test('it should fetch and parse price list from api', async () => {
	const mockCancelToken = axios.CancelToken.source()
	const response = await fetchPriceList('Neptune', 'Mercury', mockCancelToken.token)
	expect(response).toMatchObject(mockResponse)
})
