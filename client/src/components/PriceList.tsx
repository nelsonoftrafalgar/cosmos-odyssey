import { CellProps, useFilters, useSortBy, useTable } from 'react-table'
import { FC, useEffect, useMemo, useState } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'

import Loader from 'components/Loader'
import RefreshModal from 'components/RefreshModal'
import ReservationModal from 'components/ReservationModal'
import axios from 'axios'
import { travelRoutes } from 'api/travelRoutes'

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
	providers: {
		id: string
		company: {
			id: string
			name: string
		}
		price: number
		flightStart: string
		flightEnd: string
	}[]
}

interface IPriceList {
	id: string
	validUntil: string
	legs: ILeg[]
}

export interface IParams {
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

interface IProps {
	origin: string
	destination: string
}

const PriceList: FC<IProps> = ({ origin, destination }) => {
	const history = useHistory()
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
			} catch {
				history.replace('/error')
			}
		}

		fetchPriceList()
	}, [origin, destination, history])

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

	const CompanyFilter = (props: any) => {
		const { filterValue, setFilter } = props.column
		return (
			<input
				value={filterValue || ''}
				onChange={(e) => setFilter(e.target.value || undefined)}
				placeholder='Filter company'
				className='price-list-company-filter'
			/>
		)
	}
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
				Filter: CompanyFilter,
				disableSortBy: true,
			},
			{
				Header: 'Price',
				accessor: 'price',
				disableFilters: true,
			},
			{
				Header: 'Distance',
				accessor: 'distance',
				disableFilters: true,
			},
			{
				Header: 'Travel Time',
				accessor: 'travelTime',
				disableFilters: true,
			},
			{
				Header: 'Make reservation',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({
					row: {
						values: { companyName, price, travelTime },
					},
				}: CellProps<ICellValues>) => {
					return (
						<button
							className='price-list-book-btn'
							onClick={handleBooking(companyName, price, travelTime)}
						>
							book
						</button>
					)
				},
			},
		]
	}, [priceList?.validUntil])

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
		},
		useFilters,
		useSortBy
	)

	if (!priceList) {
		return <Loader />
	}

	return (
		<div className='price-list-wrapper'>
			<h1 className='price-list-title'>Price list</h1>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column: any) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render('Header')}
									<span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
									<div>{column.canFilter ? column.render('Filter') : null}</div>
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
			{/* <pre>{JSON.stringify(priceList, undefined, 4)}</pre> */}
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

const withParamsValidation = (Component: any) => () => {
	const { origin, destination } = useParams<IParams>()
	const validParams = origin in travelRoutes && destination in travelRoutes
	return validParams ? <Component origin={origin} destination={destination} /> : <Redirect to='/' />
}

const validatedPriceList = withParamsValidation(PriceList)

export { validatedPriceList as PriceList }
