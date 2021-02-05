import { User } from './redusers';
export const SET_USER = 'SET_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_SESSION_ID = 'SET_SESSION_ID';
export const DELETE_SESSION_ID = 'DELETE_SESSION_ID';


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

export type allActionTypes = ISetUser | IDeleteUser | ISetSessionID | IDeleteSessionID
