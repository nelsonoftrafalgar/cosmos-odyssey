import { CancelToken } from 'axios'
import { IPriceList } from 'api/types'
import { http } from './http'

export const fetchPriceList = async (
	origin: string,
	destination: string,
	cancelToken: CancelToken
) => {
	const response = await http.get<IPriceList>('/api/priceList', {
		cancelToken,
	})
	const selectedLeg =
		response.data.legs.find(({ routeInfo: { from, to } }) => {
			return from.name === origin && to.name === destination
		}) || null

	const { validUntil, id: priceListId } = response.data
	return { selectedLeg, validUntil, priceListId }
}
