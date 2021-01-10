import React, { useState } from 'react';
import Header from './Header/Header';
import MoviesList from './Main/MoviesList';
import Filters from './Sidebar/Filters';

export type TGenre = {
	id: string
	name: string
}

export type TFilters =  {
	sort_by: string;
	with_genres: any;
	primary_release_year: string;	
}

export type TStateFilters = {
	filters: TFilters
}

function App() {
	const [state, setState] = useState<TStateFilters>({
		filters: {
			sort_by: "popularity.desc",
			primary_release_year: "2020",
			with_genres: []
		}
	})
	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);

	const onChangeFilters = (name: keyof  TFilters, value: string) => {
		const newFilters = {...state.filters};
		newFilters[name] = value;

		setState({filters: newFilters})
	}

	const onChangePage = (page: number) => {
		setPage(page);
	}

	const onChangeCheckedGenres = (id: number, checked: boolean) => {
		if(checked){
			setState((prev: TStateFilters) => ({
				...prev,
				filters: {
					...prev.filters,
					with_genres: [...prev.filters.with_genres, id]
				}
			}))
		}

		if(!checked){
			setState((prev: TStateFilters) => ({
				...prev,
				filters: {
					...prev.filters,
					with_genres: prev.filters.with_genres.filter((genre: number )=> genre !== id)
				}
			}))
		}

	}

  return (
	<div className="container">
		<Header />
		<div className="row">
			<div className="col-4">
				<h4>Фильмы</h4>
				<Filters 
					state={state}
					onChangeFilters={onChangeFilters}
					page={page}
					totalPage={totalPage}
					onChangePage={onChangePage}
					onChangeCheckedGenres={onChangeCheckedGenres}
				/>
			</div>
			<div className="col-8">
				<MoviesList 
					state={state}
					page={page}
					onChangePage={onChangePage}
					setTotalPage={setTotalPage}
				/>
			</div>
		</div>
	</div>
  );
}

export default App;
