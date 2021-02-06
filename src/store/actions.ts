import { ISetUser,
	SET_USER,
	UPDATE_IS_AUTH,
	DELETE_USER,
	SET_SESSION_ID,
	DELETE_SESSION_ID,
	ISetSessionID,
	IDeleteSessionID,
	IUpdateIsAuth,
	IDeleteUser
} from './consts';
import { User } from './redusers';

/* Action  userReducer */
export const setUser = (user: User): ISetUser => ({type: SET_USER, user});
export const updateIsAuth = (user: User, session_id: string): IUpdateIsAuth => ({type: UPDATE_IS_AUTH, user, session_id});
export const deleteUser = (): IDeleteUser => ({type: DELETE_USER});
export const setSessionID = (session_id: string): ISetSessionID => ({type: SET_SESSION_ID, session_id});
export const deleteSessionID = (): IDeleteSessionID => ({type: DELETE_SESSION_ID});