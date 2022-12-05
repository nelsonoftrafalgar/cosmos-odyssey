import { Link } from 'react-router-dom'
import { dictionary } from 'dictionary/dictionary'

const { navigation } = dictionary

const Navigation = () => {
	return (
		<header className='navigation-wrapper'>
			<ul className='navigation-list'>
				<li className='navigation-list-item'>
					<Link to='/'>{navigation.home}</Link>
				</li>
				<li className='navigation-list-item'>
					<Link to='/reservationHistory'>{navigation.reservationHistory}</Link>
				</li>
			</ul>
		</header>
	)
}

export default Navigation
