import React from "react";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../api/api";

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
	filters: {
		sort_by: string
	}
}

function getMovies(API_URL: string, API_KEY_3: string, sort_by: string){
	return 	fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`)
	.then(res => res.json())
}

class MoviesList extends React.Component<TProps, TState> {
  state: TState = {
    movies: []
  }

	componentDidMount(){
		const sort_by = this.props.filters.sort_by;

		getMovies(API_URL, API_KEY_3, sort_by)
			.then(data => this.setState({movies: data.results}));		
	}

	componentWillReceiveProps(nextProps: TProps){
		const sort_by = this.props.filters.sort_by;

		if(nextProps.filters.sort_by !== this.props.filters.sort_by){
			getMovies(API_URL, API_KEY_3, sort_by)
				.then(data => this.setState({movies: data.results}));		
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