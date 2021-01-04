import React from "react";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../api/api";
import { TStateFilters } from "../App";

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
	filters: TStateFilters
}

class MoviesList extends React.Component<TProps, TState> {
  state: TState = {
    movies: []
  }

	getMovies(filters: TStateFilters): void{
		const sort_by = filters.sort_by;
	
		fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`)
			.then(res => res.json())
			.then(data => this.setState({movies: data.results}));	
	}

	componentDidMount(){
		this.getMovies(this.props.filters);
	}

	componentDidUpdate(prevProps: TProps){
		if(this.props.filters.sort_by !== prevProps.filters.sort_by)
			this.getMovies(this.props.filters);
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