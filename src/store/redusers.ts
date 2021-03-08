import { RootState } from './store';
import { CallApi } from './../api/api';
import { Dispatch } from "redux";
import { ThunkAction } from 'redux-thunk';
import Cookies from 'universal-cookie';
import {
	IUpdatePage,
	IUpdateTotalPage,
	allActionTypes,
	ISetUser,
	IDeleteUser,
	ISetSessionID,
	IDeleteSessionID,
	IUpdateIsAuth,
	IUpdateFilters,
	IUpdateMovies,
	IAddedGenres,
	IDeleteGenres,
	IUser,
	TMovie,
	TFilters
} from './../interfaces/interfaces'
import {
	SET_USER,
	DELETE_USER,
	SET_SESSION_ID,
	DELETE_SESSION_ID,
	UPDATE_IS_AUTH,
	ADDED_GENRES,
	DELETE_GENRES,
	IS_SHOW_LOGIN_MODAL,
	UPDATE_FILTERS,
	UPDATE_TOTAL_PAGE,
	UPDATE_PAGE,
	UPDATE_MOVIES,
} from "./consts";

const THIRTY_DAYS_IN_SECONDS = 2_592_000;

export type InitialStateMovies = {
	filters: TFilters
	movies: TMovie[]
	page: number
	totalPage: number
}

export type InitialStateUser = {
	user: IUser | null
	session_id: string
	isAuth: boolean
}

export type InitialStateIsShowModal = {
	IsShowModal: boolean
}

export type IThunk = ThunkAction<void, RootState, unknown, any>

const cookies = new Cookies();

const initialStateMovies: InitialStateMovies = {
	filters: {
		sort_by: '',
		with_genres: [],
		primary_release_year: ''
	},
	page: 1,
	totalPage: 1,
	movies: []
}

const initialStateUser: InitialStateUser = {
	user: null,
	session_id: cookies.get('session_id'),
	isAuth: false
}

const initialStateIsShowModal: InitialStateIsShowModal = {
	IsShowModal: false
}

export const moviesReducer = (state: InitialStateMovies = initialStateMovies, action: allActionTypes): InitialStateMovies => {
	switch (action.type) {
		case UPDATE_FILTERS: {
			return {
				...state,
				filters: {
					...state.filters,
					[action.name]: action.value
				}				
			}
		}
		case ADDED_GENRES: {
			return {
				...state,
				filters: {
					...state.filters,
					with_genres: [...state.filters.with_genres, action.value]
				}
			}
		}
		case DELETE_GENRES: {
			return {
				...state,
				filters: {
					...state.filters,
					with_genres: state.filters.with_genres.filter((genre: number) => genre !== action.value)
				}
			}
		}
		case UPDATE_TOTAL_PAGE: {
			return {
				...state,
				totalPage: action.value
			}
		}
		case UPDATE_PAGE: {
			return {
				...state,
				page: action.value
			}
		}
		case UPDATE_MOVIES: {
			return {
				...state,
				movies: action.value
			}
		}
		default:
			return state;
	}
}

export const userReducer = (state: InitialStateUser = initialStateUser, action: allActionTypes): InitialStateUser => {
	switch (action.type) {
		case UPDATE_IS_AUTH: {
			cookies.set('session_id', action.session_id, { path: '/', maxAge: THIRTY_DAYS_IN_SECONDS });
			return {
				...state,
				isAuth: true,
				user: action.user,
				session_id: action.session_id
			}
		}
		case DELETE_SESSION_ID: {
			return {
				...state,
				isAuth: false,
				user: null,
				session_id: ""
			}
		}
		default:
			return state;
	}
}

export const showLoginModal = (state: InitialStateIsShowModal, action: allActionTypes): InitialStateIsShowModal => {
	switch (action.type) {
		case IS_SHOW_LOGIN_MODAL: {
			return {
				...state,
				IsShowModal: !state.IsShowModal
			}
		}
		default:
			return state;
	}
}

/* Action  userReducer */
export const setUser = (user: IUser): ISetUser => ({ type: SET_USER, user });
export const updateIsAuth = (user: IUser, session_id: string): IUpdateIsAuth => ({ type: UPDATE_IS_AUTH, user, session_id });
export const deleteUser = (): IDeleteUser => ({ type: DELETE_USER });
export const setSessionID = (session_id: string): ISetSessionID => ({ type: SET_SESSION_ID, session_id });
export const deleteSessionID = (): IDeleteSessionID => ({ type: DELETE_SESSION_ID });
export const updatePage = (value: number) : IUpdatePage => ({type: UPDATE_PAGE, value});
export const updateTotalPage = (value: number) : IUpdateTotalPage => ({type: UPDATE_TOTAL_PAGE, value});
export const updateMovies = (value: any) : IUpdateMovies => ({type: UPDATE_MOVIES, value});

/* Action  userMovies */
export const updateFilters = (name: string, value: string): IUpdateFilters => ({ type: UPDATE_FILTERS, name, value });
export const addedGenres = (name: string, value: number): IAddedGenres=> ({ type: ADDED_GENRES, name, value });
export const deleteGenres = (name: string, value: number): IDeleteGenres => ({ type: DELETE_GENRES, name, value });

/* Thunk */
export const logOutThunk = (): IThunk => async (dispatch: Dispatch, getState): Promise<any> => {
	const session_id = getState().userReducer.session_id;
	const logOut = await CallApi.delete("authentication/session", { session_id });
	if (logOut) {
		cookies.remove("session_id");
		dispatch(deleteSessionID());
	} else
		console.log("Logout Errors!")
}

export const authorizationUser = (username: string, password: string): IThunk => async (dispatch: Dispatch): Promise<any> => {
	try {
		const data: any = await CallApi.get('authentication/token/new');

		const token: any = await CallApi.post('authentication/token/validate_with_login', {
			username,
			password,
			request_token: data.request_token
		})

		const session: any = await CallApi.post('authentication/session/new', {
			success: token.success,
			request_token: token.request_token
		})

		const dataUser: any = await CallApi.get('account', {
			session_id: session.session_id
		})

		dispatch(updateIsAuth(dataUser, session.session_id));
	}
	catch (error) {
		console.error(`Error ${error}`);
	}
}

export const updateFiltersThunk = (name: keyof TFilters, value: string): IThunk => (dispatch: Dispatch) => {
	dispatch(updateFilters(name, value));
}

export const updateGenresThunk = (id: number, name: keyof TFilters, checked: boolean): IThunk => (dispatch: Dispatch) => {
	if (checked) {
		dispatch(addedGenres(name, id));
	} else {
		dispatch(deleteGenres(name, id));
	}
}

export const getMoviesThunk = (): IThunk => (dispatch: Dispatch): void => {

}

export const updateTotalPageThunk = (totalPage: number): IThunk => (dispatch: Dispatch): void => {
	dispatch(updateTotalPage(totalPage));
}

export const updatePageThunk = (page: number): IThunk => (dispatch: Dispatch): void => {
	dispatch(updatePage(page));
}
