import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { API_URL, API_KEY_3 } from "../api/api";
import { TFilters } from "../App";
import { RootState } from "../store/store";
import { bindActionCreators } from 'redux'
import {updateMovies} from "./../store/redusers";
import { Dispatch } from "redux";

export type TMovie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

interface IMapState {
	movies: TMovie[]
	filters: TFilters
	page: number
}

interface IDispatchState {
	getMovies: (movies: TMovie[]) => void
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
      getMovies: updateMovies
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
				//this.props.updateTotalPageThunk(data.total_pages);
			});
	}

	componentDidMount() {
		this.getMovies(this.props.filters, this.props.page);
	}

	componentDidUpdate(nextProps: IMapState){
		if(this.props.filters.primary_release_year !== nextProps.filters.primary_release_year){
			this.getMovies(nextProps.filters, 1);
		}
		if(this.props.filters.sort_by !== nextProps.filters.sort_by){
			this.getMovies(nextProps.filters, 1);
		}
		if(this.props.filters.sort_by.length !== nextProps.filters.with_genres.length){
			this.getMovies(nextProps.filters, 1);
		}
	}

	render() {
		return (
			<Component movies={this.props.movies} />
		)
	}
})
