import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { API_URL, API_KEY_3 } from "../api/api";
import { RootState } from "../store/store";
import { bindActionCreators } from 'redux'
import {updateMovies, updateTotalPageThunk} from "./../store/redusers";
import { Dispatch } from "redux";
import { TFilters, TMovie } from "../interfaces/interfaces";

interface IMapState {
	movies: TMovie[]
	filters: TFilters
	page: number
}

interface IDispatchState {
	getMovies: (movies: TMovie[]) => void
	updateTotalPageThunk: (pages: number) => void
}

const mapStateToProps = (state: RootState): IMapState => {
	return {
		movies: state.moviesReducer.movies,
		filters: state.moviesReducer.filters,
		page: state.moviesReducer.page
	}
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchState => {
  return bindActionCreators(
    {
      getMovies: updateMovies,
			updateTotalPageThunk: updateTotalPageThunk
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default (Component: any) => connector(class MoviesHOC extends React.Component<React.ReactNode & PropsFromRedux> {
	getMovies(filters: TFilters, page: number): void {
		const sort_by = filters.sort_by;
		const with_genres = filters.with_genres;
		const primary_release_year = filters.primary_release_year;

		fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${with_genres.join(",")}`)
			.then(res => res.json())
			.then(data => {
				this.props.getMovies(data.results);
				this.props.updateTotalPageThunk(data.total_pages);
			});
	}

	componentDidMount() {
		this.getMovies(this.props.filters, this.props.page);
	}

	componentDidUpdate(prevProps: IMapState){
		if(this.props.filters.primary_release_year !== prevProps.filters.primary_release_year){
			this.getMovies(this.props.filters, 1);
			return;
		}
		if(this.props.filters.sort_by !== prevProps.filters.sort_by){
			this.getMovies(this.props.filters, 1);
			return;
		}
		if(this.props.filters.with_genres.length !== prevProps.filters.with_genres.length){
			this.getMovies(this.props.filters, 1);
			return;
		}
		if(this.props.page !== prevProps.page){
			this.getMovies(this.props.filters, this.props.page);
			return;
		}
	}

	render() {
		return (
			<Component movies={this.props.movies} />
		)
	}
})
