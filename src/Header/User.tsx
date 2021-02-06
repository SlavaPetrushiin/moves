import React from 'react';
import { TUser } from '../App';
import AppContextHOC from '../HOC/AppContextHOC';

type THeaderProps = {
	user: null |TUser
}

class User extends React.Component<THeaderProps> {
	render(){
		const {user} = this.props;
		return (
			<div className="user_avatar">
				<span>{user?.username}</span>
			</div>
		);		
	}
}

export default AppContextHOC(User)

