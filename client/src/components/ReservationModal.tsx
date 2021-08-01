import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'

import { ICellValues } from 'components/PriceList'
import Loader from 'components/Loader'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

interface IProps extends ICellValues {
	closeModal: Dispatch<SetStateAction<ICellValues | null>>
	origin: string
	destination: string
	priceListId: string
}

const ReservationModal: FC<IProps> = ({
	companyName,
	price,
	travelTime,
	closeModal,
	origin,
	destination,
	priceListId,
}) => {
	const history = useHistory()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [submitSuccessful, setSubmitSuccessful] = useState(false)
	const [validationErrorMessage, setValidationErrorMessage] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleFormSubmit = async (e: FormEvent) => {
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
			const formData = new FormData()
			formData.append('route', `${origin}-${destination}`)
			formData.append('price', `${price}`)
			formData.append('travelTime', `${travelTime}`)
			formData.append('companyName', companyName)
			formData.append('firstName', firstName)
			formData.append('lastName', lastName)
			formData.append('priceListId', priceListId)

			setIsSubmitting(true)
			try {
				await axios.post('/api/reservations', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})

				setIsSubmitting(false)
				setSubmitSuccessful(true)
			} catch {
				history.replace('/error')
			}
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
				{isSubmitting && <Loader />}
				{!isSubmitting &&
					(submitSuccessful ? (
						<p className='reservation-modal-success-message'>Reservation successful</p>
					) : (
						<>
							<p className='reservation-modal-details'>
								Route:{' '}
								<span>
									{origin} - {destination}
								</span>
							</p>
							<p className='reservation-modal-details'>
								Price: <span>{price}</span>
							</p>
							<p className='reservation-modal-details'>
								Travel time: <span>{travelTime} days</span>
							</p>
							<p className='reservation-modal-details'>
								Company: <span>{companyName}</span>
							</p>
							<form onSubmit={handleFormSubmit} className='reservation-form'>
								<label>
									<input
										className='reservation-modal-input'
										onChange={handleFirstNameChange}
										value={firstName}
										placeholder='First name'
										type='text'
									/>
								</label>
								<label>
									<input
										className='reservation-modal-input'
										onChange={handleLastNameChange}
										value={lastName}
										placeholder='Last name'
										type='text'
									/>
								</label>
								<p className='reservation-modal-validation-message'>{validationErrorMessage}</p>
								<button className='reservation-modal-btn'>Submit reservation</button>
							</form>
						</>
					))}
				<button className='reservation-modal-btn' onClick={() => closeModal(null)}>
					{submitSuccessful ? 'Back to price list' : 'Cancel'}
				</button>
			</div>
		</div>
	)
}

export default ReservationModal
