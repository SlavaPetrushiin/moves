import React from "react";
import SortBy from "./SortBy";
import GenresContainer from "./GenresContainer";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Pagination from "./Pagination";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store/store";
import { TFilters } from "../store/redusers";

interface IMapStateToProps {
	page: number | null
	totalPage: number | null
	filters: TFilters
}

interface IDispatchToProps {
  onChangeCheckedGenres: () => void,
	onChangeFilters: () => void,
	onChangePage: () => void
}

class Filters extends React.PureComponent<any & IMapStateToProps & IDispatchToProps> {
	render() {
		const {page, totalPage, filters,  onChangeCheckedGenres, onChangeFilters, onChangePage} = this.props;

		return (
			<form className="mb-3">
				<SortBy onChangeSortBy={() => { }} filters={filters} />
				<PrimaryReleaseYear onChangeSortBy={() => { }} filters={filters} />
				<Pagination
					page={page}
					totalPage={totalPage}
					onChangePage={() => { }}
				/>
				<GenresContainer checkedGenres={() => { }} />
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

const mapDispatch: IDispatchToProps = {
  onChangeCheckedGenres: () => {},
	onChangeFilters: () => {},
	onChangePage: () => {}
}


export default connect(mapState, mapDispatch)(Filters);