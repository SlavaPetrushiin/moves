import { 
	allActionTypes,
	SET_USER,
	DELETE_USER,
	SET_SESSION_ID,
	DELETE_SESSION_ID,
	ISetUser,
	IDeleteUser,
	ISetSessionID,
	IDeleteSessionID
} from "./consts";

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
}

export type InitialStateUser = {
	user: User | null
	session_id: string
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

const initialStateMovies: InitialStateMovies= {
	filters: {
		sort_by: '',
		with_genres: [],
		primary_release_year: ''
	}
}

const initialStateUser: InitialStateUser= {
	user: null,
	session_id: ""
}


export const moviesReducer = (state: InitialStateMovies = initialStateMovies, action: allActionTypes): InitialStateMovies => {
	switch(action.type){
		default: 
			return state;
	}
}

export const userReducer = (state: InitialStateUser = initialStateUser, action: allActionTypes): InitialStateUser => {
	switch(action.type){
		case SET_USER: 
			return {
				...state,
				...action.user
			}
		case DELETE_USER: {
			return {
				...state,
				user: null
			}
		}
		case SET_SESSION_ID: {
			return {
				...state,
				session_id: action.session_id
			}
		}
		case DELETE_SESSION_ID: {
			return {
				...state,
				session_id: ''
			}
		}
		default: 
			return state;
	}	
}

/* Action  userReducer */
export const setUser = (user: User): ISetUser => ({type: SET_USER, user});
export const deleteUser = (): IDeleteUser => ({type: DELETE_USER});
export const setSessionID = (session_id: string): ISetSessionID => ({type: SET_SESSION_ID, session_id});
export const deleteSessionID = (): IDeleteSessionID => ({type: DELETE_SESSION_ID});


