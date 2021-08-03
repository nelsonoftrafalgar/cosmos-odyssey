import { mockHistory, mockLeg } from 'mocks/mockData'

import { rest } from 'msw'

const mockPriceList = {
	id: '1d9c9c2f-5ef6-4b66-95c1-70e0292e910b',
	validUntil: '2021-08-03T12:56:31.7891012Z',
	legs: [mockLeg],
}

export const handlers = [
	rest.get('/api/priceList', (_, res, ctx) => {
		return res(ctx.json(mockPriceList))
	}),
	rest.get('/api/reservationHistory', (_, res, ctx) => {
		return res(ctx.json(mockHistory))
	}),
]
