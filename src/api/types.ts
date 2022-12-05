export interface ILeg {
	id: string
	routeInfo: {
		id: string
		from: {
			id: string
			name: string
		}
		to: {
			id: string
			name: string
		}
		distance: number
	}
	providers: {
		id: string
		company: {
			id: string
			name: string
		}
		price: number
		flightStart: string
		flightEnd: string
	}[]
}

export interface IPriceList {
	id: string
	validUntil: string
	legs: ILeg[]
}

export interface IParams {
	origin: string
	destination: string
}

export interface ICellValues {
	companyName: string
	price: number
	travelTime: number
}

export interface IPriceListState {
	selectedLeg: ILeg | null
	validUntil: string
	priceListId: string
}

export interface IReservationHistoryItem {
	companyName: string
	firstName: string
	lastName: string
	price: string
	route: string
	travelTime: string
}

export interface ITableColumns extends ICellValues {
	distance: number
}
