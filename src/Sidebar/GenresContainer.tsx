import React from "react";
import { API_KEY_3, API_URL, CallApi } from "../api/api";
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

	async getAllGenres(){
		const data: any = await CallApi.get("genre/movie/list", {
			language: "ru-RU"
		});
		this.setState({genresList: data.genres});
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