import { Link } from 'react-router-dom'

const Navigation = () => {
	return (
		<header className='navigation-wrapper'>
			<ul className='navigation-list'>
				<li className='navigation-list-item'>
					<Link to='/'>Home</Link>
				</li>
				<li className='navigation-list-item'>
					<Link to='/reservationHistory'>Reservation History</Link>
				</li>
			</ul>
		</header>
	)
}

export default Navigation
