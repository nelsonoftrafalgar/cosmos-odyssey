import axios, { CancelToken } from 'axios'

import { IReservationHistoryItem } from 'api/types'

export const fetchReservationHistory = async (cancelToken: CancelToken) => {
	const { data } = await axios.get<IReservationHistoryItem[]>('/api/reservationHistory', {
		cancelToken,
	})
	return data
}
