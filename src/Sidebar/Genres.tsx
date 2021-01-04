import React from "react";
import { TGenre } from "./Filters";

type TProps = {
	genres: TGenre[]
}

class Genres extends React.Component<TProps> {
	render(){
		const genres = this.props.genres;

		if(genres.length === 0) return null;

		return (
			<div className="form-check">
				{genres.map(genre => {
					return (
						<div key={genre.id}>
							<input className="form-check-input" type="checkbox" value="" id={genre.id} /> 
							<label className="form-check-label" htmlFor={genre.id}>
								{genre.name}
							</label>
						</div>
					)
				})}
			</div>
		)
	}
}

export default Genres;