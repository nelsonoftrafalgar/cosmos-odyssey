import { act, renderHook } from '@testing-library/react-hooks'

import { dictionary } from 'dictionary/dictionary'
import { useReservationValidation } from 'utils/useReservationValidation'

test('it should return false if the input has disallowed chars', async () => {
	const { result, waitForNextUpdate } = renderHook(() => useReservationValidation())

	await act(async () => {
		expect(result.current.validateForm('test1', 'test')).toBeFalsy()
		await waitForNextUpdate()
		expect(result.current.validationErrorMessage).toEqual(dictionary.reservationModal.validateChars)
		expect(result.current.validateForm('test.', 'test')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(dictionary.reservationModal.validateChars)
		expect(result.current.validateForm('test,', 'test')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(dictionary.reservationModal.validateChars)
		expect(result.current.validateForm('test*', 'test#')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(dictionary.reservationModal.validateChars)
		expect(result.current.validateForm('test`', 'test')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(dictionary.reservationModal.validateChars)
		expect(result.current.validateForm('test!', 'test')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(dictionary.reservationModal.validateChars)
		expect(result.current.validateForm('test}', 'test>')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(dictionary.reservationModal.validateChars)
		expect(result.current.validateForm('test<', 'test')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(dictionary.reservationModal.validateChars)
		expect(result.current.validateForm('test?', 'test')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(dictionary.reservationModal.validateChars)
		expect(result.current.validateForm('test_', 'test&')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(dictionary.reservationModal.validateChars)
		expect(result.current.validateForm('test+', 'test')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(dictionary.reservationModal.validateChars)
		expect(result.current.validateForm('test)', 'test')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(dictionary.reservationModal.validateChars)
	})
})

test('it should return false if the input has disallowed length', async () => {
	const { result, waitForNextUpdate } = renderHook(() => useReservationValidation())

	await act(async () => {
		expect(result.current.validateForm('test test test test test', 'test')).toBeFalsy()
		await waitForNextUpdate()
		expect(result.current.validationErrorMessage).toEqual(
			dictionary.reservationModal.validateLenght
		)
	})
})

test('it should return false if the input has no value', async () => {
	const { result, waitForNextUpdate } = renderHook(() => useReservationValidation())

	await act(async () => {
		expect(result.current.validateForm('', 'test')).toBeFalsy()
		await waitForNextUpdate()
		expect(result.current.validationErrorMessage).toEqual(
			dictionary.reservationModal.validateRequired
		)
		expect(result.current.validateForm('', '')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(
			dictionary.reservationModal.validateRequired
		)
		expect(result.current.validateForm('test', '')).toBeFalsy()
		expect(result.current.validationErrorMessage).toEqual(
			dictionary.reservationModal.validateRequired
		)
	})
})

test('it should reset error message', async () => {
	const { result, waitForNextUpdate } = renderHook(() => useReservationValidation())

	await act(async () => {
		expect(result.current.validateForm('', 'test')).toBeFalsy()
		await waitForNextUpdate()
		expect(result.current.validationErrorMessage).toEqual(
			dictionary.reservationModal.validateRequired
		)
		result.current.setValidationErrorMessage('')
		expect(result.current.validationErrorMessage).toEqual('')
	})
})
