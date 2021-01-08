import React from "react";
import { TGenre, TStateFilters } from "../App";
import SortBy from "./SortBy";
import Genres from "./Genres";
import PrimaryReleaseYear from "./PrimaryReleaseYear";

type TProps = {
	state: TStateFilters
	page: number
	totalPage: number
	onChangePage: (page: number) => void
	onChangeFilters: (name: any, value: string) => void
	onChangeCheckedGenres: (id: number, checked: boolean) => void
}

class Filters extends React.Component<TProps> {
	render(){
		const page = this.props.page;
		const totalPage = this.props.totalPage;
		const genres = this.props.state.filters.with_genres;
		const onChangePage = this.props.onChangePage;
		const onChangeCheckedGenres = this.props.onChangeCheckedGenres;

		return (
				<form className="mb-3">
					<SortBy onChangeSortBy={this.props.onChangeFilters} filters={this.props.state.filters}/>
					<PrimaryReleaseYear onChangeSortBy={this.props.onChangeFilters} filters={this.props.state.filters}/>
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
								disabled={page === totalPage}
							>
								Вперед
							</button>
						</div>
						<div>
							<p>Страница: {page} из {totalPage}</p>
						</div>
					</div>
					<Genres checkedGenres={onChangeCheckedGenres}/>
				</form>
		)
	}
}

export default Filters;