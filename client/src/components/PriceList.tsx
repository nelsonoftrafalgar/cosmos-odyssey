import { CellProps, Column, useFilters, useSortBy, useTable } from 'react-table'
import { FC, useEffect, useMemo, useState } from 'react'
import { ICellValues, IParams, IPriceListState, ITableColumns } from 'api/types'
import { Redirect, useHistory, useParams } from 'react-router-dom'

import Loader from 'components/Loader'
import RefreshModal from 'components/RefreshModal'
import ReservationModal from 'components/ReservationModal'
import { dictionary } from 'dictionary/dictionary'
import { fetchPriceList } from 'api/fetchPriceList'
import { getPriceListTableData } from 'utils/getPriceListTableData'
import { travelRoutes } from 'api/travelRoutes'

const { priceList: dict } = dictionary

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
		const getPriceList = async () => {
			try {
				const { selectedLeg, validUntil, priceListId } = await fetchPriceList(origin, destination)
				setPriceList({ selectedLeg, validUntil, priceListId })
			} catch {
				history.replace('/error')
			}
		}

		getPriceList()
	}, [origin, destination, history])

	const data = useMemo(() => getPriceListTableData(priceList), [priceList]) || []

	const columns = useMemo<Column<ITableColumns>[]>(() => {
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
				Header: dict.company,
				accessor: 'companyName',
				Filter: (props) => {
					const { filterValue, setFilter } = props.column
					return (
						<input
							value={filterValue || ''}
							onChange={(e) => setFilter(e.target.value || undefined)}
							placeholder={dict.filterCompanyPlaceholder}
							className='price-list-company-filter'
						/>
					)
				},
				disableSortBy: true,
			},
			{
				Header: dict.price,
				accessor: 'price',
				disableFilters: true,
			},
			{
				Header: dict.distance,
				accessor: 'distance',
				disableFilters: true,
			},
			{
				Header: dict.travelTime,
				accessor: 'travelTime',
				disableFilters: true,
			},
			{
				Header: dict.makeReservation,
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
							{dict.book}
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
			<h1 className='price-list-title'>{dict.title}</h1>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
									className={column.Header === dict.makeReservation ? 'reservation-header' : ''}
									{...column.getHeaderProps(column.getSortByToggleProps())}
								>
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

const withParamsValidation = (Component: FC<IProps>) => () => {
	const { origin, destination } = useParams<IParams>()
	const validParams = origin in travelRoutes && destination in travelRoutes
	return validParams ? <Component origin={origin} destination={destination} /> : <Redirect to='/' />
}

const validatedPriceList = withParamsValidation(PriceList)

export { validatedPriceList as PriceList }
