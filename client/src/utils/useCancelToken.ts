import axios, { CancelTokenSource } from 'axios'
import { useCallback, useEffect, useRef } from 'react'

export const useCancelToken = () => {
	const axiosSource = useRef<CancelTokenSource | null>(null)
	const newCancelToken = useCallback(() => {
		axiosSource.current = axios.CancelToken.source()
		return axiosSource.current.token
	}, [])

	useEffect(
		() => () => {
			if (axiosSource.current) axiosSource.current.cancel()
		},
		[]
	)

	return { newCancelToken, isCancel: axios.isCancel }
}
