import React from "react";
import MovieItem from "./MovieItem";
import { TMovie } from "./MoviesContainer";

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
							<MovieItem item={movie} />
						</div>
					)
				})}
			</div>
		)
	}
}

export default MoviesList;