import { IPriceList } from 'api/types'
import axios from 'axios'

export const fetchPriceList = async (origin: string, destination: string) => {
	const response = await axios.get<IPriceList>('/api/priceList')
	const selectedLeg =
		response.data.legs.find(({ routeInfo: { from, to } }) => {
			return from.name === origin && to.name === destination
		}) || null

	const { validUntil, id: priceListId } = response.data
	return { selectedLeg, validUntil, priceListId }
}
