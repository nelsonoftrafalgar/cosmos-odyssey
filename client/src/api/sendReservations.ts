import axios, { CancelToken } from 'axios'

export const sendReservations = async (formData: FormData, cancelToken: CancelToken) => {
	await axios.post('/api/reservations', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
		cancelToken,
	})
}
