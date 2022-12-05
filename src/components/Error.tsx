import { Link } from 'react-router-dom'
import { dictionary } from 'dictionary/dictionary'

const { error } = dictionary

const Error = () => {
	return (
		<div className='error-wrapper'>
			<p className='error-message'>{error.message}</p>
			<Link to='/'>{error.link}</Link>
		</div>
	)
}

export default Error
