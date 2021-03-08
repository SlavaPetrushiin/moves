import React from 'react';
import { IUser } from './../interfaces/interfaces';

type THeaderProps = {
	user: null | IUser
}

class User extends React.Component<THeaderProps> {
	render(){
		const {user} = this.props;
		return (
			<div className="user_avatar">
				<span>{user?.name}</span>
			</div>
		);		
	}
}

export default User

