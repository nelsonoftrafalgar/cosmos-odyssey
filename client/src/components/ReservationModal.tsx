import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'

import { ICellValues } from './PriceList'

interface IProps extends ICellValues {
	closeModal: Dispatch<SetStateAction<ICellValues | null>>
	origin: string
	destination: string
}

const ReservationModal: FC<IProps> = ({
	companyName,
	price,
	travelTime,
	closeModal,
	origin,
	destination,
}) => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [submitSuccessful, setSubmitSuccessful] = useState(false)
	const [validationErrorMessage, setValidationErrorMessage] = useState('')

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault()
		const pattern = /^[a-zA-Z\s]*$/
		const isFirstNameValid = pattern.test(firstName)
		const isLastNameValid = pattern.test(lastName)

		if (!isFirstNameValid || !isLastNameValid) {
			setValidationErrorMessage('First and last name must include only letters or spaces')
		} else if (firstName.length > 20 || lastName.length > 20) {
			setValidationErrorMessage('First or last name must have max 20 chars')
		} else if (!firstName || !lastName) {
			setValidationErrorMessage('First and last name is required')
		} else {
			console.log({
				route: `${origin}-${destination}`,
				price,
				travelTime,
				companyName,
				firstName,
				lastName,
			})
			setSubmitSuccessful(true)
		}
	}

	const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (validationErrorMessage) setValidationErrorMessage('')
		setFirstName(e.currentTarget.value)
	}

	const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (validationErrorMessage) setValidationErrorMessage('')
		setLastName(e.currentTarget.value)
	}

	return (
		<div className='reservation-modal-wrapper'>
			<div className='reservation-modal'>
				{submitSuccessful ? (
					<p>reservation successful</p>
				) : (
					<>
						<p>
							route: {origin} - {destination}
						</p>
						<p>price: {price}</p>
						<p>travel time: {travelTime} days</p>
						<p>company: {companyName}</p>
						<form onSubmit={handleFormSubmit} className='reservation-form'>
							<label>
								<input
									onChange={handleFirstNameChange}
									value={firstName}
									placeholder='First name'
									type='text'
								/>
							</label>
							<label>
								<input
									onChange={handleLastNameChange}
									value={lastName}
									placeholder='Last name'
									type='text'
								/>
							</label>
							<p>{validationErrorMessage}</p>
							<button>Submit reservation</button>
						</form>
					</>
				)}
				<button onClick={() => closeModal(null)}>
					{submitSuccessful ? 'Back to price list' : 'Cancel'}
				</button>
			</div>
		</div>
	)
}

export default ReservationModal
