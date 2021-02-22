import React from "react";
import { CallApi } from "../api/api";
import Genres from "./Genres";
import { TFilters } from "../store/redusers";

type TProps = {
	checkedGenres: (id: number, name: keyof TFilters, checked: boolean) => void
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

		if(genres.length === 0) return null;

		return (
			<Genres genres={genres} checkedGenres={this.props.checkedGenres}/>
		)
	}
}

export default React.memo(GenresContainer);