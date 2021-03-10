import React, {FunctionComponent} from "react";
import { Link } from "react-router-dom";
import { TMovie } from "./../interfaces/interfaces";

interface IProps extends TMovie {};

const  MovieItem: FunctionComponent<IProps> = ({id, poster_path, backdrop_path, title, vote_average }) => {
		return (
			<div className="card" style={{width: "100%"}}>
				<div className="bg-secondary move-block">
					<img 
          	src={`https://image.tmdb.org/t/p/w500${backdrop_path || poster_path}`}
						className="card-img-top img_movie" 
						alt={title}
					/>
					<Link
						to={`/movie/${id}`}
					  className="move-link">
							Перейти
					</Link>
				</div>
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <div className="card-text">Рейтинг: {vote_average}</div>
        </div>
			</div>
		)
}

export default MovieItem;