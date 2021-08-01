import { useEffect, useState } from 'react'

import Loader from 'components/Loader'
import axios from 'axios'
import { dictionary } from 'dictionary/dictionary'
import { useHistory } from 'react-router-dom'

const { reservationHistory: dict } = dictionary

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
			<h1 className='reservation-history-title'>{dict.title}</h1>
			{reservationHistory.map((item, id) => (
				<div key={id} className='reservation-history-item'>
					<p className='reservation-history-details'>
						{dict.firstName}: <span>{item.firstName}</span>
					</p>
					<p className='reservation-history-details'>
						{dict.lastName}: <span>{item.lastName}</span>
					</p>
					<p className='reservation-history-details'>
						{dict.company}: <span>{item.companyName}</span>
					</p>
					<p className='reservation-history-details'>
						{dict.route}: <span>{item.route}</span>
					</p>
					<p className='reservation-history-details'>
						{dict.price}: <span>{item.price}</span>
					</p>
					<p className='reservation-history-details'>
						{dict.travelTime}: <span>{item.travelTime + ' days'}</span>
					</p>
				</div>
			))}
		</div>
	)
}

export default ReservationHistory
