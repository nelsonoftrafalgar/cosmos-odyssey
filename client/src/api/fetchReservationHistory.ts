import { IReservationHistoryItem } from './types'
import axios from 'axios'

export const fetchReservationHistory = async () => {
	const response = await axios.get<IReservationHistoryItem[]>('/api/reservationHistory')
	return response.data.reverse()
}
