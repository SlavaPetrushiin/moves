import React from "react";
import {API_URL, API_KEY_3} from "../api/api";
import {TFilters } from "../App";

export type TMovie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

type TState =  {
	movies: TMovie[]
}

type TProps = {
	//movies: TStateFilters
	//page: number
	//onChangePage: (page: number) => void
	//setTotalPage: (totalPage: number) => void
	filters: TFilters
	page: number
}

export default (Component: any) => class MoviesHOC extends React.Component<any> {
  state: TState = {
		movies: [],
  }

	getMovies(filters: TFilters, page: number): void{
		const sort_by = filters.sort_by;
		const with_genres = filters.with_genres;
		const primary_release_year = filters.primary_release_year;
	
		fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${with_genres.join(",")}`)
			.then(res => res.json())
			.then(data => {
				this.setState({movies: data.results});
				//this.props.setTotalPage(data.total_pages);
			});	
	}

	componentDidMount(){
		this.getMovies(this.props.filters, this.props.page);
	}

	componentDidUpdate(prevProps: TProps){
		if(this.props.filters.sort_by !== prevProps.filters.sort_by){
			//this.props.onChangePage(1);
			this.getMovies(this.props.filters, 1);
		}

		if(this.props.page !== prevProps.page)
			//this.getMovies(this.props.filters, this.props.page);
		if(this.props.filters.with_genres.length > 0){
			//this.props.onChangePage(1);
			this.getMovies(this.props.filters, 1);
		}

		if(this.props.filters.primary_release_year !== prevProps.filters.primary_release_year){
			//this.props.onChangePage(1);
			this.getMovies(this.props.filters, 1);
		}
	}

	render(){
		const {movies} = this.state;

		return (
			<div className="row">
				<Component movies={movies} {...this.props}/>
			</div>
		)
	}
}
