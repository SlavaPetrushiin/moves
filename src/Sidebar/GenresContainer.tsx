import React from "react";
import { API_KEY_3, API_URL } from "../api/api";
import Genres from "./Genres";

type TProps = {
	checkedGenres: (id: number, checked: boolean) => void
}

export type TGenre = {
	id: number
	name: string
}

type TState = {
	genresList: TGenre[]
}

class GenresContainer extends React.Component<TProps, TState> {
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
			<Genres genres={genres} checkedGenres={checkedGenres}/>
		)
	}
}

export default GenresContainer;