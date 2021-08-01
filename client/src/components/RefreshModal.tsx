const RefreshModal = () => {
	return (
		<div className='refresh-modal-wrapper'>
			<div className='refresh-modal'>
				<p>The price list has expired</p>
				<button className='refresh-modal-btn' onClick={() => window.location.reload()}>
					Refresh price list
				</button>
			</div>
		</div>
	)
}

export default RefreshModal
