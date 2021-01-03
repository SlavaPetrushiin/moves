import React from "react";
import { API_KEY_3, API_URL } from "../api/api";

type TProps = {
	filters: {
		sort_by: string
	}
	setFilters: any
}

class Filters extends React.Component<TProps> {

	onChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.props.setFilters({sort_by: e.currentTarget.value});
	}

	render(){
		const sort_by = this.props.filters.sort_by;
		return (
				<form className="mb-3">
					<label htmlFor="sort_by">Сортировать по:</label>
					<select
						value={sort_by}
						onChange={this.onChangeFilter}
						className="form-select"
						id="sort_by"
					>
						<option value="popularity.desc">Популярные по убыванию</option>
						<option value="popularity.asc">Популярные по возростанию</option>
						<option value="vote_average.desc">Рейтинг по убыванию</option>
						<option value="vote_average.asc">Рейтинг по возростанию</option>
					</select>	
				</form>
		)
	}
}

export default Filters;