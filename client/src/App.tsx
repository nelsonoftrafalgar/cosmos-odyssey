import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import PriceList from 'components/PriceList'
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
				</Switch>
			</Router>
		</div>
	)
}

export default App
