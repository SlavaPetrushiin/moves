import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import Cookies from 'universal-cookie';
import { apiAuthentication, API_KEY_3, API_URL, CallApi } from './api/api';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MoviesPage from './Pages/MoviesPage/MoviesPage';
import MoviePage from './Pages/MoviePage/MoviePage';
import { Provider } from 'react-redux';
import store from './store/store';

const THIRTY_DAYS_IN_SECONDS = 2_592_000;
const cookies = new Cookies();
export const AppContext = React.createContext<Partial<ContextProps>>({});

export type ContextProps = { 
	user: null | TUser
	state: TStateFilters
	page: number
	totalPage: number
	onChangePage: (page: number) => void
	onChangeCheckedGenres: (id: number, checked: boolean) => void
	updateUser: (user: TUser) => void
	updateSessionID:  (session_id: string) => void
	logOut: () => void
	onChangeFilters: (name: keyof  TFilters, value: string) => void
	setTotalPage: (totalPage: number) => void
};

export type TGenre = {
	id: number
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

export type TUser = {
	avatar: any
	id: number
	include_adult: boolean
	iso_639_1: string
	iso_3166_1: string
	name: string
	username: string
}

function App() {
	const [state, setState] = useState<TStateFilters>({
		filters: {
			sort_by: "popularity.desc",
			primary_release_year: "2020",
			with_genres: []
		},
	})
	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);
	const [session_id, setSessionID] = useState<null | string>(null);
	const [user, setUser] = useState<null | TUser>(null);

	useEffect(() => {
		(async () => {
			const session_id = cookies.get("session_id");

			if(session_id){
				const dataUser: any = await apiAuthentication(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`);
				updateUser(dataUser);
			}
		})()

	}, []);

	const onChangeFilters = (name: keyof  TFilters, value: string): void => {
		const newFilters = {...state.filters};
		newFilters[name] = value;

		setState({filters: newFilters})
	}

	const onChangePage = (page: number) => {
		setPage(page);
	}

	const onChangeCheckedGenres = (id: number, checked: boolean): void => {
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

	const updateSessionID = (session_id: string): void => {
		cookies.set('session_id', session_id, { path: '/', maxAge: THIRTY_DAYS_IN_SECONDS });
		setSessionID(session_id);
	}

	const logOut = (): void => {
		(async function(){
			const logOut = await CallApi.delete("authentication/session", {session_id});

			if(logOut){
				setSessionID(null);
				setUser(null);
				cookies.remove("session_id");
			} else {
				console.log("Logout Errors!")
			}
		})()
	} 

	const updateUser = (user: TUser): void => {
		setUser(user);
	}

  return (
		<BrowserRouter>
			<Provider store={store}>
				<AppContext.Provider value={{
					user,
					state,
					page,
					totalPage,
					onChangePage,
					onChangeCheckedGenres,
					updateUser,
					updateSessionID,
					logOut,
					onChangeFilters,
					setTotalPage
				}}>
					<div className="container">
						<Header />
						<Switch>
							<Route path={"/"} exact component={MoviesPage}/>
							<Route path={"/movie/:id"} component={MoviePage}/>
						</Switch>
					</div>
				</AppContext.Provider>	
			</Provider>
		</BrowserRouter>
  );
}

export default App;
