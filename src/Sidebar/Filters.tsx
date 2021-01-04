import React, { Dispatch, SetStateAction } from "react";
import { TStateFilters } from "../App";

type TProps = {
	filters: TStateFilters
	onChangeFilters: (name: any, value: string) => void
	page: number
	onChangePage: (page: number) => void
}

class Filters extends React.Component<TProps> {
	onChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.props.onChangeFilters(e.currentTarget.name, e.currentTarget.value);
	}

	render(){
		const sort_by = this.props.filters.sort_by;
		const page = this.props.page;
		const onChangePage = this.props.onChangePage

		return (
				<form className="mb-3">
					<label htmlFor="sort_by">Сортировать по:</label>
					<select
						value={sort_by}
						onChange={this.onChangeValue}
						className="form-select mb-3"
						name="sort_by"
						id="sort_by"
					>
						<option value="popularity.desc">Популярные по убыванию</option>
						<option value="popularity.asc">Популярные по возростанию</option>
						<option value="vote_average.desc">Рейтинг по убыванию</option>
						<option value="vote_average.asc">Рейтинг по возростанию</option>
					</select>
					<div>
						<div className="btn-group">
							<button onClick={() => this.props.onChangePage(page - 1)} type="button" className="btn btn-secondary" data-name="prev">Назад</button>
							<button onClick={() => this.props.onChangePage(page + 1)} type="button" className="btn btn-secondary" data-name="next">Вперед</button>
						</div>
						<div>
							<p>Страница: {page}</p>
						</div>
					</div>
	
				</form>
		)
	}
}

export default Filters;