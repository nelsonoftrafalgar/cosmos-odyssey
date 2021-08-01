import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'

import { ICellValues } from 'components/PriceList'
import Loader from 'components/Loader'
import axios from 'axios'
import { dictionary } from 'dictionary/dictionary'
import { useHistory } from 'react-router-dom'

const { reservationModal } = dictionary

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
			setValidationErrorMessage(reservationModal.validateChars)
		} else if (firstName.length > 20 || lastName.length > 20) {
			setValidationErrorMessage(reservationModal.validateLenght)
		} else if (!firstName || !lastName) {
			setValidationErrorMessage(reservationModal.validateRequired)
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
						<p className='reservation-modal-success-message'>{reservationModal.successMessage}</p>
					) : (
						<>
							<p className='reservation-modal-details'>
								{reservationModal.route}:{' '}
								<span>
									{origin} - {destination}
								</span>
							</p>
							<p className='reservation-modal-details'>
								{reservationModal.price}: <span>{price}</span>
							</p>
							<p className='reservation-modal-details'>
								{reservationModal.travelTime}: <span>{travelTime} days</span>
							</p>
							<p className='reservation-modal-details'>
								{reservationModal.company}: <span>{companyName}</span>
							</p>
							<form onSubmit={handleFormSubmit} className='reservation-form'>
								<label>
									<input
										className='reservation-modal-input'
										onChange={handleFirstNameChange}
										value={firstName}
										placeholder={reservationModal.firstName}
										type='text'
									/>
								</label>
								<label>
									<input
										className='reservation-modal-input'
										onChange={handleLastNameChange}
										value={lastName}
										placeholder={reservationModal.lastName}
										type='text'
									/>
								</label>
								<p className='reservation-modal-validation-message'>{validationErrorMessage}</p>
								<button className='reservation-modal-btn'>{reservationModal.submit}</button>
							</form>
						</>
					))}
				<button className='reservation-modal-btn' onClick={() => closeModal(null)}>
					{submitSuccessful ? reservationModal.back : reservationModal.cancel}
				</button>
			</div>
		</div>
	)
}

export default ReservationModal
