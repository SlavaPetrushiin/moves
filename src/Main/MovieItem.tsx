import React from "react";
import { Link } from "react-router-dom";
import { TMovie } from "../HOC/MoviesHOC";

interface IProps {
	item: TMovie
}

class MovieItem extends React.Component<IProps> {
	render(){
		const {item} = this.props;
		return (
			<div className="card" style={{width: "100%"}}>
				<div className="bg-secondary move-block">
					<img 
          	src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
						item.poster_path}`}
						className="card-img-top img_movie" 
						alt={item.title}
					/>
					<Link
						to={`/movie/${this.props.item.id}`}
					  className="move-link">
							Перейти
					</Link>
				</div>
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
			</div>
		)
	}
}

export default MovieItem;