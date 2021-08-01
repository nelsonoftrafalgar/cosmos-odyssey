import { ChangeEvent, useState } from 'react'

import { travelRoutes } from 'api/travelRoutes'
import { useHistory } from 'react-router-dom'

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
			<h1 className='route-select-title'>Configure route</h1>
			<select className='route-select' onChange={handleChangeOrigin}>
				<option value=''>select origin</option>
				{Object.keys(travelRoutes).map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
			{origin && (
				<select className='route-select' onChange={(e) => setDestination(e.currentTarget.value)}>
					<option value=''>select destination</option>
					{travelRoutes[origin].map((item) => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</select>
			)}
			{origin && destination && (
				<button onClick={handleSubmitRoute} className='route-select-button'>
					Submit route
				</button>
			)}
		</div>
	)
}

export default RouteSelect
