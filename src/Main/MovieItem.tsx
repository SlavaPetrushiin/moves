import React from "react";
import { TMovie } from "./MoviesList";

interface IProps {
	item: TMovie
}

class MovieItem extends React.Component<IProps> {
	render(){
		const {item} = this.props;
		return (
			<div className="card" style={{width: "100%"}}>
				<div className="bg-secondary">
					<img 
          	src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
						item.poster_path}`}
						className="card-img-top img_movie" 
						alt={item.title}
					/>
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