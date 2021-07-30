import { useEffect, useState } from 'react'

import axios from 'axios'

const ReservationHistory = () => {
	const [reservationHistory, setReservationHistory] = useState(null)

	useEffect(() => {
		const getReservationHistory = async () => {
			try {
				const response = await axios.get('/api/reservationHistory')
				setReservationHistory(response.data)
			} catch (error) {
				console.log('reservation history api error')
			}
		}

		getReservationHistory()
	}, [])

	return (
		<div>
			<p>reservation history</p>
			<pre>{JSON.stringify(reservationHistory, undefined, 4)}</pre>
		</div>
	)
}

export default ReservationHistory
