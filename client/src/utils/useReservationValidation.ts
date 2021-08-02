import { dictionary } from 'dictionary/dictionary'
import { useState } from 'react'

const { reservationModal } = dictionary

export const useReservationValidation = () => {
	const [validationErrorMessage, setValidationErrorMessage] = useState('')

	const validateForm = (firstName: string, lastName: string) => {
		const pattern = /^[a-zA-Z\s]*$/
		const isFirstNameValid = pattern.test(firstName)
		const isLastNameValid = pattern.test(lastName)

		if (!isFirstNameValid || !isLastNameValid) {
			setValidationErrorMessage(reservationModal.validateChars)
			return false
		} else if (firstName.length > 20 || lastName.length > 20) {
			setValidationErrorMessage(reservationModal.validateLenght)
			return false
		} else if (!firstName || !lastName) {
			setValidationErrorMessage(reservationModal.validateRequired)
			return false
		} else {
			return true
		}
	}

	return { validationErrorMessage, setValidationErrorMessage, validateForm }
}
