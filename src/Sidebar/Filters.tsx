import React from "react";
import { TGenre, TStateFilters } from "../App";
import SortBy from "./SortBy";
import GenresContainer from "./GenresContainer";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Pagination from "./Pagination";

type TProps = {
	state: TStateFilters
	page: number
	totalPage: number
	onChangePage: (page: number) => void
	onChangeFilters: (name: any, value: string) => void
	onChangeCheckedGenres: (id: number, checked: boolean) => void
}

class Filters extends React.PureComponent<TProps> {
	render(){
		const page = this.props.page;
		const totalPage = this.props.totalPage;
		const onChangeCheckedGenres = this.props.onChangeCheckedGenres;

		return (
				<form className="mb-3">
					<SortBy onChangeSortBy={this.props.onChangeFilters} filters={this.props.state.filters}/>
					<PrimaryReleaseYear onChangeSortBy={this.props.onChangeFilters} filters={this.props.state.filters}/>
					<Pagination 
						page={page}
						totalPage={totalPage}
						onChangePage={this.props.onChangePage}
					/>
					<GenresContainer checkedGenres={onChangeCheckedGenres}/>
				</form>
		)
	}
}

export default Filters;