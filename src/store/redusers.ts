import { RootState } from './store';
import { CallApi } from './../api/api';
import {Dispatch} from "redux";
import { ThunkAction } from 'redux-thunk';
import Cookies from 'universal-cookie';
import { 
	allActionTypes,
	SET_USER,
	DELETE_USER,
	SET_SESSION_ID,
	DELETE_SESSION_ID,
	UPDATE_IS_AUTH,
	ISetUser,
	IDeleteUser,
	ISetSessionID,
	IDeleteSessionID,
	IS_SHOW_LOGIN_MODAL,
	IUpdateIsAuth
} from "./consts";

const THIRTY_DAYS_IN_SECONDS = 2_592_000;

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

type TGenre = {
	id: number
	name: string
}

export type TFilters =  {
	sort_by: string;
	with_genres: any;
	primary_release_year: string;	
}

export type InitialStateMovies = {
	filters: TFilters
	movies: TMovie[]
}

export type InitialStateUser = {
	user: User | null
	session_id: string
	isAuth: boolean
}

export type InitialStateIsShowModal = {
	IsShowModal: boolean
}

export type User = {
	avatar: any
	id: number
	include_adult: boolean
	iso_639_1: string
	iso_3166_1: string
	name: string
	username: string
}

export type IThunk = ThunkAction<void, RootState, unknown, any>

const cookies = new Cookies();

const initialStateMovies: InitialStateMovies= {
	filters: {
		sort_by: '',
		with_genres: [],
		primary_release_year: ''
	},
	movies: []
}

const initialStateUser: InitialStateUser= {
	user: null,
	session_id: cookies.get('session_id'),
	isAuth: false
}

const initialStateIsShowModal: InitialStateIsShowModal= {
	IsShowModal: false
}

export const moviesReducer = (state: InitialStateMovies = initialStateMovies, action: allActionTypes): InitialStateMovies => {
	switch(action.type){
		default: 
			return state;
	}
}

export const userReducer = (state: InitialStateUser = initialStateUser, action: allActionTypes): InitialStateUser => {
	switch(action.type){
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

export const  showLoginModal = (state: InitialStateIsShowModal, action: allActionTypes): InitialStateIsShowModal => {
	switch(action.type){
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
export const setUser = (user: User): ISetUser => ({type: SET_USER, user});
export const updateIsAuth = (user: User, session_id: string): IUpdateIsAuth => ({type: UPDATE_IS_AUTH, user, session_id});
export const deleteUser = (): IDeleteUser => ({type: DELETE_USER});
export const setSessionID = (session_id: string): ISetSessionID => ({type: SET_SESSION_ID, session_id});
export const deleteSessionID = (): IDeleteSessionID => ({type: DELETE_SESSION_ID});


/* Thunk */
export const logOutThunk = (session_id: string): IThunk => async (dispatch: Dispatch): Promise<any> => {
		const logOut = await CallApi.delete("authentication/session", {session_id});
		if(logOut){
			cookies.remove("session_id");
			dispatch(deleteSessionID());
			dispatch(deleteUser());
		} else 
			console.log("Logout Errors!")		
}

export const authorizationUser = (username: string, password: string): IThunk => async (dispatch: Dispatch): Promise<any> => {
		try{
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

			const dataUser: any =  await CallApi.get('account', {
				session_id: session.session_id
			})

			dispatch(updateIsAuth(dataUser, session.session_id));
		}
		catch(error){
			console.error(`Error ${error}`);
		}
}

export const getMoviesThunk = (): IThunk => (dispatch: Dispatch): Promise<any> => {
	return Promise.resolve();
}

