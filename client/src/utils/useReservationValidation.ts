import { dictionary } from 'dictionary/dictionary'
import { useState } from 'react'

const { reservationModal } = dictionary

export const useReservationValidation = () => {
	const [validationErrorMessage, setValidationErrorMessage] = useState('')

	const validateForm = (first_name: string, last_name: string) => {
		const pattern = /^[a-zA-Z\s]*$/
		const isfirst_nameValid = pattern.test(first_name)
		const islast_nameValid = pattern.test(last_name)

		if (!isfirst_nameValid || !islast_nameValid) {
			setValidationErrorMessage(reservationModal.validateChars)
			return false
		} else if (first_name.length > 20 || last_name.length > 20) {
			setValidationErrorMessage(reservationModal.validateLenght)
			return false
		} else if (!first_name || !last_name) {
			setValidationErrorMessage(reservationModal.validateRequired)
			return false
		} else {
			return true
		}
	}

	return { validationErrorMessage, setValidationErrorMessage, validateForm }
}
