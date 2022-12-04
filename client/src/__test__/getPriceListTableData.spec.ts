import { getPriceListTableData } from 'utils/getPriceListTableData'
import { mockLeg } from 'mocks/mockData'

const mockPriceListSate = {
	selectedLeg: mockLeg,
	validUntil: '2021-08-03T12:11:29.3093071Z',
	priceListId: '5d4e9437-e982-472b-852c-f56bdfb6da15',
}

const mockTableData = [
	{ companyName: 'Space Piper', price: 721791.84, distance: 4443090000, travelTime: 1 },
	{ companyName: 'Space Odyssey', price: 2859639.39, distance: 4443090000, travelTime: 5 },
	{ companyName: 'Explore Dynamite', price: 3366347.33, distance: 4443090000, travelTime: 2 },
]

test('it should extract table data from price list', () => {
	expect(getPriceListTableData(mockPriceListSate)).toMatchObject(mockTableData)
})
