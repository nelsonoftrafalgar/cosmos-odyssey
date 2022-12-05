import { dictionary } from 'dictionary/dictionary'

const { refreshModal } = dictionary

const RefreshModal = () => {
	return (
		<div className='refresh-modal-wrapper'>
			<div className='refresh-modal'>
				<p>{refreshModal.message}</p>
				<button className='refresh-modal-btn' onClick={() => window.location.reload()}>
					{refreshModal.button}
				</button>
			</div>
		</div>
	)
}

export default RefreshModal
