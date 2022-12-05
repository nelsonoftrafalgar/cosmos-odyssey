import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Error from 'components/Error'
import Navigation from 'components/Navigation'
import { PriceList } from 'components/PriceList'
import ReservationHistory from 'components/ReservationHistory'
import RouteSelect from 'components/RouteSelect'

const App = () => {
	return (
		<Router>
			<Navigation />
			<div className='app'>
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
					<Route exact path='/error'>
						<Error />
					</Route>
					<Redirect to='/' />
				</Switch>
			</div>
		</Router>
	)
}

export default App
