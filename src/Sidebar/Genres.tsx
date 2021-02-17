import React from "react";
import { TGenre } from "../App";
import { TFilters } from "../store/redusers";

type TProps = {
	genres: TGenre[]
	checkedGenres: (id: number, name: keyof TFilters, checked: boolean) => void
}

class Genres extends React.Component<TProps> {
	render(){
		const {genres, checkedGenres} = this.props;

		return (
			<div className="form-check">
				{genres.map((genre: TGenre) => {
					return (
						<div key={genre.id}>
							<input 
								className="form-check-input"
								type="checkbox"
								value={genre.id}
								id={`genre${genre.id}`}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkedGenres(+genre.id, 'with_genres', e.currentTarget.checked)}
							/> 
							<label className="form-check-label" htmlFor={`genre${genre.id}`}>
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