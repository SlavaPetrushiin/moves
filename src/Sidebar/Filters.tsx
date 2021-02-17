import React from "react";
import SortBy from "./SortBy";
import GenresContainer from "./GenresContainer";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Pagination from "./Pagination";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/store";
import { TFilters, updateFiltersThunk, updateGenresThunk } from "../store/redusers";

interface IMapStateToProps {
	page: number | null
	totalPage: number | null
	filters: TFilters
}

interface IDispatchToProps {
  updateGenresThunk?: (id: number, name: keyof TFilters, checked: boolean) => void
	updateFiltersThunk?: (name: keyof TFilters, value: string) => void
	onChangePage?: (page: number) => void
}

class Filters extends React.PureComponent<any & IMapStateToProps & IDispatchToProps> {
	render() {
		const {page, totalPage, filters,  updateFiltersThunk, updateGenresThunk } = this.props;

		return (
			<form className="mb-3">
				<SortBy onChangeSortBy={updateFiltersThunk} filters={filters} />
				<PrimaryReleaseYear onChangeSortBy={updateFiltersThunk} filters={filters} />
				<Pagination
					page={page}
					totalPage={totalPage}
					onChangePage={() => { }}
				/>
				<GenresContainer checkedGenres={updateGenresThunk} />
			</form>
		)
	}
}

const mapState = (state: RootState): IMapStateToProps => {
	return {
		page: state.moviesReducer.page,
		totalPage: state.moviesReducer.totalPage,
		filters: state.moviesReducer.filters
	}
}




export default connect(mapState, {updateFiltersThunk, updateGenresThunk})(Filters);