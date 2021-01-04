import React from "react";
import { TStateFilters } from "../App";

type TProps = {
	filters: TStateFilters
	onChangeFilters: (name: any, value: string) => void
}

class Filters extends React.Component<TProps> {

	onChangeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.props.onChangeFilters(e.currentTarget.name, e.currentTarget.value);
	}

	render(){
		const sort_by = this.props.filters.sort_by;
		return (
				<form className="mb-3">
					<label htmlFor="sort_by">Сортировать по:</label>
					<select
						value={sort_by}
						onChange={this.onChangeValue}
						className="form-select"
						name="sort_by"
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