import { CancelToken } from 'axios'
import { IReservationHistoryItem } from 'api/types'
import { http } from './http'

export const fetchReservationHistory = async (cancelToken: CancelToken) => {
	const { data } = await http.get<IReservationHistoryItem[]>('/api/reservationHistory', {
		cancelToken,
	})
	return data
}
