import React from 'react';
import { TUser } from '../App';

type THeaderProps = {
	user: null | TUser
}

class User extends React.Component<THeaderProps> {
	render(){
		const {user} = this.props
		return (
			<div className="user_avatar">
				<span>{user?.username}</span>
			</div>
		);		
	}
}

export default User;