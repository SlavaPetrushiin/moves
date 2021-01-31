import React from "react";
import MovieItem from "./MovieItem";
import MoviesHOC from "./../HOC/MoviesHOC";
import AppContextHOC from "../HOC/AppContextHOC";

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

type TProps = {
	movies: TMovie[]
}

class MoviesList extends React.Component<TProps> {
	render(){
		const movies = this.props.movies;

		return (
			<div className="row">
				{movies.map((movie: TMovie) => {
					return (
						<div className="col-6 mb-4" key={movie.id}>
							<MovieItem item={movie}/>
						</div>
					)
				})}
			</div>
		)
	}
}

export default AppContextHOC(MoviesHOC(MoviesList)) ;