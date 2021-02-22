import { User, TMovie } from './redusers';
export const SET_USER = 'SET_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_SESSION_ID = 'SET_SESSION_ID';
export const DELETE_SESSION_ID = 'DELETE_SESSION_ID';
export const IS_SHOW_LOGIN_MODAL = 'IS_SHOW_LOGIN_MODAL';
export const UPDATE_IS_AUTH = 'UPDATE_IS_AUTH';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_TOTAL_PAGE = 'UPDATE_TOTAL_PAGE';

export const UPDATE_FILTERS = 'UPDATE_FILTERS';
export const UPDATE_MOVIES = 'UPDATE_MOVIES'

export interface ISetUser {
	type: typeof SET_USER
	user: User
}

export interface IDeleteUser {
	type: typeof DELETE_USER
}

export interface ISetSessionID {
	type: typeof SET_SESSION_ID
	session_id: string
}

export interface IDeleteSessionID {
	type: typeof DELETE_SESSION_ID
}

export interface IIsShowModal {
	type: typeof IS_SHOW_LOGIN_MODAL 
}

export interface IUpdateIsAuth {
	type: typeof UPDATE_IS_AUTH
	user: User
	session_id: string
}

export interface IUpdateFilters {
	type: typeof UPDATE_FILTERS
	name: string
	value: string | number[]
}

export interface IUpdatePage {
	type: typeof UPDATE_PAGE
	value: number
}

export interface IUpdateTotalPage {
	type: typeof UPDATE_TOTAL_PAGE
	value: number
}

export interface IUpdateMovies {
	type: typeof UPDATE_MOVIES
	value: TMovie[]
}

export type allActionTypes = ISetUser | IDeleteUser | ISetSessionID | IDeleteSessionID | IIsShowModal | IUpdateIsAuth | IUpdateFilters | IUpdatePage | IUpdateTotalPage | IUpdateMovies
