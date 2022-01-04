import axios, { CancelToken } from 'axios'

import { IPriceList } from 'api/types'

export const fetchPriceList = async (
	origin: string,
	destination: string,
	cancelToken: CancelToken
) => {
	const response = await axios.get<IPriceList>('/api/priceList', { cancelToken })
	const selectedLeg =
		response.data.legs.find(({ routeInfo: { from, to } }) => {
			return from.name === origin && to.name === destination
		}) || null

	const { validUntil, id: priceListId } = response.data
	return { selectedLeg, validUntil, priceListId }
}
