import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import PriceList from 'components/PriceList'
import ReservationHistory from 'components/ReservationHistory'
import RouteSelect from 'components/RouteSelect'

const App = () => {
	return (
		<div className='app'>
			<Router>
				<Switch>
					<Route exact path='/'>
						<RouteSelect />
					</Route>
					<Route exact path='/priceList/:origin/:destination'>
						<PriceList />
					</Route>
					<Route exact path='/reservationHistory'>
						<ReservationHistory />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
