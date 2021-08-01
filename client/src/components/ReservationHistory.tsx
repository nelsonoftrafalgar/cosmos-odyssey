import { useEffect, useState } from 'react'

import Loader from 'components/Loader'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

interface IReservationHistoryItem {
	companyName: string
	firstName: string
	lastName: string
	price: string
	route: string
	travelTime: string
}

const ReservationHistory = () => {
	const history = useHistory()
	const [reservationHistory, setReservationHistory] = useState<IReservationHistoryItem[] | null>(
		null
	)

	useEffect(() => {
		const getReservationHistory = async () => {
			try {
				const response = await axios.get<IReservationHistoryItem[]>('/api/reservationHistory')
				setReservationHistory(response.data.reverse())
			} catch {
				history.replace('/error')
			}
		}

		getReservationHistory()
	}, [history])

	if (!reservationHistory) {
		return <Loader />
	}

	return (
		<div className='reservation-history-wrapper'>
			<h1 className='reservation-history-title'>Reservation history</h1>
			{reservationHistory.map((item, id) => (
				<div key={id} className='reservation-history-item'>
					<p className='reservation-history-details'>
						First name: <span>{item.firstName}</span>
					</p>
					<p className='reservation-history-details'>
						Last name: <span>{item.lastName}</span>
					</p>
					<p className='reservation-history-details'>
						Company name: <span>{item.companyName}</span>
					</p>
					<p className='reservation-history-details'>
						Route: <span>{item.route}</span>
					</p>
					<p className='reservation-history-details'>
						Price: <span>{item.price}</span>
					</p>
					<p className='reservation-history-details'>
						Travel time: <span>{item.travelTime + ' days'}</span>
					</p>
				</div>
			))}
		</div>
	)
}

export default ReservationHistory
