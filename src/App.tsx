import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import Filters from './Sidebar/Filters';
import Cookies from 'universal-cookie';
import { apiAuthentication, API_KEY_3, API_URL } from './api/api';
import MoviesList from './Main/MoviesList';

const THIRTY_DAYS_IN_SECONDS = 2592000;
const cookies = new Cookies();
export const AppContext = React.createContext<Partial<ContextProps>>({});

export type ContextProps = { 
	user: null | TUser
	state: TStateFilters
	updateUser: (user: TUser) => void
	updateSessionID:  (session_id: string) => void
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

	const updateSessionID = (session_id: string) => {
		cookies.set('session_id', session_id, { path: '/', maxAge: THIRTY_DAYS_IN_SECONDS });
		setSessionID(session_id);
	}

	const updateUser = (user: TUser) => {
		setUser(user);
	}

  return (
		<AppContext.Provider value={{
			user,
			state,
			updateUser,
			updateSessionID
		}}>
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
	</AppContext.Provider>
  );
}

export default App;
