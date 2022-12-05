import { CancelToken } from 'axios'
import { http } from './http'

export const sendReservations = async (formData: FormData, cancelToken: CancelToken) => {
	await http.post('/api/reservations', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
		cancelToken,
	})
}
