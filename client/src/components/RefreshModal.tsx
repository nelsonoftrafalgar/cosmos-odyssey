const RefreshModal = () => {
	return (
		<div className='refresh-modal-wrapper'>
			<div className='refresh-modal'>
				<p>the price list has expired</p>
				<button onClick={() => window.location.reload()}>refresh price list</button>
			</div>
		</div>
	)
}

export default RefreshModal
