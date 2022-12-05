import { IPriceListState } from 'api/types'

export const getPriceListTableData = (priceList: IPriceListState | null) => {
	return priceList?.selectedLeg?.providers.map((provider) => ({
		companyName: provider.company.name,
		price: provider.price,
		distance: priceList?.selectedLeg?.routeInfo.distance ?? 0,
		travelTime: Math.round(
			+(
				(new Date(provider.flightEnd).getTime() - new Date(provider.flightStart).getTime()) /
				(1000 * 60 * 60 * 24)
			)
		),
	}))
}
