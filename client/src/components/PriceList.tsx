import { CellProps, useSortBy, useTable } from 'react-table'
import { useEffect, useMemo, useState } from 'react'

import RefreshModal from './RefreshModal'
import ReservationModal from './ReservationModal'
import axios from 'axios'
import { useParams } from 'react-router-dom'

interface ILeg {
	id: string
	routeInfo: {
		id: string
		from: {
			id: string
			name: string
		}
		to: {
			id: string
			name: string
		}
		distance: number
	}
	providers: [
		{
			id: string
			company: {
				id: string
				name: string
			}
			price: number
			flightStart: string
			flightEnd: string
		}
	]
}

interface IPriceList {
	id: string
	validUntil: string
	legs: ILeg[]
}

interface IParams {
	origin: string
	destination: string
}

export interface ICellValues {
	companyName: string
	price: number
	travelTime: number
}

interface IPriceListState {
	selectedLeg: ILeg | null
	validUntil: string
	priceListId: string
}

const PriceList = () => {
	const { origin, destination } = useParams<IParams>()
	const [priceList, setPriceList] = useState<IPriceListState | null>(null)
	const [reservation, setReservation] = useState<ICellValues | null>(null)
	const [displayRefreshModal, setDisplayRefreshModal] = useState(false)

	useEffect(() => {
		const fetchPriceList = async () => {
			try {
				const response = await axios.get<IPriceList>('/api/priceList')
				const selectedLeg =
					response.data.legs.find(({ routeInfo: { from, to } }) => {
						return from.name === origin && to.name === destination
					}) || null

				const { validUntil, id: priceListId } = response.data
				setPriceList({ selectedLeg, validUntil, priceListId })
			} catch (error) {
				console.log('api error', error)
			}
		}

		fetchPriceList()
	}, [origin, destination])

	const data =
		useMemo(
			() =>
				priceList?.selectedLeg?.providers.map((provider) => ({
					companyName: provider.company.name,
					price: provider.price,
					distance: priceList?.selectedLeg?.routeInfo.distance,
					travelTime: Math.round(
						+(
							(new Date(provider.flightEnd).getTime() - new Date(provider.flightStart).getTime()) /
							(1000 * 60 * 60 * 24)
						)
					),
				})),
			[priceList?.selectedLeg?.providers, priceList?.selectedLeg?.routeInfo.distance]
		) || []

	const columns: any = useMemo(() => {
		const handleBooking = (companyName: string, price: number, travelTime: number) => () => {
			if (new Date(priceList?.validUntil || '') < new Date()) setDisplayRefreshModal(true)
			else
				setReservation({
					companyName,
					price,
					travelTime,
				})
		}
		return [
			{
				Header: 'Company',
				accessor: 'companyName',
			},
			{
				Header: 'Price',
				accessor: 'price',
			},
			{
				Header: 'Distance',
				accessor: 'distance',
			},
			{
				Header: 'Travel Time',
				accessor: 'travelTime',
			},
			{
				Header: 'Make reservation',
				Cell: ({
					row: {
						values: { companyName, price, travelTime },
					},
				}: CellProps<ICellValues>) => {
					return <button onClick={handleBooking(companyName, price, travelTime)}>book</button>
				},
			},
		]
	}, [priceList?.validUntil])

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
		},
		useSortBy
	)

	return (
		<div>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column: any) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render('Header')}
									<span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
			{displayRefreshModal && <RefreshModal />}
			{reservation && priceList && (
				<ReservationModal
					{...reservation}
					priceListId={priceList.priceListId}
					origin={origin}
					destination={destination}
					closeModal={setReservation}
				/>
			)}
		</div>
	)
}

export default PriceList
