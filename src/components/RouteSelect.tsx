import { ChangeEvent, useState } from 'react'

import { dictionary } from 'dictionary/dictionary'
import { travelRoutes } from 'api/travelRoutes'
import { useHistory } from 'react-router-dom'

const { routeSelect } = dictionary

const RouteSelect = () => {
	const history = useHistory()
	const [origin, setOrigin] = useState<string | null>(null)
	const [destination, setDestination] = useState<string | null>(null)

	const handleChangeOrigin = (e: ChangeEvent<HTMLSelectElement>) => {
		setDestination(null)
		setOrigin(e.currentTarget.value)
	}

	const handleSubmitRoute = () => {
		history.push(`/priceList/${origin}/${destination}`)
	}

	return (
		<div className='route-select-wrapper'>
			<h1 className='route-select-title'>{routeSelect.title}</h1>
			<select data-testid='ORIGIN-SELECT' className='route-select' onChange={handleChangeOrigin}>
				<option value=''>{routeSelect.selectOrigin}</option>
				{Object.keys(travelRoutes).map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
			{origin && (
				<select
					data-testid='DESTINATION-SELECT'
					className='route-select'
					onChange={(e) => setDestination(e.currentTarget.value)}
				>
					<option value=''>{routeSelect.selectDestination}</option>
					{travelRoutes[origin].map((item) => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</select>
			)}
			{origin && destination && (
				<button
					data-testid='SUBMIT-BUTTON'
					onClick={handleSubmitRoute}
					className='route-select-button'
				>
					{routeSelect.submit}
				</button>
			)}
		</div>
	)
}

export default RouteSelect
