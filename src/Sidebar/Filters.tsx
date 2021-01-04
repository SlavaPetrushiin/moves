import React from "react";
import { API_KEY_3, API_URL } from "../api/api";
import { TStateFilters } from "../App";
import SortBy from "./SortBy";
import Genres from "./Genres";

type TProps = {
	filters: TStateFilters
	onChangeFilters: (name: any, value: string) => void
	page: number
	onChangePage: (page: number) => void
}

export type TGenre = {
	id: string
	name: string
}

export type TState =  {
	genres: TGenre[]
}

class Filters extends React.Component<TProps, TState> {
	state: TState = {
		genres: []
	}

	componentDidMount(){
		this.getAllGenres();
	}

	getAllGenres(){
		fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`)
			.then(res => res.json())
			.then(data => this.setState({genres: data.genres}));	
	}

	render(){
		const page = this.props.page;
		const onChangePage = this.props.onChangePage;
		console.log("genres: ", this.state.genres)
		return (
				<form className="mb-3">
					<label htmlFor="sort_by">Сортировать по:</label>
					<SortBy onChangeSortBy={this.props.onChangeFilters} filters={this.props.filters}/>
					<div>
						<div className="btn-group">
							<button
								onClick={() => onChangePage(page - 1)}
								type="button" className="btn btn-secondary"
								disabled={page === 1}
							>
								Назад
							</button>
							<button 
								onClick={() => onChangePage(page + 1)}
								type="button" className="btn btn-secondary"
							>
								Вперед
							</button>
						</div>
						<div>
							<p>Страница: {page}</p>
						</div>
					</div>
					<Genres genres={this.state.genres}/>
				</form>
		)
	}
}

export default Filters;