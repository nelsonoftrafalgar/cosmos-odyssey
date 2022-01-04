import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'

import { ICellValues } from 'api/types'
import Loader from 'components/Loader'
import axios from 'axios'
import { dictionary } from 'dictionary/dictionary'
import { sendReservations } from 'api/sendReservations'
import { useCancelToken } from 'utils/useCancelToken'
import { useHistory } from 'react-router-dom'
import { useReservationValidation } from 'utils/useReservationValidation'

const { reservationModal } = dictionary

interface IProps extends ICellValues {
	closeModal: Dispatch<SetStateAction<ICellValues | null>>
	origin: string
	destination: string
	priceListId: string
}

const ReservationModal: FC<IProps> = ({
	company_name,
	price,
	travel_time,
	closeModal,
	origin,
	destination,
	priceListId,
}) => {
	const history = useHistory()
	const [first_name, setFirstName] = useState('')
	const [last_name, setLastName] = useState('')
	const [submitSuccessful, setSubmitSuccessful] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { validationErrorMessage, setValidationErrorMessage, validateForm } =
		useReservationValidation()
	const { newCancelToken, isCancel } = useCancelToken()

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault()
		const isFormValid = validateForm(first_name, last_name)

		if (!isFormValid) {
			return
		} else {
			const formData = new FormData()
			formData.append('route', `${origin}-${destination}`)
			formData.append('price', `${price}`)
			formData.append('travel_time', `${travel_time}`)
			formData.append('company_name', company_name)
			formData.append('first_name', first_name)
			formData.append('last_name', last_name)
			formData.append('priceListId', priceListId)

			setIsSubmitting(true)
			try {
				const cancelToken = newCancelToken()
				await sendReservations(formData, cancelToken)
				setIsSubmitting(false)
				setSubmitSuccessful(true)
			} catch (error) {
				if (isCancel(error)) return
				if (axios.isAxiosError(error) && error.message.includes('409')) {
					setValidationErrorMessage('Reservation already exists')
					setIsSubmitting(false)
				} else {
					history.replace('/error')
				}
			}
		}
	}

	const handlefirst_nameChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (validationErrorMessage) setValidationErrorMessage('')
		setFirstName(e.currentTarget.value)
	}

	const handlelast_nameChange = (e: ChangeEvent<HTMLInputElement>) => {
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
								{reservationModal.travelTime}: <span>{travel_time} days</span>
							</p>
							<p className='reservation-modal-details'>
								{reservationModal.company}: <span>{company_name}</span>
							</p>
							<form onSubmit={handleFormSubmit} className='reservation-form'>
								<label>
									<input
										className='reservation-modal-input'
										onChange={handlefirst_nameChange}
										value={first_name}
										placeholder={reservationModal.firstName}
										type='text'
									/>
								</label>
								<label>
									<input
										className='reservation-modal-input'
										onChange={handlelast_nameChange}
										value={last_name}
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
