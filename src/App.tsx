import React, { useEffect } from 'react';
import Header from './Header/Header';
import { apiAuthentication, API_KEY_3, API_URL, CallApi } from './api/api';
import { Route, Switch } from 'react-router-dom';
import MoviesPage from './Pages/MoviesPage/MoviesPage';
import MoviePage from './Pages/MoviePage/MoviePage';
import { useSelector } from 'react-redux';
import store, { RootState } from './store/store';

function App() {
	const { session_id } = useSelector((state: RootState) => state.userReducer);
	useEffect(() => {
		(async () => {
			if (session_id) {
				const dataUser: any = await apiAuthentication(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`);
			}
		})()
	}, []);

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


//@ts-ignore
window.store = store

export default App;
