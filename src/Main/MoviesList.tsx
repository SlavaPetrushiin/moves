import React from "react";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../api/api";
import { TStateFilters, TFilters } from "./../App";

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

type TState =  {
	movies: []
}

type TProps = {
	state: TStateFilters
	page: number
	onChangePage: (page: number) => void
	setTotalPage: (totalPage: number) => void
}

class MoviesList extends React.Component<TProps, TState> {
  state: TState = {
		movies: [],
  }

	getMovies(filters: TFilters, page: number): void{
		const sort_by = filters.sort_by;
		const with_genres = filters.with_genres;
	
		fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&with_genres=${with_genres.join(",")}`)
			.then(res => res.json())
			.then(data => {
				this.setState({movies: data.results});
				this.props.setTotalPage(data.total_pages);
			});	
	}

	componentDidMount(){
		this.getMovies(this.props.state.filters, this.props.page);
	}

	componentDidUpdate(prevProps: TProps){
		if(this.props.state.filters.sort_by !== prevProps.state.filters.sort_by){
			this.props.onChangePage(1);
			this.getMovies(this.props.state.filters, 1);
		}

		if(this.props.page !== prevProps.page)
			this.getMovies(this.props.state.filters, this.props.page);

		if(this.props.state.filters.with_genres.length !== prevProps.state.filters.with_genres.length){
			this.props.onChangePage(1);
			this.getMovies(this.props.state.filters, 1);
		}
	}

	render(){
		const movies = this.state.movies;

		return (
			<div className="row">
				{movies.map((movie: TMovie) => {
					return (
						<div className="col-6 mb-4" key={movie.id}>
							<MovieItem item={movie} />
						</div>
					)
				})}
			</div>
		)
	}
}

export default MoviesList;