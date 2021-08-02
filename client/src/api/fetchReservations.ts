import axios from 'axios'

export const sendReservations = async (formData: FormData) => {
	await axios.post('/api/reservations', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
}
