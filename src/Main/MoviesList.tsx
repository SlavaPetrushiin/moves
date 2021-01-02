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

class MoviesList extends React.Component<any, TState> {
  constructor(props: any) {
    super(props);

    this.state = {
      movies: []
    };
  }

	componentDidMount(){
		fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU`)
			.then(res => res.json())
			.then(data => this.setState({movies: data.results}));		
	}

	render(){
		return (
			<div className="row">
				{this.state.movies.map((movie: TMovie) => {
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