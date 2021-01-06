import React from "react";
import { API_KEY_3, API_URL } from "../api/api";

type TProps = {
	checkedGenres: (id: number, checked: boolean) => void
}

type TGenre = {
	id: number
	name: string
}

type TState = {
	genresList: TGenre[]
}

class Genres extends React.Component<TProps, TState> {
	state: TState = {
		genresList: []
	}

	componentDidMount(){
		this.getAllGenres();
	}

	getAllGenres(){
		fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`)
			.then(res => res.json())
			.then(data => this.setState({genresList: data.genres}));	
	}

	render(){
		const genres = this.state.genresList;
		const checkedGenres = this.props.checkedGenres;

		if(genres.length === 0) return null;

		return (
			<div className="form-check">
				{genres.map(genre => {
					return (
						<div key={genre.id}>
							<input 
								className="form-check-input"
								type="checkbox"
								value={genre.id}
								id={`genre${genre.id}`}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkedGenres(genre.id, e.currentTarget.checked)}
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