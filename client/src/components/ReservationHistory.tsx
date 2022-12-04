import { useEffect, useState } from 'react'

import { IReservationHistoryItem } from 'api/types'
import Loader from 'components/Loader'
import { dictionary } from 'dictionary/dictionary'
import { fetchReservationHistory } from 'api/fetchReservationHistory'
import { useCancelToken } from 'utils/useCancelToken'
import { useHistory } from 'react-router-dom'

const { reservationHistory: dict } = dictionary

const ReservationHistory = () => {
	const history = useHistory()
	const [reservationHistory, setReservationHistory] = useState<IReservationHistoryItem[] | null>(
		null
	)
	const { newCancelToken, isCancel } = useCancelToken()

	useEffect(() => {
		const getReservationHistory = async () => {
			try {
				const cancelToken = newCancelToken()
				const history = await fetchReservationHistory(cancelToken)
				setReservationHistory(history)
			} catch (error) {
				if (isCancel(error)) return
				history.replace('/error')
			}
		}

		getReservationHistory()
	}, [history, newCancelToken, isCancel])

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
