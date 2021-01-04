import React from "react";
import { TStateFilters } from "../App";
import SortBy from "./SortBy";

type TProps = {
	filters: TStateFilters
	onChangeFilters: (name: any, value: string) => void
	page: number
	onChangePage: (page: number) => void
}

class Filters extends React.Component<TProps> {
	render(){
		const page = this.props.page;
		const onChangePage = this.props.onChangePage;

		return (
				<form className="mb-3">
					<label htmlFor="sort_by">Сортировать по:</label>
					<SortBy onChangeSortBy={this.props.onChangeFilters} filters={this.props.filters}/>
					<div>
						<div className="btn-group">
							<button
								onClick={() => onChangePage(page - 1)}
								type="button" className="btn btn-secondary"
								disabled={page === 1}
							>
								Назад
							</button>
							<button 
								onClick={() => onChangePage(page + 1)}
								type="button" className="btn btn-secondary"
							>
								Вперед
							</button>
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