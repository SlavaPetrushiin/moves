import React from "react";
import { TStateFilters } from "../App";
import SortBy from "./SortBy";
import GenresContainer from "./GenresContainer";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Pagination from "./Pagination";
import AppContextHOC from "../HOC/AppContextHOC";

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
		const {page, totalPage, state,  onChangeCheckedGenres, onChangeFilters, onChangePage} = this.props;


		return (
				<form className="mb-3">
					<SortBy onChangeSortBy={onChangeFilters} filters={state.filters}/>
					<PrimaryReleaseYear onChangeSortBy={onChangeFilters} filters={state.filters}/>
					<Pagination 
						page={page}
						totalPage={totalPage}
						onChangePage={onChangePage}
					/>
					<GenresContainer checkedGenres={onChangeCheckedGenres}/>
				</form>
		)
	}
}

export default AppContextHOC(Filters);