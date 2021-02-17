import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import { apiAuthentication, API_KEY_3, API_URL, CallApi } from './api/api';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MoviesPage from './Pages/MoviesPage/MoviesPage';
import MoviePage from './Pages/MoviePage/MoviePage';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from './store/store';
export const AppContext = React.createContext<Partial<ContextProps>>({});

export type ContextProps = {
	state: TStateFilters
	page: number
	totalPage: number
	onChangePage: (page: number) => void
	onChangeCheckedGenres: (id: number, checked: boolean) => void
	onChangeFilters: (name: keyof TFilters, value: string) => void
	setTotalPage: (totalPage: number) => void
};

interface IMapStateToProps {
	session_id: string
}

interface IMapDispatchToProps {
	authorizationUser: (username: string, password: string) => void
}

export type TGenre = {
	id: number
	name: string
}

export type TFilters = {
	sort_by: string;
	with_genres: any;
	primary_release_year: string;
}

export type TStateFilters = {
	filters: TFilters
}

function App() {
	const { session_id } = useSelector((state: RootState) => state.userReducer);
	const dispatch = useDispatch();
	const [state, setState] = useState<TStateFilters>({
		filters: {
			sort_by: "popularity.desc",
			primary_release_year: "2020",
			with_genres: []
		},
	})
	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);


	useEffect(() => {
		(async () => {
			if (session_id) {
				const dataUser: any = await apiAuthentication(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`);
				//updateUser(dataUser);
			}
		})()

	}, []);

	const onChangePage = (page: number) => {
		setPage(page);
	}

	const onChangeCheckedGenres = (id: number, checked: boolean): void => {
		if (checked) {
			setState((prev: TStateFilters) => ({
				...prev,
				filters: {
					...prev.filters,
					with_genres: [...prev.filters.with_genres, id]
				}
			}))
		}

		if (!checked) {
			setState((prev: TStateFilters) => ({
				...prev,
				filters: {
					...prev.filters,
					with_genres: prev.filters.with_genres.filter((genre: number) => genre !== id)
				}
			}))
		}
	}

	return (
		<div className="container">
			<Header />
			<Switch>
				<Route path={"/"} exact component={MoviesPage} />
				<Route path={"/movie/:id"} component={MoviePage} />
			</Switch>
		</div>
	);
}

export default App;
