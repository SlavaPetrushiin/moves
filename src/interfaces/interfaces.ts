import {
	SET_USER,
	DELETE_USER,
	SET_SESSION_ID,
	DELETE_SESSION_ID,
	IS_SHOW_LOGIN_MODAL,
	UPDATE_IS_AUTH,
	UPDATE_FILTERS,
	UPDATE_PAGE,
	UPDATE_TOTAL_PAGE,
	UPDATE_MOVIES,
	ADDED_GENRES,
	DELETE_GENRES
} from './../store/consts';

export type ContextProps = {
	state: TStateFilters
	page: number
	totalPage: number
	onChangePage: (page: number) => void
	onChangeCheckedGenres: (id: number, checked: boolean) => void
	onChangeFilters: (name: keyof TFilters, value: string) => void
	setTotalPage: (totalPage: number) => void
};

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

export type TGenre = {
	id: number
	name: string
}

export type TFilters = {
	sort_by: string;
	with_genres: any;
	primary_release_year: string;
}

export type IUser = {
	avatar: any
	id: number
	include_adult: boolean
	iso_639_1: string
	iso_3166_1: string
	name: string
	username: string
}

export type TStateFilters = {
	filters: TFilters
}

export interface ISetUser {
	type: typeof SET_USER
	user: IUser
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
	user: IUser
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

export interface IPayloadMovies {
	movies: TMovie[]
	page: number
	totalPage: number
}

export interface IUpdateMovies {
	type: typeof UPDATE_MOVIES
	payload: IPayloadMovies
}

export interface IAddedGenres {
	type: typeof ADDED_GENRES
	name: string
	value: number
}

export interface IDeleteGenres {
	type: typeof DELETE_GENRES
	name: string
	value: number
}



export type allActionTypes = ISetUser | IDeleteUser | ISetSessionID | IDeleteSessionID | IIsShowModal | IUpdateIsAuth | IUpdateFilters | IUpdatePage | IUpdateTotalPage | IUpdateMovies | IAddedGenres | IDeleteGenres