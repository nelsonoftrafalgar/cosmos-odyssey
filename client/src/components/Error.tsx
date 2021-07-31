import { Link } from 'react-router-dom'

const Error = () => {
	return (
		<div className='error-wrapper'>
			<p className='error-message'>There has been an API error</p>
			<Link to='/'>Go to home page</Link>
		</div>
	)
}

export default Error
