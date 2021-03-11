import React, { FunctionComponent, useEffect, useState } from "react";
import { CallApi } from "../../api/api";
import { useLocation } from "react-router-dom";
import { Table } from 'reactstrap';

interface IDetails {
	budget: number
	vote_average: number
	runtime: number
	revenue: number
	status: string
	title: string
	production_countries?: {name: string,}[]
	country?: string	
}

const MovieDetail: FunctionComponent = () => {
	const [details, setDetails] = useState<IDetails | null>(null);
	let location = useLocation<any>();

	useEffect(() => {
		(async () => {
			const path = location.pathname.split("/").filter((p) => p !== "").filter((d, i) => i < 2).join("/");
			let res = await CallApi.get<IDetails>(path);

			setDetails({
				budget: res.budget,
				vote_average: res.vote_average,
				runtime: res.runtime,
				revenue: res.revenue,
				status: res.status,
				title: res.title,
				country: res.production_countries!.reduce((sum: string, country: any) => sum += ` ${country.name},`, ''),
			})
		})()
	}, [])

	return (
		<>
			{!details && <p>Loading...</p>}
			{details && (
				<Table striped>
					<thead>
						<tr>
							<th>Наименование</th>
							<th>Описание</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Название</td>
							<td>{details.title}</td>
						</tr>
						<tr>
							<td>Страна</td>
							<td>{details.country}</td>
						</tr>
						<tr>
							<td>Статус</td>
							<td>{details.status}</td>
						</tr>
						<tr>
							<td>Бюджет</td>
							<td>{details.budget} $</td>
						</tr>
						<tr>
							<td>Выручка</td>
							<td>{details.revenue}</td>
						</tr>
						<tr>
							<td>Рейтинг</td>
							<td>{details.vote_average}</td>
						</tr>
						<tr>
							<td>Продолжительность</td>
							<td>{details.runtime}</td>
						</tr>
					</tbody>
				</Table>
			)}
		</>

	)
}

export default MovieDetail;